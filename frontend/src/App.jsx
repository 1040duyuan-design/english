import { useEffect, useMemo, useState } from 'react';

const API_BASE = '/api';
const USER_KEY = 'memory_english_user_id_v4';

const goalSuggestions = [
  '想系统提升听说读写，让英语真正能用起来',
  '想提高工作英语，能更自然地开会、沟通和写邮件',
  '想补口语和听力，减少中式表达感',
  '想建立一套能长期坚持的英语学习路径'
];

const concernOptions = ['口语差', '听力不好', '词汇量少', '中式口音重', '各个方面都弱'];
const sceneOptions = ['生活', '工作', '社交', '综合'];
const levelOptions = ['基础薄弱', '高中基础 / 基础薄弱', '有一些基础 / 初中高级之间', '中级过渡', '较好'];

const defaultForm = {
  goal: '',
  goalType: 'general',
  goalDetail: '',
  timelineWeeks: 12,
  dailyMinutes: 40,
  currentLevel: '高中基础 / 基础薄弱',
  concerns: [],
  targetScenes: []
};

const assessmentBank = {
  vocab: {
    entry: {
      id: 'v-medium',
      difficulty: '中档试探',
      question: 'available 最接近下面哪个意思？',
      options: ['昂贵的', '可用的 / 有空的', '延误的', '私人的'],
      answer: '可用的 / 有空的'
    },
    support: {
      id: 'v-support',
      difficulty: '基础支撑',
      question: 'receipt 最接近下面哪个意思？',
      options: ['小票', '菜单', '窗口', '收件人'],
      answer: '小票'
    },
    challenge: {
      id: 'v-challenge',
      difficulty: '挑战提升',
      question: 'furnished room 通常指什么？',
      options: ['已打扫的房间', '带家具的房间', '便宜的房间', '朝南的房间'],
      answer: '带家具的房间'
    }
  },
  listening: {
    entry: {
      id: 'l-medium',
      difficulty: '中档试探',
      script: 'Hello. The room is available from next Monday. Water is included, but electricity is separate.',
      question: '下面哪一项正确？',
      options: ['房间今天就能入住', '水费包含，电费另算', '所有费用都包含'],
      answer: '水费包含，电费另算'
    },
    support: {
      id: 'l-support',
      difficulty: '基础支撑',
      script: 'The bus stop is on the left, next to the bank.',
      question: '公交站在哪里？',
      options: ['在银行旁边', '在超市后面', '在学校里面'],
      answer: '在银行旁边'
    },
    challenge: {
      id: 'l-challenge',
      difficulty: '挑战提升',
      script: 'The draft is ready, but the support script still needs feedback from the training team. We will review it again on Thursday morning.',
      question: '当前还没完成的是哪一项？',
      options: ['草稿', '支持话术反馈', '周四复盘'],
      answer: '支持话术反馈'
    }
  },
  reading: {
    entry: {
      id: 'r-medium',
      difficulty: '中档试探',
      passage: 'Hi team, I have attached the latest version of the document. Please share your comments by Thursday noon so we can finalize it on time.',
      question: '收件人最晚什么时候反馈？',
      options: ['今天下班前', '周三中午', '周四中午'],
      answer: '周四中午'
    },
    support: {
      id: 'r-support',
      difficulty: '基础支撑',
      passage: 'Store closes at 9 p.m. today. Customers who spend over 30 dollars get a free bag.',
      question: '什么时候可以拿到免费袋子？',
      options: ['消费超过 30 美元时', '晚上 9 点后', '买咖啡时'],
      answer: '消费超过 30 美元时'
    },
    challenge: {
      id: 'r-challenge',
      difficulty: '挑战提升',
      passage: 'The team agreed to launch the pilot next week if the support scripts are approved by Wednesday. Alex will own the dashboard, and Mia will coordinate training.',
      question: '周三之前必须完成什么？',
      options: ['试点上线', '审批支持话术', '分享 dashboard'],
      answer: '审批支持话术'
    }
  },
  writing: {
    entry: {
      id: 'w-medium',
      difficulty: '中档试探',
      question: '下面哪句话更自然？',
      options: [
        'I want improve my English for work.',
        'I want to improve my English for work.',
        'I want improving my English for work.'
      ],
      answer: 'I want to improve my English for work.'
    },
    supportPrompt: {
      prompt: '请写 2 句英文：你为什么想学英语，以及你现在最大的困难是什么。',
      scaffold: ['I want to learn English because ...', 'My biggest problem is ...']
    },
    challengePrompt: {
      prompt: '请写 3 句英文：你的学习目标、应用场景，以及你接下来 12 周最想达成的变化。',
      scaffold: ['My goal is ...', 'I need English for ...', 'In 12 weeks, I hope to ...']
    }
  },
  speaking: {
    readAloud: 'Excuse me, could you tell me where the train station is?',
    prompt: '请用英文回答：如果你在超市找不到鸡蛋，你会怎么问店员？',
    scaffold: ['Excuse me, could you tell me ...', 'Where can I find ... ?']
  }
};

function normalizeEnglish(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function similarity(target, actual) {
  const t = normalizeEnglish(target).split(' ').filter(Boolean);
  const a = normalizeEnglish(actual).split(' ').filter(Boolean);
  if (!t.length || !a.length) return 0;
  const set = new Set(a);
  const hits = t.filter((word) => set.has(word)).length;
  return Math.round((hits / t.length) * 100);
}

function scoreBand(score) {
  if (score == null) return '待补测';
  if (score < 45) return '基础支撑版';
  if (score < 75) return '过渡训练版';
  return '挑战提升版';
}

function speakText(text) {
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.92;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function computeAssessmentSummary(answers) {
  const vocabCorrect = [answers.vocabEntry, answers.vocabBranch].filter(Boolean).reduce((acc, cur) => {
    const bank = [assessmentBank.vocab.entry, assessmentBank.vocab.support, assessmentBank.vocab.challenge].find((item) => item.id === cur.id);
    return acc + (cur.value === bank?.answer ? 1 : 0);
  }, 0);
  const vocabTotal = [answers.vocabEntry, answers.vocabBranch].filter(Boolean).length;
  const vocabScore = vocabTotal ? Math.round((vocabCorrect / vocabTotal) * 100) : null;

  const listeningCorrect = [answers.listeningEntry, answers.listeningBranch].filter(Boolean).reduce((acc, cur) => {
    const bank = [assessmentBank.listening.entry, assessmentBank.listening.support, assessmentBank.listening.challenge].find((item) => item.id === cur.id);
    return acc + (cur.value === bank?.answer ? 1 : 0);
  }, 0);
  const listeningTotal = [answers.listeningEntry, answers.listeningBranch].filter(Boolean).length;
  const listeningScore = listeningTotal ? Math.round((listeningCorrect / listeningTotal) * 100) : null;

  const readingCorrect = [answers.readingEntry, answers.readingBranch].filter(Boolean).reduce((acc, cur) => {
    const bank = [assessmentBank.reading.entry, assessmentBank.reading.support, assessmentBank.reading.challenge].find((item) => item.id === cur.id);
    return acc + (cur.value === bank?.answer ? 1 : 0);
  }, 0);
  const readingTotal = [answers.readingEntry, answers.readingBranch].filter(Boolean).length;
  const readingScore = readingTotal ? Math.round((readingCorrect / readingTotal) * 100) : null;

  const writingText = answers.writingSample?.trim() || '';
  const writingWords = normalizeEnglish(writingText).split(' ').filter(Boolean).length;
  const writingSentences = writingText.split(/[.!?]/).filter((x) => x.trim()).length;
  let writingScore = null;
  if (writingText) {
    writingScore = 20;
    if (answers.writingEntry === assessmentBank.writing.entry.answer) writingScore += 20;
    if (writingWords >= 10) writingScore += 20;
    if (writingWords >= 20) writingScore += 15;
    if (writingSentences >= 2) writingScore += 15;
    if (/english|improve|goal|work|life/i.test(writingText)) writingScore += 10;
    writingScore = Math.min(100, writingScore);
  }

  const readAloudSimilarity = similarity(assessmentBank.speaking.readAloud, answers.readAloudTranscript || '');
  const freeSpeakingWords = normalizeEnglish(answers.freeSpeakingTranscript || '').split(' ').filter(Boolean).length;
  const ratings = [answers.accentRating, answers.fluencyRating, answers.confidenceRating].filter((v) => v != null);
  const hasSpeaking = Boolean(answers.readAloudTranscript || answers.freeSpeakingTranscript || ratings.length);
  const pronunciationScore = hasSpeaking
    ? Math.min(100, Math.round(readAloudSimilarity * 0.65 + (answers.accentRating || 0) * 10 + (answers.fluencyRating || 0) * 5))
    : null;
  const speakingScore = hasSpeaking
    ? Math.min(100, Math.round(readAloudSimilarity * 0.35 + freeSpeakingWords * 4 + (answers.confidenceRating || 0) * 8 + (answers.fluencyRating || 0) * 8))
    : null;

  return {
    vocabCorrect,
    vocabTotal,
    vocabScore,
    listeningCorrect,
    listeningTotal,
    listeningScore,
    readingCorrect,
    readingTotal,
    readingScore,
    speakingSimilarity: hasSpeaking ? readAloudSimilarity : null,
    speakingScore,
    pronunciationScore,
    writingScore,
    writingWordCount: writingWords,
    writingSentenceCount: writingSentences
  };
}

function ScoreCard({ title, score, helper }) {
  return (
    <div className="metric-card">
      <div className="metric-top">
        <span>{title}</span>
        <strong>{score == null ? '待测' : score}</strong>
      </div>
      <p>{helper}</p>
    </div>
  );
}


function formatDifficultyLabel(difficulty) {
  if (difficulty === 'support') return '基础支撑版';
  if (difficulty === 'challenge') return '挑战提升版';
  return '过渡训练版';
}

function ProgressRow({ label, value, helper }) {
  const safe = Math.max(0, Math.min(100, value || 0));
  return (
    <div className="progress-row-card">
      <div className="progress-row-head">
        <div>
          <strong>{label}</strong>
          {helper ? <p>{helper}</p> : null}
        </div>
        <span>{safe}%</span>
      </div>
      <div className="progress-track"><div style={{ width: `${safe}%` }} /></div>
    </div>
  );
}

function StageRoadmapCard({ stage, progress, active }) {
  return (
    <div className={`roadmap-card ${active ? 'active' : ''}`}>
      <div className="roadmap-head">
        <div>
          <span>阶段 {stage.id.replace('stage-', '')}</span>
          <h4>{stage.name}</h4>
        </div>
        <strong>{progress || 0}%</strong>
      </div>
      <p>{stage.outcome}</p>
      <div className="mini-tags">
        {stage.focus.map((item) => <span key={item}>{item}</span>)}
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [framework, setFramework] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [step, setStep] = useState('intake');
  const [workspaceView, setWorkspaceView] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [resultBundle, setResultBundle] = useState(null);
  const [answers, setAnswers] = useState({
    vocabEntry: null,
    vocabBranch: null,
    listeningEntry: null,
    listeningBranch: null,
    readingEntry: null,
    readingBranch: null,
    writingEntry: null,
    writingSample: '',
    readAloudTranscript: '',
    freeSpeakingTranscript: '',
    accentRating: null,
    fluencyRating: null,
    confidenceRating: null
  });

  function normalizeBundle(data) {
    if (!data) return null;
    return {
      user: data.user,
      profile: data.profile,
      assessment: data.assessment || data.assessments?.[data.assessments.length - 1] || null,
      plan: data.plan || data.profile?.plan,
      resourceAssignments: data.resourceAssignments || [],
      overview: data.overview || null,
      studySessions: data.studySessions || []
    };
  }

  async function loadDashboard(userId, targetView = workspaceView) {
    const dashResp = await fetch(`${API_BASE}/users/${userId}/dashboard`);
    if (!dashResp.ok) return null;
    const data = normalizeBundle(await dashResp.json());
    setUser(data.user);
    setResultBundle(data);
    setStep('workspace');
    setWorkspaceView(targetView);
    return data;
  }

  useEffect(() => {
    const init = async () => {
      try {
        const frameworkResp = await fetch(`${API_BASE}/framework`);
        if (frameworkResp.ok) {
          setFramework(await frameworkResp.json());
        }

        let userId = localStorage.getItem(USER_KEY);
        if (!userId) {
          const resp = await fetch(`${API_BASE}/users/guest`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ displayName: '访客学员' })
          });
          const data = await resp.json();
          userId = data.id;
          localStorage.setItem(USER_KEY, userId);
          setUser(data);
        } else {
          const dashboardData = await loadDashboard(userId, 'overview');
          if (!dashboardData) {
            localStorage.removeItem(USER_KEY);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const vocabBranchQuestion = useMemo(() => {
    if (!answers.vocabEntry) return null;
    return answers.vocabEntry.value === assessmentBank.vocab.entry.answer ? assessmentBank.vocab.challenge : assessmentBank.vocab.support;
  }, [answers.vocabEntry]);

  const listeningBranchQuestion = useMemo(() => {
    if (!answers.listeningEntry) return null;
    return answers.listeningEntry.value === assessmentBank.listening.entry.answer ? assessmentBank.listening.challenge : assessmentBank.listening.support;
  }, [answers.listeningEntry]);

  const readingBranchQuestion = useMemo(() => {
    if (!answers.readingEntry) return null;
    return answers.readingEntry.value === assessmentBank.reading.entry.answer ? assessmentBank.reading.challenge : assessmentBank.reading.support;
  }, [answers.readingEntry]);

  const writingPrompt = useMemo(() => {
    return answers.writingEntry === assessmentBank.writing.entry.answer ? assessmentBank.writing.challengePrompt : assessmentBank.writing.supportPrompt;
  }, [answers.writingEntry]);

  const assessmentSummary = useMemo(() => computeAssessmentSummary(answers), [answers]);
  const profile = resultBundle?.profile || null;
  const overview = resultBundle?.overview || null;
  const todayPlan = profile?.todayPlan || null;
  const progress = profile?.progress || null;
  const currentStage = overview?.currentStage || resultBundle?.plan?.stages?.find((stage) => stage.id === resultBundle?.plan?.currentStageId);
  const completedTasks = todayPlan?.tasks?.filter((task) => task.completed).length || 0;
  const totalTasks = todayPlan?.tasks?.length || 0;
  const allTasksDone = totalTasks > 0 && completedTasks === totalTasks;

  async function handleBuildProfile() {
    if (!user?.id || !form.goal.trim()) return;
    setSubmitting(true);
    try {
      const resp = await fetch(`${API_BASE}/users/${user.id}/bootstrap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          assessmentInput: assessmentSummary
        })
      });
      const data = normalizeBundle(await resp.json());
      setResultBundle(data);
      setStep('workspace');
      setWorkspaceView('overview');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCompleteTask(taskId) {
    if (!user?.id || syncing) return;
    setSyncing(true);
    try {
      await fetch(`${API_BASE}/users/${user.id}/tasks/${taskId}/complete`, { method: 'POST' });
      await loadDashboard(user.id, 'today');
    } finally {
      setSyncing(false);
    }
  }

  async function handleCompleteDay() {
    if (!user?.id || syncing) return;
    setSyncing(true);
    try {
      await fetch(`${API_BASE}/users/${user.id}/complete-day`, { method: 'POST' });
      await loadDashboard(user.id, 'overview');
    } finally {
      setSyncing(false);
    }
  }

  if (loading) {
    return <div className="center-screen">正在准备学习空间...</div>;
  }

  return (
    <div className="app-shell">
      <header className="topbar refined">
        <div>
          <div className="eyebrow">Memory English</div>
          <h1>更清楚地学习，而不是只做零散任务</h1>
        </div>
        <div className="user-pill compact">
          <strong>{user?.displayName || '访客学员'}</strong>
          <span>{user?.id || '未创建'}</span>
          <small>学习数据按用户独立保存</small>
        </div>
      </header>

      {!profile && (
        <>
          <section className="hero-card refined-hero">
            <div>
              <span className="badge">先看清自己，再安排学习路径</span>
              <h2>输入目标，完成首轮测评，然后拿到真正能执行的学习计划。</h2>
              <p>
                这版已经把 <strong>目标设定、半自适应测评、资源分配、多用户隔离</strong> 串起来了。
                下一步学习会围绕你的真实短板与目标场景展开，而不是一套统一模板。
              </p>
            </div>
            <div className="hero-side">
              <div className="mini-stat"><span>测评输出</span><strong>分数 + 标签 + 建议</strong></div>
              <div className="mini-stat"><span>学习层次</span><strong>知识 / 应用 / 反应</strong></div>
              <div className="mini-stat"><span>资源逻辑</span><strong>技能 × 问题 × 场景</strong></div>
            </div>
          </section>

          {step !== 'workspace' && (
            <div className="flow-tabs">
              <button className={step === 'intake' ? 'active' : ''} onClick={() => setStep('intake')}>01 目标设定</button>
              <button className={step === 'assessment' ? 'active' : ''} onClick={() => setStep('assessment')}>02 首轮测评</button>
            </div>
          )}
        </>
      )}

      {step === 'intake' && !profile && (
        <section className="panel-grid two-col">
          <div className="panel">
            <div className="section-head">
              <h3>你想通过英语做到什么</h3>
              <p>目标不预填，只给推荐写法。你写得越真实，后面的资源越贴近你。</p>
            </div>
            <label>你的学习目标</label>
            <textarea
              rows={4}
              placeholder="例如：我想在 12 周内提升工作英语，能更自然地开会、沟通和写邮件。"
              value={form.goal}
              onChange={(e) => setForm((prev) => ({ ...prev, goal: e.target.value }))}
            />
            <div className="chips">
              {goalSuggestions.map((item) => (
                <button key={item} type="button" className="chip" onClick={() => setForm((prev) => ({ ...prev, goal: item }))}>
                  {item}
                </button>
              ))}
            </div>
            <label>补充说明</label>
            <textarea
              rows={3}
              placeholder="例如：我最卡的是真实听力、开口反应，或者工作中的英文沟通。"
              value={form.goalDetail}
              onChange={(e) => setForm((prev) => ({ ...prev, goalDetail: e.target.value }))}
            />
          </div>

          <div className="panel">
            <div className="section-head">
              <h3>基础设置</h3>
              <p>这些信息只参与初始判断，真正的难度分配会以测评和后续表现为准。</p>
            </div>
            <div className="form-grid">
              <div>
                <label>计划周期</label>
                <input type="number" min="4" max="52" value={form.timelineWeeks} onChange={(e) => setForm((prev) => ({ ...prev, timelineWeeks: Number(e.target.value) }))} />
              </div>
              <div>
                <label>每日学习时长</label>
                <input type="number" min="15" max="180" value={form.dailyMinutes} onChange={(e) => setForm((prev) => ({ ...prev, dailyMinutes: Number(e.target.value) }))} />
              </div>
            </div>
            <label>当前基础</label>
            <select value={form.currentLevel} onChange={(e) => setForm((prev) => ({ ...prev, currentLevel: e.target.value }))}>
              {levelOptions.map((item) => <option key={item}>{item}</option>)}
            </select>
            <label>你最担心的问题</label>
            <div className="chips">
              {concernOptions.map((item) => {
                const active = form.concerns.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    className={`chip ${active ? 'active' : ''}`}
                    onClick={() => setForm((prev) => ({
                      ...prev,
                      concerns: active ? prev.concerns.filter((x) => x !== item) : [...prev.concerns, item]
                    }))}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <label>目标场景</label>
            <div className="chips">
              {sceneOptions.map((item) => {
                const active = form.targetScenes.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    className={`chip ${active ? 'active' : ''}`}
                    onClick={() => setForm((prev) => ({
                      ...prev,
                      targetScenes: active ? prev.targetScenes.filter((x) => x !== item) : [...prev.targetScenes, item]
                    }))}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <button className="primary-btn" disabled={!form.goal.trim()} onClick={() => setStep('assessment')}>进入测评</button>
          </div>
        </section>
      )}

      {step === 'assessment' && !profile && (
        <section className="assessment-layout">
          <div className="panel assessment-main">
            <div className="section-head">
              <h3>半自适应测评</h3>
              <p>先用中档题试探，再根据表现分流。现在这轮的目标是把你的起点看清楚，而不是追求考试感。</p>
            </div>

            <div className="question-block">
              <div className="question-head"><span>词汇｜知识层</span><em>{assessmentBank.vocab.entry.difficulty}</em></div>
              <p>{assessmentBank.vocab.entry.question}</p>
              <div className="options">
                {assessmentBank.vocab.entry.options.map((opt) => (
                  <button key={opt} className={`option ${answers.vocabEntry?.value === opt ? 'selected' : ''}`} onClick={() => setAnswers((prev) => ({ ...prev, vocabEntry: { id: assessmentBank.vocab.entry.id, value: opt } }))}>{opt}</button>
                ))}
              </div>
            </div>

            {vocabBranchQuestion && (
              <div className="question-block nested">
                <div className="question-head"><span>词汇｜分流题</span><em>{vocabBranchQuestion.difficulty}</em></div>
                <p>{vocabBranchQuestion.question}</p>
                <div className="options">
                  {vocabBranchQuestion.options.map((opt) => (
                    <button key={opt} className={`option ${answers.vocabBranch?.value === opt ? 'selected' : ''}`} onClick={() => setAnswers((prev) => ({ ...prev, vocabBranch: { id: vocabBranchQuestion.id, value: opt } }))}>{opt}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="question-block">
              <div className="question-head"><span>听力｜知识层</span><em>{assessmentBank.listening.entry.difficulty}</em></div>
              <p>{assessmentBank.listening.entry.script}</p>
              <button className="ghost-btn" onClick={() => speakText(assessmentBank.listening.entry.script)}>播放英文语音</button>
              <div className="options compact">
                {assessmentBank.listening.entry.options.map((opt) => (
                  <button key={opt} className={`option ${answers.listeningEntry?.value === opt ? 'selected' : ''}`} onClick={() => setAnswers((prev) => ({ ...prev, listeningEntry: { id: assessmentBank.listening.entry.id, value: opt } }))}>{opt}</button>
                ))}
              </div>
            </div>

            {listeningBranchQuestion && (
              <div className="question-block nested">
                <div className="question-head"><span>听力｜分流题</span><em>{listeningBranchQuestion.difficulty}</em></div>
                <p>{listeningBranchQuestion.script}</p>
                <button className="ghost-btn" onClick={() => speakText(listeningBranchQuestion.script)}>播放英文语音</button>
                <div className="options compact">
                  {listeningBranchQuestion.options.map((opt) => (
                    <button key={opt} className={`option ${answers.listeningBranch?.value === opt ? 'selected' : ''}`} onClick={() => setAnswers((prev) => ({ ...prev, listeningBranch: { id: listeningBranchQuestion.id, value: opt } }))}>{opt}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="question-block">
              <div className="question-head"><span>阅读｜应用层</span><em>{assessmentBank.reading.entry.difficulty}</em></div>
              <div className="passage">{assessmentBank.reading.entry.passage}</div>
              <p>{assessmentBank.reading.entry.question}</p>
              <div className="options compact">
                {assessmentBank.reading.entry.options.map((opt) => (
                  <button key={opt} className={`option ${answers.readingEntry?.value === opt ? 'selected' : ''}`} onClick={() => setAnswers((prev) => ({ ...prev, readingEntry: { id: assessmentBank.reading.entry.id, value: opt } }))}>{opt}</button>
                ))}
              </div>
            </div>

            {readingBranchQuestion && (
              <div className="question-block nested">
                <div className="question-head"><span>阅读｜分流题</span><em>{readingBranchQuestion.difficulty}</em></div>
                <div className="passage">{readingBranchQuestion.passage}</div>
                <p>{readingBranchQuestion.question}</p>
                <div className="options compact">
                  {readingBranchQuestion.options.map((opt) => (
                    <button key={opt} className={`option ${answers.readingBranch?.value === opt ? 'selected' : ''}`} onClick={() => setAnswers((prev) => ({ ...prev, readingBranch: { id: readingBranchQuestion.id, value: opt } }))}>{opt}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="question-block">
              <div className="question-head"><span>写作｜知识层 + 应用层</span><em>{assessmentBank.writing.entry.difficulty}</em></div>
              <p>{assessmentBank.writing.entry.question}</p>
              <div className="options compact">
                {assessmentBank.writing.entry.options.map((opt) => (
                  <button key={opt} className={`option ${answers.writingEntry === opt ? 'selected' : ''}`} onClick={() => setAnswers((prev) => ({ ...prev, writingEntry: opt }))}>{opt}</button>
                ))}
              </div>
              <div className="callout">
                <strong>{answers.writingEntry === assessmentBank.writing.entry.answer ? '已切换到更开放的写作任务' : '先给你更强的写作支架'}</strong>
                <p>{writingPrompt.prompt}</p>
                <ul>
                  {writingPrompt.scaffold.map((line) => <li key={line}>{line}</li>)}
                </ul>
              </div>
              <textarea rows={5} value={answers.writingSample} onChange={(e) => setAnswers((prev) => ({ ...prev, writingSample: e.target.value }))} placeholder="直接写英文即可。" />
            </div>

            <div className="question-block">
              <div className="question-head"><span>口语｜应用层 + 反应层</span><em>分层输出</em></div>
              <p>先朗读一遍，再做自由表达。你可以直接手动输入语音转写，先把表达暴露出来。</p>
              <div className="callout">
                <strong>朗读句子</strong>
                <p>{assessmentBank.speaking.readAloud}</p>
              </div>
              <button className="ghost-btn" onClick={() => speakText(assessmentBank.speaking.readAloud)}>播放示范语音</button>
              <label>你的朗读转写</label>
              <textarea rows={3} value={answers.readAloudTranscript} onChange={(e) => setAnswers((prev) => ({ ...prev, readAloudTranscript: e.target.value }))} placeholder="可粘贴浏览器识别文本，或手动输入。" />
              <div className="callout soft">
                <strong>自由表达</strong>
                <p>{assessmentBank.speaking.prompt}</p>
                <ul>
                  {assessmentBank.speaking.scaffold.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <textarea rows={4} value={answers.freeSpeakingTranscript} onChange={(e) => setAnswers((prev) => ({ ...prev, freeSpeakingTranscript: e.target.value }))} placeholder="把你想说的话写下来，或粘贴语音转写结果。" />
              <div className="rating-row">
                {[
                  ['accentRating', '发音自然度自评'],
                  ['fluencyRating', '流利度自评'],
                  ['confidenceRating', '开口信心自评']
                ].map(([key, label]) => (
                  <div key={key}>
                    <label>{label}</label>
                    <select value={answers[key] ?? ''} onChange={(e) => setAnswers((prev) => ({ ...prev, [key]: e.target.value ? Number(e.target.value) : null }))}>
                      <option value="">暂不填写</option>
                      {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="panel assessment-side">
            <div className="section-head">
              <h3>实时测评摘要</h3>
              <p>这里先帮助你看清起点。真正的难度还会在学习中继续校准。</p>
            </div>
            <div className="metric-list">
              <ScoreCard title="词汇" score={assessmentSummary.vocabScore} helper={`${assessmentSummary.vocabCorrect}/${assessmentSummary.vocabTotal || 0} 题正确`} />
              <ScoreCard title="听力" score={assessmentSummary.listeningScore} helper={`${assessmentSummary.listeningCorrect}/${assessmentSummary.listeningTotal || 0} 题正确`} />
              <ScoreCard title="阅读" score={assessmentSummary.readingScore} helper={`${assessmentSummary.readingCorrect}/${assessmentSummary.readingTotal || 0} 题正确`} />
              <ScoreCard title="口语" score={assessmentSummary.speakingScore} helper={assessmentSummary.speakingSimilarity == null ? '待补测' : `朗读匹配度 ${assessmentSummary.speakingSimilarity}%`} />
              <ScoreCard title="发音自然度" score={assessmentSummary.pronunciationScore} helper="朗读 + 自评综合" />
              <ScoreCard title="写作" score={assessmentSummary.writingScore} helper={`${assessmentSummary.writingWordCount || 0} 个词`} />
            </div>
            <div className="summary-box">
              <h4>预计资源难度</h4>
              <div className="difficulty-grid">
                {[
                  ['听力', assessmentSummary.listeningScore],
                  ['口语', assessmentSummary.speakingScore],
                  ['阅读', assessmentSummary.readingScore],
                  ['写作', assessmentSummary.writingScore]
                ].map(([name, score]) => (
                  <div key={name} className="difficulty-card">
                    <span>{name}</span>
                    <strong>{scoreBand(score)}</strong>
                  </div>
                ))}
              </div>
            </div>
            <button className="primary-btn" onClick={handleBuildProfile} disabled={submitting || !form.goal.trim()}>{submitting ? '正在生成学习画像...' : '生成学习画像与学习路径'}</button>
          </aside>
        </section>
      )}

      {step === 'workspace' && resultBundle && profile && (
        <section className="workspace-shell">
          <div className="workspace-nav">
            <button className={workspaceView === 'overview' ? 'active' : ''} onClick={() => setWorkspaceView('overview')}>我的学习</button>
            <button className={workspaceView === 'today' ? 'active' : ''} onClick={() => setWorkspaceView('today')}>今日学习</button>
            <button className={workspaceView === 'report' ? 'active' : ''} onClick={() => setWorkspaceView('report')}>测评报告</button>
          </div>

          {workspaceView === 'overview' && (
            <>
              <section className="overview-hero-card panel">
                <div>
                  <span className="badge">学习总览</span>
                  <h2>{form.goal || profile.form.goal}</h2>
                  <p>{profile.assessment.summary}</p>
                  <div className="hero-actions">
                    <button className="primary-btn" onClick={() => setWorkspaceView('today')}>继续今天的学习</button>
                    <button className="ghost-btn" onClick={() => setWorkspaceView('report')}>查看测评报告</button>
                  </div>
                </div>
                <div className="overview-stats-grid">
                  <div className="overview-stat"><span>总进度</span><strong>{progress.totalPercent}%</strong></div>
                  <div className="overview-stat"><span>当前阶段</span><strong>{currentStage?.name || '阶段 1'}</strong></div>
                  <div className="overview-stat"><span>当前学习日</span><strong>Day {progress.currentDay}</strong></div>
                  <div className="overview-stat"><span>下一节点</span><strong>{overview?.nextMilestone || '本周复盘'}</strong></div>
                </div>
              </section>

              <div className="panel-grid two-col">
                <div className="panel">
                  <div className="section-head">
                    <h3>整体学习路径</h3>
                    <p>让用户看得到自己在整条学习路径上的位置，而不只是今天做了几个任务。</p>
                  </div>
                  <div className="roadmap-grid">
                    {resultBundle.plan.stages.map((stage) => (
                      <StageRoadmapCard
                        key={stage.id}
                        stage={stage}
                        progress={profile.progress.stageProgress?.[stage.id] || 0}
                        active={stage.id === resultBundle.plan.currentStageId}
                      />
                    ))}
                  </div>
                </div>

                <div className="panel">
                  <div className="section-head">
                    <h3>本周安排</h3>
                    <p>这一周你会练什么、练到哪一天，一眼就能看懂。</p>
                  </div>
                  <div className="week-list">
                    {(overview?.weeklyPlan || []).map((item) => (
                      <div key={item.dayIndex} className={`week-item ${item.status}`}>
                        <div>
                          <strong>Day {item.dayIndex}</strong>
                          <p>{item.theme}</p>
                        </div>
                        <div className="week-meta">
                          <span>{item.estimatedMinutes} 分钟</span>
                          <em>{item.status === 'done' ? '已完成' : item.status === 'missed' ? '已过去' : item.status === 'today' ? '今天' : '待开始'}</em>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="panel-grid two-col">
                <div className="panel">
                  <div className="section-head">
                    <h3>能力进展</h3>
                    <p>不只看分数，也看阶段中的实际推进情况。</p>
                  </div>
                  <div className="progress-stack">
                    <ProgressRow label="听力" value={profile.progress.skillProgress.listening} helper={`当前测评 ${profile.assessment.scores.listening} 分`} />
                    <ProgressRow label="口语" value={profile.progress.skillProgress.speaking} helper={`当前测评 ${profile.assessment.scores.speaking} 分`} />
                    <ProgressRow label="阅读" value={profile.progress.skillProgress.reading} helper={`当前测评 ${profile.assessment.scores.reading} 分`} />
                    <ProgressRow label="写作" value={profile.progress.skillProgress.writing} helper={`当前测评 ${profile.assessment.scores.writing} 分`} />
                  </div>
                </div>

                <div className="panel">
                  <div className="section-head">
                    <h3>当前重点问题</h3>
                    <p>这些标签决定了为什么系统最近会这样安排任务和资源。</p>
                  </div>
                  <div className="chips static-wrap">
                    {profile.assessment.tags.map((tag) => <span key={tag} className="chip static">{tag}</span>)}
                  </div>
                  <div className="note-list">
                    {profile.assessment.feedback.map((item) => <div key={item} className="note-item">{item}</div>)}
                  </div>
                  <div className="mini-kpi-row">
                    <div className="mini-kpi"><span>连续学习</span><strong>{progress.streakDays} 天</strong></div>
                    <div className="mini-kpi"><span>本周完成率</span><strong>{progress.weeklyCompletionRate}%</strong></div>
                    <div className="mini-kpi"><span>已完成天数</span><strong>{progress.completedDays} 天</strong></div>
                  </div>
                </div>
              </div>

              <div className="panel-grid two-col">
                <div className="panel">
                  <div className="section-head">
                    <h3>最近的学习记录</h3>
                    <p>完成情况会回写到画像里，作为下一轮难度校准的依据。</p>
                  </div>
                  <div className="history-list">
                    {(overview?.recentHistory?.length ? overview.recentHistory : [{ dayIndex: progress.currentDay, theme: todayPlan?.theme, completionRate: progress.weeklyCompletionRate, completedAt: profile.updatedAt }]).map((item) => (
                      <div key={`${item.dayIndex}-${item.completedAt || item.theme}`} className="history-item">
                        <strong>Day {item.dayIndex}</strong>
                        <p>{item.theme}</p>
                        <span>{item.completionRate || 0}% 完成</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="panel next-action-panel">
                  <div className="section-head">
                    <h3>下一步</h3>
                    <p>总览页不是终点，它应该自然把你带回今天要做的事。</p>
                  </div>
                  <div className="next-action-card">
                    <span>今天要学</span>
                    <strong>{todayPlan?.theme}</strong>
                    <p>{todayPlan?.goal}</p>
                    <small>{completedTasks}/{totalTasks} 个任务已完成</small>
                  </div>
                  <button className="primary-btn full-width" onClick={() => setWorkspaceView('today')}>进入今日学习</button>
                </div>
              </div>
            </>
          )}

          {workspaceView === 'today' && todayPlan && (
            <>
              <section className="today-hero panel">
                <div>
                  <span className="badge">今日学习</span>
                  <h2>{todayPlan.title}</h2>
                  <p>{todayPlan.goal}</p>
                </div>
                <div className="today-hero-side">
                  <div className="overview-stat"><span>预计时长</span><strong>{todayPlan.estimatedMinutes} 分钟</strong></div>
                  <div className="overview-stat"><span>完成进度</span><strong>{completedTasks}/{totalTasks}</strong></div>
                </div>
              </section>

              <div className="panel-grid two-col">
                <div className="panel">
                  <div className="section-head">
                    <h3>今天要做什么</h3>
                    <p>每个任务都写清楚为什么做、做什么、对应什么资源。</p>
                  </div>
                  <div className="task-list">
                    {todayPlan.tasks.map((task) => (
                      <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                        <div className="task-card-head">
                          <div>
                            <strong>{task.title}</strong>
                            <span>{task.skill} · {task.minutes} 分钟</span>
                          </div>
                          <em>{task.completed ? '已完成' : '待完成'}</em>
                        </div>
                        <p>{task.why}</p>
                        <div className="task-meta">
                          <span>动作：{task.action}</span>
                          <small>资源：{task.resource}</small>
                        </div>
                        {!task.completed && (
                          <button className="ghost-btn" disabled={syncing} onClick={() => handleCompleteTask(task.id)}>
                            {syncing ? '同步中...' : '标记为完成'}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button className="primary-btn full-width" disabled={!allTasksDone || syncing} onClick={handleCompleteDay}>
                    {syncing ? '正在更新进度...' : allTasksDone ? '完成今天的学习' : '先完成全部任务后再结束今天'}
                  </button>
                </div>

                <div className="panel">
                  <div className="section-head">
                    <h3>今日资源</h3>
                    <p>资源不再只是任务标题，而是可以直接学的词、对话、输入和输出支架。</p>
                  </div>
                  <div className="resource-section">
                    <h4>按能力匹配的训练方式</h4>
                    <div className="resource-grid compact-grid">
                      {Object.entries(todayPlan.resourceKit.adaptiveTracks).map(([key, item]) => (
                        <div key={key} className="resource-card adaptive-card">
                          <span>{item.skill}</span>
                          <strong>{item.difficultyLabel}</strong>
                          <p>{item.trainingMode}</p>
                          <small>{item.reason}</small>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="resource-section">
                    <h4>高频词卡</h4>
                    <div className="vocab-list">
                      {todayPlan.resourceKit.vocab.slice(0, 4).map((item) => (
                        <div key={item.word} className="vocab-card">
                          <strong>{item.word}</strong>
                          <span>{item.meaning}</span>
                          <p>{item.example}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="resource-section">
                    <h4>情景对话</h4>
                    <div className="dialogue-card">
                      {todayPlan.resourceKit.dialogue.map(([speaker, line], index) => (
                        <p key={`${speaker}-${index}`}><strong>{speaker}:</strong> {line}</p>
                      ))}
                    </div>
                  </div>
                  <div className="resource-section">
                    <h4>听力与阅读支架</h4>
                    <div className="support-columns">
                      <div className="support-card">
                        <strong>听力脚本</strong>
                        <p>{todayPlan.resourceKit.listening.script}</p>
                      </div>
                      <div className="support-card">
                        <strong>阅读材料</strong>
                        <p>{todayPlan.resourceKit.reading.passage}</p>
                      </div>
                    </div>
                  </div>
                  <div className="resource-section">
                    <h4>写作与发音提示</h4>
                    <div className="support-columns">
                      <div className="support-card">
                        <strong>写作提示</strong>
                        <p>{todayPlan.resourceKit.writing.prompt}</p>
                        <small>{todayPlan.resourceKit.writing.sample}</small>
                      </div>
                      <div className="support-card">
                        <strong>发音重点</strong>
                        <p>{todayPlan.resourceKit.pronunciation.join(' · ')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {workspaceView === 'report' && (
            <>
              <div className="panel-grid two-col">
                <div className="panel">
                  <div className="section-head">
                    <h3>你的首轮学习画像</h3>
                    <p>{profile.assessment.headline}</p>
                  </div>
                  <div className="metric-list results">
                    {[
                      ['听力', profile.assessment.scores.listening],
                      ['口语', profile.assessment.scores.speaking],
                      ['阅读', profile.assessment.scores.reading],
                      ['写作', profile.assessment.scores.writing],
                      ['发音', profile.assessment.scores.pronunciation],
                      ['词汇', profile.assessment.scores.vocabulary]
                    ].map(([name, score]) => <ScoreCard key={name} title={name} score={score} helper="综合当前基础、测评表现与目标场景生成" />)}
                  </div>
                </div>

                <div className="panel">
                  <div className="section-head">
                    <h3>问题标签</h3>
                    <p>不是只告诉你多少分，而是告诉你接下来要先解决什么。</p>
                  </div>
                  <div className="chips static-wrap">
                    {profile.assessment.tags.map((tag) => <span key={tag} className="chip static">{tag}</span>)}
                  </div>
                  <div className="note-list">
                    {profile.assessment.feedback.map((item) => <div key={item} className="note-item">{item}</div>)}
                  </div>
                </div>
              </div>

              <div className="panel-grid two-col">
                <div className="panel">
                  <div className="section-head">
                    <h3>资源建议</h3>
                    <p>资源按技能 × 问题类型 × 目标场景分配，并且每个技能单独给难度。</p>
                  </div>
                  <div className="resource-grid">
                    {resultBundle.resourceAssignments.map((item) => (
                      <div key={item.id} className="resource-card">
                        <span>{item.skill}</span>
                        <strong>{formatDifficultyLabel(item.difficulty)}</strong>
                        <p>{item.trainingMode}</p>
                        <small>{item.scene} 场景 · {item.reason}</small>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="panel">
                  <div className="section-head">
                    <h3>评测细节与说明</h3>
                    <p>这一版先用可解释的规则给出首轮画像，后面还会继续接更强的真实评分。</p>
                  </div>
                  <div className="note-list">
                    {(profile.assessment.detailNotes || []).map((item) => <div key={item} className="note-item">{item}</div>)}
                    <div className="note-item">后续可继续升级口语评分、写作自然度评分和阶段复测回写。</div>
                    <div className="note-item">用户数据已经按 user_id 隔离，后续接账号体系时不需要推翻重来。</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
}

export default App;
