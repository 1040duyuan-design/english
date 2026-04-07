const DEFAULT_DAILY_MINUTES = 35;

const concernMap = {
  speaking: ['口语差', '开口难', '不敢说', '哑巴英语'],
  listening: ['听力不好', '听不懂', '跟不上语速'],
  vocabulary: ['词汇量少', '词少'],
  pronunciation: ['中式口音重', '发音不自然', '发音差'],
  mixed: ['各个方面都弱', '基础混乱', '都不好']
};

const sceneCatalog = {
  life: {
    name: '生活英语',
    themes: ['购物', '点餐', '租房', '出行', '问路', '医院与预约']
  },
  work: {
    name: '工作英语',
    themes: ['自我介绍', '开会表达', '问题排查', '邮件沟通', '客户支持', '任务同步']
  },
  social: {
    name: '社交表达',
    themes: ['寒暄', '表达意见', '请求帮助', '聚会交流', '建立关系', '礼貌回应']
  },
  general: {
    name: '综合提升',
    themes: ['高频日常表达', '听说反应', '阅读理解', '基础写作', '语音语调', '词汇扩展']
  }
};

function hasConcern(input, keys) {
  const text = JSON.stringify(input || '');
  return keys.some((item) => text.includes(item));
}

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function detectProfile(form) {
  const tags = [];
  if (hasConcern(form.concerns, concernMap.speaking)) tags.push('哑巴英语倾向');
  if (hasConcern(form.concerns, concernMap.listening)) tags.push('听力输入薄弱');
  if (hasConcern(form.concerns, concernMap.vocabulary)) tags.push('词汇储备不足');
  if (hasConcern(form.concerns, concernMap.pronunciation)) tags.push('发音自然度偏弱');
  if (hasConcern(form.concerns, concernMap.mixed)) tags.push('基础能力不均衡');
  if (!tags.length) tags.push('综合提升型');
  return tags;
}

function deriveScores(form) {
  const baseLevel = form.currentLevel || '基础薄弱';
  let base = 44;
  if (baseLevel.includes('中级')) base = 58;
  if (baseLevel.includes('基础')) base = 42;
  if (baseLevel.includes('高中')) base = 48;
  if (baseLevel.includes('较好')) base = 64;

  let listening = base;
  let speaking = base;
  let reading = base + 8;
  let writing = base + 4;
  let pronunciation = base - 2;
  let vocabulary = base - 4;

  if (hasConcern(form.concerns, concernMap.listening)) listening -= 14;
  if (hasConcern(form.concerns, concernMap.speaking)) speaking -= 12;
  if (hasConcern(form.concerns, concernMap.pronunciation)) pronunciation -= 14;
  if (hasConcern(form.concerns, concernMap.vocabulary)) {
    vocabulary -= 16;
    listening -= 4;
    reading -= 4;
  }
  if (hasConcern(form.concerns, concernMap.mixed)) {
    listening -= 5;
    speaking -= 5;
    reading -= 6;
    writing -= 6;
    vocabulary -= 4;
  }

  return {
    listening: clamp(listening),
    speaking: clamp(speaking),
    reading: clamp(reading),
    writing: clamp(writing),
    pronunciation: clamp(pronunciation),
    vocabulary: clamp(vocabulary)
  };
}

function getPrimaryTrack(form) {
  if (form.goalType && sceneCatalog[form.goalType]) return sceneCatalog[form.goalType];
  const goalText = `${form.goal || ''} ${form.goalDetail || ''}`;
  if (/工作|面试|support|客户|job/i.test(goalText)) return sceneCatalog.work;
  if (/生活|澳大利亚|澳洲|出国|移民|租房|超市/i.test(goalText)) return sceneCatalog.life;
  if (/社交|朋友|聊天/i.test(goalText)) return sceneCatalog.social;
  return sceneCatalog.general;
}

function buildStagePlan(form, scores, track) {
  const totalWeeks = Number(form.timelineWeeks) || 12;
  const stage1 = Math.max(2, Math.round(totalWeeks * 0.34));
  const stage2 = Math.max(2, Math.round(totalWeeks * 0.33));
  const stage3 = Math.max(2, totalWeeks - stage1 - stage2);

  const weakest = Object.entries(scores)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 2)
    .map(([key]) => key);

  return [
    {
      id: 'stage-1',
      name: '基础打底',
      weeks: stage1,
      focus: [
        '高频场景词汇',
        '慢速可理解输入',
        weakest.includes('pronunciation') ? '重音与节奏' : '基础口语反应'
      ],
      outcome: `先把 ${track.name} 中最常见的表达听懂、读懂、说出来。`
    },
    {
      id: 'stage-2',
      name: '场景强化',
      weeks: stage2,
      focus: [
        `${track.name} 核心场景`,
        weakest.includes('speaking') ? '开口速度与句型调用' : '听说联动',
        weakest.includes('listening') ? '正常语速理解' : '阅读与写作巩固'
      ],
      outcome: '把输入变成可复用表达，减少中文翻译依赖。'
    },
    {
      id: 'stage-3',
      name: '真实应用',
      weeks: stage3,
      focus: [
        '真实材料迁移',
        '任务型表达',
        '按目标场景完成输出'
      ],
      outcome: `围绕“${form.goal || '真实使用英语'}”做完整表达与反馈修正。`
    }
  ];
}

function buildResourceStack(trackName, theme, tags) {
  const resources = [
    `情景对话音频：${trackName} / ${theme}`,
    `高频表达卡片：${theme} 必备 8 句`,
    `输入-模仿-输出闭环练习单`
  ];
  if (tags.includes('听力输入薄弱')) {
    resources.push('慢速 + 正常语速双版本音频');
  }
  if (tags.includes('发音自然度偏弱')) {
    resources.push('重音 / 连读 / 语调对比示范');
  }
  if (tags.includes('词汇储备不足')) {
    resources.push('场景高频词 12 个的最小词包');
  }
  return resources;
}

function buildTask({ id, title, minutes, skill, why, action, resource, completed = false }) {
  return { id, title, minutes, skill, why, action, resource, completed };
}

function generateDailyPlan(form, scores, tags, track, dayIndex = 1) {
  const dailyMinutes = Number(form.dailyMinutes) || DEFAULT_DAILY_MINUTES;
  const theme = track.themes[(dayIndex - 1) % track.themes.length];
  const weakest = Object.entries(scores)
    .sort((a, b) => a[1] - b[1])
    .map(([key]) => key);

  const minutes = {
    warmup: Math.max(4, Math.round(dailyMinutes * 0.14)),
    input: Math.max(7, Math.round(dailyMinutes * 0.24)),
    output: Math.max(8, Math.round(dailyMinutes * 0.26)),
    integration: Math.max(6, Math.round(dailyMinutes * 0.2)),
    review: Math.max(5, dailyMinutes - Math.round(dailyMinutes * 0.14) - Math.round(dailyMinutes * 0.24) - Math.round(dailyMinutes * 0.26) - Math.round(dailyMinutes * 0.2))
  };

  const resources = buildResourceStack(track.name, theme, tags);

  const speakingTitle = weakest[0] === 'pronunciation'
    ? '语音模仿训练'
    : '场景开口训练';

  return {
    dayIndex,
    title: `Day ${dayIndex} · ${theme}`,
    goal: `围绕“${theme}”完成听懂 + 开口 + 读写巩固，服务目标：${form.goal || track.name}`,
    estimatedMinutes: dailyMinutes,
    resources,
    tasks: [
      buildTask({
        id: `d${dayIndex}-t1`,
        title: '热身与词汇激活',
        minutes: minutes.warmup,
        skill: '词汇 / 阅读',
        why: '先降低今天听力和开口难度，避免一上来就卡住。',
        action: `学习 ${theme} 场景中的 8-12 个高频词和 2 个核心句型。`,
        resource: resources[1]
      }),
      buildTask({
        id: `d${dayIndex}-t2`,
        title: '可理解输入训练',
        minutes: minutes.input,
        skill: '听力',
        why: weakest.includes('listening') ? '先用可理解输入补齐听力短板。' : '先把场景表达放进耳朵里。',
        action: '先听慢速版，再听正常版，抓关键词和主旨。',
        resource: resources[0]
      }),
      buildTask({
        id: `d${dayIndex}-t3`,
        title: speakingTitle,
        minutes: minutes.output,
        skill: '口语 / 发音',
        why: tags.includes('发音自然度偏弱') ? '这一步重点不是只读对，而是说得更自然。' : '把输入变成能立即调用的口语表达。',
        action: tags.includes('发音自然度偏弱')
          ? '跟读 6 句，重点练重音、停顿、语调，再完成 2 次情景复述。'
          : '完成 3 轮角色扮演，逐轮减少中文依赖。',
        resource: tags.includes('发音自然度偏弱') ? '语音节奏示范 + 跟读脚本' : '情景角色扮演卡'
      }),
      buildTask({
        id: `d${dayIndex}-t4`,
        title: '听说读写整合练习',
        minutes: minutes.integration,
        skill: '综合',
        why: '防止学成单项能力，把今天材料真正用出来。',
        action: `完成 1 个小任务：读提示、听信息、说回应、写 1-2 句总结。`,
        resource: resources[2]
      }),
      buildTask({
        id: `d${dayIndex}-t5`,
        title: '当日小测与复盘',
        minutes: minutes.review,
        skill: '复盘',
        why: '让用户清楚知道今天哪里进步，哪里还需补。',
        action: '完成 3 题小测，写下 1 个卡点和 1 个明天要继续练的点。',
        resource: 'AI 复盘反馈卡'
      })
    ]
  };
}

function buildAssessmentNarrative(scores, tags, form) {
  const weakest = Object.entries(scores).sort((a, b) => a[1] - b[1]);
  const strongest = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  const labelMap = {
    listening: '听力理解',
    speaking: '口语表达',
    reading: '阅读理解',
    writing: '写作表达',
    pronunciation: '发音自然度',
    vocabulary: '词汇储备'
  };

  return {
    headline: `你当前更适合从“${labelMap[weakest[0][0]]} + ${labelMap[weakest[1][0]]}”切入，同时保持听说读写全面覆盖。`,
    summary: `围绕“${form.goal || '英语综合提升'}”，系统判断你的优势更偏向 ${labelMap[strongest[0][0]]}，短板更集中在 ${labelMap[weakest[0][0]]}。`,
    tags,
    feedback: [
      tags.includes('发音自然度偏弱')
        ? '你可能存在“能读对，但重音、节奏、语调不够自然”的情况。'
        : '你的发音准确度有基础，接下来要进一步提升自然表达感。',
      tags.includes('听力输入薄弱')
        ? '你更需要先建立“可理解输入”，再逐步过渡到真实语速。'
        : '你的听力训练要继续和真实场景绑定，避免只会做题。',
      tags.includes('词汇储备不足')
        ? '词汇学习不建议孤立背诵，而应跟场景和输出任务绑定。'
        : '词汇建议继续通过高频场景反复复现，提升调用速度。'
    ]
  };
}

export function buildInitialProfile(form, profileId) {
  const tags = detectProfile(form);
  const scores = deriveScores(form);
  const track = getPrimaryTrack(form);
  const stages = buildStagePlan(form, scores, track);
  const todayPlan = generateDailyPlan(form, scores, tags, track, 1);

  const overallProgress = 4;
  return {
    id: profileId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    form,
    assessment: {
      scores,
      ...buildAssessmentNarrative(scores, tags, form)
    },
    plan: {
      track: track.name,
      stages,
      totalWeeks: Number(form.timelineWeeks) || 12,
      currentStageId: 'stage-1'
    },
    progress: {
      totalPercent: overallProgress,
      currentDay: 1,
      streakDays: 0,
      completedDays: 0,
      weeklyCompletionRate: 0,
      skillProgress: {
        listening: Math.max(0, scores.listening - 25),
        speaking: Math.max(0, scores.speaking - 25),
        reading: Math.max(0, scores.reading - 25),
        writing: Math.max(0, scores.writing - 25)
      },
      stageProgress: {
        'stage-1': 8,
        'stage-2': 0,
        'stage-3': 0
      }
    },
    todayPlan,
    history: []
  };
}

export function completeTask(profile, taskId) {
  const updatedTasks = profile.todayPlan.tasks.map((task) =>
    task.id === taskId ? { ...task, completed: true } : task
  );

  const completedCount = updatedTasks.filter((task) => task.completed).length;
  const completionRatio = completedCount / updatedTasks.length;

  return {
    ...profile,
    updatedAt: new Date().toISOString(),
    todayPlan: {
      ...profile.todayPlan,
      tasks: updatedTasks
    },
    progress: {
      ...profile.progress,
      totalPercent: Math.min(98, Math.round(profile.progress.totalPercent * 0.6 + completionRatio * 30)),
      weeklyCompletionRate: Math.round(completionRatio * 100)
    }
  };
}

export function completeDay(profile) {
  const allTasksDone = profile.todayPlan.tasks.every((task) => task.completed);
  const completedToday = profile.todayPlan.tasks.filter((task) => task.completed).length;
  const ratio = completedToday / profile.todayPlan.tasks.length;

  const nextDay = profile.progress.currentDay + 1;
  const track = getPrimaryTrack(profile.form);
  const tags = profile.assessment.tags;
  const nextPlan = generateDailyPlan(profile.form, profile.assessment.scores, tags, track, nextDay);

  const stage1Weeks = profile.plan.stages[0].weeks;
  const stage2Weeks = profile.plan.stages[1].weeks;
  const currentWeek = Math.ceil(nextDay / 5);
  let currentStageId = 'stage-1';
  if (currentWeek > stage1Weeks) currentStageId = 'stage-2';
  if (currentWeek > stage1Weeks + stage2Weeks) currentStageId = 'stage-3';

  const totalPercent = Math.min(100, profile.progress.totalPercent + Math.max(4, Math.round(ratio * 8)));
  const stageProgress = { ...profile.progress.stageProgress };
  stageProgress[currentStageId] = Math.min(100, (stageProgress[currentStageId] || 0) + Math.max(6, Math.round(ratio * 10)));

  return {
    ...profile,
    updatedAt: new Date().toISOString(),
    plan: {
      ...profile.plan,
      currentStageId
    },
    progress: {
      ...profile.progress,
      currentDay: nextDay,
      completedDays: profile.progress.completedDays + (ratio >= 0.6 ? 1 : 0),
      streakDays: allTasksDone ? profile.progress.streakDays + 1 : profile.progress.streakDays,
      weeklyCompletionRate: Math.round(ratio * 100),
      totalPercent,
      skillProgress: {
        listening: Math.min(100, profile.progress.skillProgress.listening + 2),
        speaking: Math.min(100, profile.progress.skillProgress.speaking + 2),
        reading: Math.min(100, profile.progress.skillProgress.reading + 1),
        writing: Math.min(100, profile.progress.skillProgress.writing + 1)
      },
      stageProgress
    },
    history: [
      ...profile.history,
      {
        dayIndex: profile.progress.currentDay,
        completedAt: new Date().toISOString(),
        completionRate: Math.round(ratio * 100),
        theme: profile.todayPlan.title
      }
    ],
    todayPlan: nextPlan
  };
}
