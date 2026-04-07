const defaultGoalState = {
  target: "去澳大利亚后，能独立租房、打电话预约、在工作里和同事顺畅沟通。",
  timeframe: 60,
  level: "practical",
  dailyMinutes: 20,
  focus: "mixed",
  gap: "listening",
  scene: "rental",
};

const sceneMap = {
  rental: {
    title: "澳洲租房：打电话预约看房",
    summary: "先把生活高频事务里最容易卡住的一类电话场景走通。",
    keyLine: "I'd like to book an inspection for Saturday morning.",
    next: "明天继续生活事务线，但换成路线确认或现场沟通。",
  },
  clinic: {
    title: "澳洲就医：打电话预约 clinic",
    summary: "先把问诊预约、时间确认和症状说明这类高频场景走通。",
    keyLine: "I'd like to book a GP appointment for tomorrow morning.",
    next: "明天继续 clinic 线，但推进到现场签到或症状补充表达。",
  },
  meeting: {
    title: "澳洲职场：确认 meeting 更新",
    summary: "先把 meeting 里的时间变化、任务确认和简短回应练顺。",
    keyLine: "Got it. I'll update the deck before noon.",
    next: "明天继续工作线，但推进到 clarification 或 small talk 场景。",
  },
  data: {
    title: "数据岗位：解释一个关键指标变化",
    summary: "先把数据岗位里最常见的更新表达练顺，不做泛泛英语。",
    keyLine: "Weekly retention dropped after the pricing change.",
    next: "明天继续数据岗位线，但换成 chart explanation 或 recommendation。",
  },
};

const levelLabels = {
  foundation: "能读写，但听说弱",
  practical: "基础沟通可以，但真实场景卡住",
  work: "生活基础还行，但工作沟通不顺",
};

const focusLabels = {
  life: "偏生活英语",
  work: "偏工作英语",
  mixed: "生活和工作都要",
};

const dailyLabel = {
  10: "10 分钟",
  20: "20 分钟",
  30: "30 分钟以上",
};

const planBlueprint = {
  phases: [
    {
      title: "阶段 1：高频生活与工作入口",
      days: "Day 1 - Day 20",
      summary: "先稳住最常遇到的高频电话、预约、meeting 更新和基础说明。",
    },
    {
      title: "阶段 2：事务处理与连续表达",
      days: "Day 21 - Day 40",
      summary: "把单句回应推进到连续沟通，开始稳定处理现场问题和跟进问题。",
    },
    {
      title: "阶段 3：独立应对与工作协作",
      days: "Day 41+",
      summary: "把生活与工作里的高频任务收成更独立、更自然的英语处理能力。",
    },
  ],
  courses: [
    {
      title: "生活事务高频课",
      stage: "当前优先",
      summary: "租房、预约、超市、交通等高频生活场景。",
      cta: "进入这组课程",
    },
    {
      title: "职场沟通基础课",
      stage: "下一阶段",
      summary: "small talk、meeting 更新、同事协作与确认。",
      cta: "查看课程安排",
    },
    {
      title: "岗位表达强化课",
      stage: "后续阶段",
      summary: "数据岗位里解释趋势、结论和建议的关键表达。",
      cta: "查看后续课程",
    },
  ],
};

function readGoalState() {
  const saved = JSON.parse(window.localStorage.getItem("englishPlatformGoal") || "{}");
  return {
    ...defaultGoalState,
    ...saved,
    timeframe: Number(saved.timeframe || defaultGoalState.timeframe),
    dailyMinutes: Number(saved.dailyMinutes || defaultGoalState.dailyMinutes),
  };
}

function writeGoalState(goalState) {
  window.localStorage.setItem("englishPlatformGoal", JSON.stringify(goalState));
}

function getPlanState() {
  const goalState = readGoalState();
  const scene = sceneMap[goalState.scene] || sceneMap.rental;
  const currentDay = Math.min(Math.max(18, Math.round(goalState.timeframe * 0.3)), goalState.timeframe - 1);
  const progressRatio = currentDay / goalState.timeframe;
  const currentPhaseIndex = currentDay <= 20 ? 0 : currentDay <= 40 ? 1 : 2;
  const phase = planBlueprint.phases[currentPhaseIndex];
  const todayDuration = dailyLabel[goalState.dailyMinutes] || `${goalState.dailyMinutes} 分钟`;
  const todayFocus = goalState.focus === "work" ? "工作沟通推进" : goalState.focus === "life" ? "生活事务推进" : "生活与工作双线推进";

  return {
    goalState,
    scene,
    currentDay,
    progressRatio,
    phase,
    todayDuration,
    todayFocus,
    todayGoal: `${scene.title}：先听懂，再完成一次最小回应。`,
    todaySummary: `今天按 ${todayDuration} 这一档，先收 ${scene.title} 这一组。`,
    doneMeans: `完成 3 个学习动作，并说出 1 句关键表达。`,
    actions: [
      {
        title: "动作 1：先听懂这个真实场景",
        how: "先听 1 遍场景音频，再抓关键意思。",
        resource: "使用 Audio 资源直接开始。",
        duration: goalState.dailyMinutes === 10 ? "3 分钟" : "6 分钟",
        done: "你能说出这个场景到底在处理什么事。",
      },
      {
        title: "动作 2：说出今天最关键的一句",
        how: "跟读关键句，再不看文本说出来。",
        resource: "使用 Key sentence 资源。",
        duration: goalState.dailyMinutes === 10 ? "3 分钟" : "5 分钟",
        done: "你能完整说出今天最关键的一句表达。",
      },
      {
        title: "动作 3：完成一次最小回应",
        how: "看任务提示，用 1 句自己的英文完成回应。",
        resource: "使用 Quick response 任务。",
        duration: goalState.dailyMinutes === 10 ? "4 分钟" : "7 分钟",
        done: "你已经完成一次不照读的最小输出。",
      },
    ],
    resources: [
      {
        type: "Audio",
        content: scene.summary,
        why: "先把真实场景听懂。",
        cta: "立即开始这段音频",
      },
      {
        type: "Key sentence",
        content: scene.keyLine,
        why: "把今天最该说的一句话说出来。",
        cta: "立即开始这句跟读",
      },
      {
        type: "Quick response task",
        content: "请用 1 句英文做出你的最小回应。",
        why: "把理解推进成可用表达。",
        cta: "立即开始这次回应",
      },
    ],
    history: [
      `Day ${Math.max(currentDay - 2, 1)}：完成租房电话里的时间与地点识别`,
      `Day ${Math.max(currentDay - 1, 1)}：完成现场问路与确认路线练习`,
      `Day ${currentDay}：完成 ${scene.title} 这一轮学习`,
    ],
  };
}

function renderGoalPage() {
  const goalState = readGoalState();
  const form = document.querySelector("#goal-form");
  if (!form) return;

  document.querySelector("#goal-target").value = goalState.target;
  document.querySelector("#goal-timeframe").value = String(goalState.timeframe);
  document.querySelector("#goal-level").value = goalState.level;
  document.querySelector("#goal-daily-minutes").value = String(goalState.dailyMinutes);
  document.querySelector("#goal-focus").value = goalState.focus;
  document.querySelector("#goal-gap").value = goalState.gap;
  document.querySelector("#goal-scene").value = goalState.scene;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nextState = {
      target: document.querySelector("#goal-target").value.trim(),
      timeframe: Number(document.querySelector("#goal-timeframe").value),
      level: document.querySelector("#goal-level").value,
      dailyMinutes: Number(document.querySelector("#goal-daily-minutes").value),
      focus: document.querySelector("#goal-focus").value,
      gap: document.querySelector("#goal-gap").value,
      scene: document.querySelector("#goal-scene").value,
    };
    writeGoalState(nextState);
    window.location.href = "/plan.html";
  });
}

function renderPlanPage() {
  const plan = getPlanState();
  const el = (selector) => document.querySelector(selector);
  if (!el("#plan-title")) return;

  el("#plan-title").textContent = "这是你的英语学习计划。";
  el("#plan-goal").textContent = plan.goalState.target;
  el("#plan-cycle").textContent = `总周期：${plan.goalState.timeframe} 天 | 当前水平：${levelLabels[plan.goalState.level]} | 每天投入：${plan.todayDuration}`;
  el("#plan-progress-text").textContent = `Day ${plan.currentDay} / ${plan.goalState.timeframe}`;
  el("#plan-progress-bar").style.width = `${Math.max(plan.progressRatio * 100, 6)}%`;
  el("#plan-phase-copy").textContent = `当前阶段重点：${plan.phase.title}`;
  el("#plan-today-label").textContent = `今天学 ${plan.todayDuration}`;
  el("#plan-today-scene").textContent = plan.scene.title;
  el("#plan-today-summary").textContent = `${plan.todayFocus} | 完成标准：${plan.doneMeans}`;

  const phases = el("#plan-phases");
  phases.innerHTML = "";
  planBlueprint.phases.forEach((phase, index) => {
    const card = document.createElement("article");
    card.className = `phase-card${index === planBlueprint.phases.indexOf(plan.phase) ? " is-current" : ""}`;
    card.innerHTML = `
      <p class="mini-label">${phase.days}</p>
      <strong>${phase.title}</strong>
      <p>${phase.summary}</p>
    `;
    phases.appendChild(card);
  });
}

function renderTodayPage() {
  const plan = getPlanState();
  const el = (selector) => document.querySelector(selector);
  if (!el("#today-title")) return;

  el("#today-title").textContent = "今天按这组学习任务继续推进。";
  el("#today-intro").textContent = `总目标：${plan.goalState.target}`;
  el("#today-goal").textContent = plan.todayGoal;
  el("#today-scene").textContent = `场景：${plan.scene.title}`;
  el("#today-duration").textContent = plan.todayDuration;
  el("#today-main-skill").textContent = plan.goalState.gap === "listening" ? "Listening" : "Speaking";
  el("#today-support-skill").textContent = plan.goalState.gap === "pronunciation" ? "Pronunciation" : "Task output";
  el("#today-done-means").textContent = plan.doneMeans;

  const actions = el("#today-actions");
  actions.innerHTML = "";
  plan.actions.forEach((action) => {
    const item = document.createElement("li");
    item.className = "shell-card";
    item.innerHTML = `
      <p class="mini-label">${action.duration}</p>
      <strong>${action.title}</strong>
      <p><span class="card-key">怎么做：</span>${action.how}</p>
      <p><span class="card-key">用什么资源：</span>${action.resource}</p>
      <p><span class="card-key">完成算什么：</span>${action.done}</p>
    `;
    actions.appendChild(item);
  });

  const resources = el("#today-resources");
  resources.innerHTML = "";
  plan.resources.forEach((resource) => {
    const item = document.createElement("li");
    item.className = "shell-card";
    item.innerHTML = `
      <p class="mini-label">${resource.type}</p>
      <strong>${resource.content}</strong>
      <p><span class="card-key">为什么用它：</span>${resource.why}</p>
      <a class="secondary-action card-link" href="/training.html">${resource.cta}</a>
    `;
    resources.appendChild(item);
  });
}

function renderCompletionPage() {
  const plan = getPlanState();
  const el = (selector) => document.querySelector(selector);
  if (!el("#completion-scene-title")) return;

  el("#completion-scene-title").textContent = `你完成了 ${plan.scene.title} 这一轮学习。`;
  el("#completion-summary").textContent = `今天走完的是 ${plan.scene.title}，不是泛练习。`;
  el("#completion-progress-text").textContent = `Day ${plan.currentDay + 1} / ${plan.goalState.timeframe}`;
  el("#completion-progress-bar").style.width = `${Math.max(((plan.currentDay + 1) / plan.goalState.timeframe) * 100, 6)}%`;
  el("#completion-key-line").textContent = plan.scene.keyLine;
  el("#completion-next-focus").textContent = plan.scene.next;

  const list = el("#completion-steps");
  list.innerHTML = "";
  plan.actions.forEach((action) => {
    const item = document.createElement("li");
    item.textContent = action.title.replace("动作 1：", "").replace("动作 2：", "").replace("动作 3：", "");
    list.appendChild(item);
  });
}

function renderCoursesPage() {
  const plan = getPlanState();
  const el = (selector) => document.querySelector(selector);
  if (!el("#course-list")) return;

  el("#courses-current-title").textContent = `先学“${plan.phase.title.replace(/^阶段 \d+：/, "")}”这一组。`;
  el("#courses-current-copy").textContent = `${focusLabels[plan.goalState.focus]} | 先围绕 ${plan.scene.title} 这一类场景推进。`;
  el("#courses-phase").textContent = plan.phase.title;

  const list = el("#course-list");
  list.innerHTML = "";
  planBlueprint.courses.forEach((course) => {
    const card = document.createElement("article");
    card.className = "course-card";
    card.innerHTML = `
      <p class="mini-label">${course.stage}</p>
      <strong>${course.title}</strong>
      <p>${course.summary}</p>
      <a class="secondary-action" href="/training.html">${course.cta}</a>
    `;
    list.appendChild(card);
  });
}

function renderReviewPage() {
  const plan = getPlanState();
  const el = (selector) => document.querySelector(selector);
  if (!el("#review-stage-title")) return;

  el("#review-stage-title").textContent = `你已经走到“${plan.phase.title.replace(/^阶段 \d+：/, "")}”这段。`;
  el("#review-stage-copy").textContent = `当前重点：${plan.phase.summary}`;
  el("#review-progress-text").textContent = `${plan.currentDay} / ${plan.goalState.timeframe} 天`;
  el("#review-progress-bar").style.width = `${Math.max(plan.progressRatio * 100, 6)}%`;

  const history = el("#review-history");
  history.innerHTML = "";
  plan.history.forEach((entry) => {
    const item = document.createElement("li");
    item.className = "history-card";
    item.textContent = entry;
    history.appendChild(item);
  });
}

function init() {
  const page = document.body.dataset.page;
  if (page === "goal") renderGoalPage();
  if (page === "plan") renderPlanPage();
  if (page === "today") renderTodayPage();
  if (page === "completion") renderCompletionPage();
  if (page === "courses") renderCoursesPage();
  if (page === "review") renderReviewPage();
}

init();
