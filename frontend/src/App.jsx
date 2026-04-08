import { useEffect, useMemo, useRef, useState } from 'react';

const defaultForm = {
  goal: '希望能在澳大利亚独立生活和工作',
  goalType: 'life',
  goalDetail: '希望能把听说读写一起提起来，尤其是口语和听力。',
  timelineWeeks: 12,
  dailyMinutes: 40,
  currentLevel: '高中基础 / 基础薄弱',
  concerns: ['口语差', '听力不好', '词汇量少', '中式口音重'],
  targetScenes: ['生活', '工作']
};

const concernOptions = ['口语差', '听力不好', '词汇量少', '中式口音重', '各个方面都弱'];
const sceneOptions = ['生活', '工作', '社交', '综合'];
const levelOptions = ['基础薄弱', '高中基础 / 基础薄弱', '有一些基础 / 初中高级之间', '中级过渡', '较好'];

const assessmentBank = {
  vocab: [
    {
      id: 'v1',
      word: 'receipt',
      question: 'receipt 最接近下面哪个意思？',
      options: ['小票', '菜谱', '收件人', '排队'],
      answer: '小票'
    },
    {
      id: 'v2',
      word: 'available',
      question: 'available 最接近下面哪个意思？',
      options: ['昂贵的', '可用的 / 有空的', '延误的', '私人的'],
      answer: '可用的 / 有空的'
    },
    {
      id: 'v3',
      word: 'delay',
      question: 'delay 最接近下面哪个意思？',
      options: ['确认', '改善', '延迟', '联系'],
      answer: '延迟'
    },
    {
      id: 'v4',
      word: 'furnished',
      question: 'furnished room 通常指什么？',
      options: ['已打扫的房间', '带家具的房间', '朝南的房间', '便宜的房间'],
      answer: '带家具的房间'
    }
  ],
  listening: [
    {
      id: 'l1',
      title: '生活场景听力',
      script: 'Hello. The room is available from next Monday. Water is included, but electricity is separate.',
      question: '下面哪一项正确？',
      options: ['房间今天就能入住', '水费包含，电费另算', '所有费用都包含'],
      answer: '水费包含，电费另算'
    },
    {
      id: 'l2',
      title: '工作场景听力',
      script: 'The draft is ready, but the support script still needs feedback from the training team. We will review it again on Thursday morning.',
      question: '当前还没完成的是哪一项？',
      options: ['草稿', '支持话术反馈', '周四复盘'],
      answer: '支持话术反馈'
    }
  ],
  reading: {
    passage:
      'Hi team, I am following up on yesterday’s discussion. I have attached the latest version of the document. Please share your comments by Thursday noon so we can finalize it on time.',
    questions: [
      {
        id: 'r1',
        question: '这封邮件的主要目的是什么？',
        options: ['取消会议', '跟进昨天讨论并征求反馈', '申请请假', '介绍新同事'],
        answer: '跟进昨天讨论并征求反馈'
      },
      {
        id: 'r2',
        question: '收件人最晚什么时候反馈？',
        options: ['今天下班前', '周三中午', '周四中午', '周五上午'],
        answer: '周四中午'
      }
    ]
  },
  speaking: {
    prompt: 'Excuse me, could you tell me where the train station is?',
    tips: ['先读顺，再练停顿', '重音放在 tell / where / train station', '句尾保持礼貌语调']
  },
  writing: {
    prompt: '请用 2-3 句英文写：你为什么想学英语，以及你最想提升哪一项能力。',
    hint: '可用句型：I want to improve ... / My biggest problem is ... / I need English for ...'
  }
};

const defaultAssessment = {
  vocabAnswers: {},
  listeningAnswers: {},
  readingAnswers: {},
  writingSample: '',
  speakingTranscript: '',
  speakingSimilarity: 0,
  speakingError: '',
  accentRating: 2,
  fluencyRating: 2,
  confidenceRating: 2
};

function ProgressBar({ value, subtle = false }) {
  return (
    <div className={`progress-shell ${subtle ? 'subtle' : ''}`}>
      <div className="progress-fill" style={{ width: `${value}%` }} />
    </div>
  );
}

function speakText(text, rate = 0.9) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = rate;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function normalizeEnglish(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function computeSimilarity(target, actual) {
  const targetWords = normalizeEnglish(target).split(' ').filter(Boolean);
  const actualWords = normalizeEnglish(actual).split(' ').filter(Boolean);
  if (!targetWords.length || !actualWords.length) return 0;
  const actualSet = new Set(actualWords);
  const hit = targetWords.filter((word) => actualSet.has(word)).length;
  return Math.round((hit / targetWords.length) * 100);
}

function deriveAssessmentSummary(assessment) {
  const vocabTotal = assessmentBank.vocab.length;
  const vocabCorrect = assessmentBank.vocab.filter((item) => assessment.vocabAnswers[item.id] === item.answer).length;
  const vocabScore = Math.round((vocabCorrect / vocabTotal) * 100);

  const listeningTotal = assessmentBank.listening.length;
  const listeningCorrect = assessmentBank.listening.filter((item) => assessment.listeningAnswers[item.id] === item.answer).length;
  const listeningScore = Math.round((listeningCorrect / listeningTotal) * 100);

  const readingTotal = assessmentBank.reading.questions.length;
  const readingCorrect = assessmentBank.reading.questions.filter((item) => assessment.readingAnswers[item.id] === item.answer).length;
  const readingScore = Math.round((readingCorrect / readingTotal) * 100);

  const writing = assessment.writingSample.trim();
  const wordCount = normalizeEnglish(writing).split(' ').filter(Boolean).length;
  const sentenceCount = writing.split(/[.!?]/).filter((item) => item.trim()).length;
  let writingScore = 30;
  if (wordCount >= 8) writingScore += 20;
  if (wordCount >= 16) writingScore += 20;
  if (sentenceCount >= 2) writingScore += 15;
  if (/I|My|English|improve/i.test(writing)) writingScore += 10;
  writingScore = Math.min(100, writingScore);

  const similarity = assessment.speakingSimilarity || 0;
  const pronunciationScore = Math.min(100, Math.round(similarity * 0.6 + assessment.accentRating * 10 + assessment.fluencyRating * 8));
  const speakingScore = Math.min(100, Math.round(similarity * 0.55 + assessment.confidenceRating * 12 + assessment.fluencyRating * 10));

  return {
    vocabTotal,
    vocabCorrect,
    vocabScore,
    listeningTotal,
    listeningCorrect,
    listeningScore,
    readingTotal,
    readingCorrect,
    readingScore,
    speakingSimilarity: similarity,
    speakingScore,
    pronunciationScore,
    writingScore,
    writingWordCount: wordCount,
    writingSentenceCount: sentenceCount
  };
}

function ScoreCard({ label, value, hint }) {
  return (
    <div className="score-card">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <p>{hint}</p>
    </div>
  );
}

function ResourceCard({ title, children, action }) {
  return (
    <div className="resource-card">
      <div className="resource-head">
        <div>
          <h3>{title}</h3>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function App() {
  const [form, setForm] = useState(defaultForm);
  const [assessment, setAssessment] = useState(defaultAssessment);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('today');
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [resourceAnswers, setResourceAnswers] = useState({ listening: {}, reading: {} });
  const recognitionRef = useRef(null);

  useEffect(() => {
    const profileId = window.localStorage.getItem('english-profile-id');
    if (!profileId) return;
    fetch(`/api/profile/${profileId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('读取失败'))))
      .then((data) => setProfile(data))
      .catch(() => {
        window.localStorage.removeItem('english-profile-id');
      });
  }, []);

  const assessmentSummary = useMemo(() => deriveAssessmentSummary(assessment), [assessment]);
  const answeredCount = useMemo(() => {
    const vocabAnswered = Object.keys(assessment.vocabAnswers).length;
    const listeningAnswered = Object.keys(assessment.listeningAnswers).length;
    const readingAnswered = Object.keys(assessment.readingAnswers).length;
    const writingDone = assessment.writingSample.trim() ? 1 : 0;
    const speakingDone = assessment.speakingTranscript || assessment.speakingSimilarity > 0 || assessment.accentRating > 0 ? 1 : 0;
    return vocabAnswered + listeningAnswered + readingAnswered + writingDone + speakingDone;
  }, [assessment]);
  const assessmentProgress = Math.round((answeredCount / 10) * 100);

  const toggleMultiSelect = (field, value) => {
    setForm((prev) => {
      const exists = prev[field].includes(value);
      return {
        ...prev,
        [field]: exists ? prev[field].filter((item) => item !== value) : [...prev[field], value]
      };
    });
  };

  const updateAssessmentAnswer = (group, id, value) => {
    setAssessment((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [id]: value
      }
    }));
  };

  const startSpeakingAssessment = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setAssessment((prev) => ({
        ...prev,
        speakingError: '当前浏览器不支持自动转写。你仍然可以先朗读，再手动粘贴识别结果或继续用自评滑块完成评测。'
      }));
      return;
    }

    setAssessment((prev) => ({ ...prev, speakingError: '正在听你朗读，请正常说完整句子。' }));
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || '';
      const similarity = computeSimilarity(assessmentBank.speaking.prompt, transcript);
      setAssessment((prev) => ({
        ...prev,
        speakingTranscript: transcript,
        speakingSimilarity: similarity,
        speakingError: similarity > 0 ? '已完成朗读识别，你可以看下转写和匹配度。' : '已收到朗读，但识别结果较弱，建议再读一次。'
      }));
    };

    recognition.onerror = () => {
      setAssessment((prev) => ({
        ...prev,
        speakingError: '这次没有成功识别到语音。你可以再试一次，或者继续使用自评完成评测。'
      }));
    };

    recognition.onend = () => {
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const createPlan = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/profile/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          assessmentInput: assessmentSummary
        })
      });
      if (!res.ok) throw new Error('创建学习计划失败');
      const data = await res.json();
      setProfile(data);
      window.localStorage.setItem('english-profile-id', data.id);
      setActiveTab('today');
      setResourceAnswers({ listening: {}, reading: {} });
    } catch (err) {
      setError(err.message || '创建失败');
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async (updater) => {
    if (!profile) return;
    setLoading(true);
    setError('');
    try {
      const res = await updater();
      if (!res.ok) throw new Error('更新失败');
      const data = await res.json();
      setProfile(data);
      setResourceAnswers({ listening: {}, reading: {} });
    } catch (err) {
      setError(err.message || '更新失败');
    } finally {
      setLoading(false);
    }
  };

  const completeTask = (taskId) =>
    refreshProfile(() =>
      fetch(`/api/profile/${profile.id}/task`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId })
      })
    );

  const completeDay = () => refreshProfile(() => fetch(`/api/profile/${profile.id}/complete-day`, { method: 'POST' }));

  const resetProfile = async () => {
    if (!profile) return;
    setLoading(true);
    setError('');
    try {
      await fetch(`/api/profile/${profile.id}`, { method: 'DELETE' });
    } finally {
      window.localStorage.removeItem('english-profile-id');
      setProfile(null);
      setAssessment(defaultAssessment);
      setOnboardingStep(1);
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="app-shell intro-shell">
        <section className="hero-panel">
          <div className="hero-copy">
            <div className="brand-badge">Pathway English</div>
            <h1>从目标出发，给你一条能真正走下去的英文学习路径。</h1>
            <p>
              先做一轮快速评测，再根据你的真实短板生成阶段规划、每日学习路线和成套资源。
              不是只告诉你“要学什么”，而是直接告诉你“今天怎么学完”。
            </p>
            <div className="hero-pills">
              <span>听说读写一起提</span>
              <span>兼顾中国学生常见短板</span>
              <span>有计划，也有真实内容</span>
            </div>
            <div className="hero-snapshot card">
              <div className="snapshot-item">
                <strong>先测</strong>
                <span>词汇、听力、阅读、口语、写作</span>
              </div>
              <div className="snapshot-item">
                <strong>再规划</strong>
                <span>按目标和短板，生成阶段计划</span>
              </div>
              <div className="snapshot-item">
                <strong>最后学习</strong>
                <span>每天都有资源、练习和进度反馈</span>
              </div>
            </div>
          </div>

          <div className="onboarding card">
            <div className="step-tabs">
              {[1, 2, 3].map((step) => (
                <button
                  key={step}
                  className={`step-tab ${onboardingStep === step ? 'active' : ''}`}
                  onClick={() => setOnboardingStep(step)}
                  type="button"
                >
                  {step === 1 ? '目标' : step === 2 ? '评测' : '确认'}
                </button>
              ))}
            </div>

            {onboardingStep === 1 ? (
              <div className="stack-lg">
                <div>
                  <h2>先确认你的学习目标</h2>
                  <p className="muted">后面所有学习计划、资源难度和训练重点，都会根据这里来定。</p>
                </div>

                <label>
                  我的学习目标
                  <input value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} />
                </label>

                <label>
                  目标补充
                  <textarea rows={3} value={form.goalDetail} onChange={(e) => setForm({ ...form, goalDetail: e.target.value })} />
                </label>

                <div className="grid-two">
                  <label>
                    使用场景
                    <select value={form.goalType} onChange={(e) => setForm({ ...form, goalType: e.target.value })}>
                      <option value="life">生活英语</option>
                      <option value="work">工作英语</option>
                      <option value="social">社交表达</option>
                      <option value="general">综合提升</option>
                    </select>
                  </label>
                  <label>
                    当前基础
                    <select value={form.currentLevel} onChange={(e) => setForm({ ...form, currentLevel: e.target.value })}>
                      {levelOptions.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="grid-two">
                  <label>
                    计划周期（周）
                    <input type="number" min="4" max="52" value={form.timelineWeeks} onChange={(e) => setForm({ ...form, timelineWeeks: Number(e.target.value) })} />
                  </label>
                  <label>
                    每天学习时长（分钟）
                    <input type="number" min="20" max="120" value={form.dailyMinutes} onChange={(e) => setForm({ ...form, dailyMinutes: Number(e.target.value) })} />
                  </label>
                </div>

                <div>
                  <span className="field-label">你当前最明显的问题</span>
                  <div className="chips-wrap">
                    {concernOptions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={`chip ${form.concerns.includes(item) ? 'selected' : ''}`}
                        onClick={() => toggleMultiSelect('concerns', item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="field-label">你最常用到英语的场景</span>
                  <div className="chips-wrap">
                    {sceneOptions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={`chip ${form.targetScenes.includes(item) ? 'selected' : ''}`}
                        onClick={() => toggleMultiSelect('targetScenes', item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="actions-row">
                  <button className="primary-btn" type="button" onClick={() => setOnboardingStep(2)}>
                    继续做评测
                  </button>
                </div>
              </div>
            ) : null}

            {onboardingStep === 2 ? (
              <div className="stack-lg">
                <div className="section-inline">
                  <div>
                    <h2>做一轮快速评测</h2>
                    <p className="muted">这不是考试，而是为了让计划更像“你的课表”，而不是模板课表。</p>
                  </div>
                  <div className="mini-progress">
                    <span>完成度 {assessmentProgress}%</span>
                    <ProgressBar value={assessmentProgress} subtle />
                  </div>
                </div>

                <ResourceCard title="1. 词汇小测">
                  <div className="question-list">
                    {assessmentBank.vocab.map((item) => (
                      <div className="question-card" key={item.id}>
                        <strong>{item.question}</strong>
                        <div className="options-grid">
                          {item.options.map((option) => (
                            <button
                              key={option}
                              type="button"
                              className={`option-btn ${assessment.vocabAnswers[item.id] === option ? 'active' : ''}`}
                              onClick={() => updateAssessmentAnswer('vocabAnswers', item.id, option)}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ResourceCard>

                <ResourceCard
                  title="2. 听力小测"
                  action={<button className="ghost-btn small" type="button" onClick={() => speakText(assessmentBank.listening[0].script, 0.82)}>播放慢速示例</button>}
                >
                  <div className="question-list">
                    {assessmentBank.listening.map((item) => (
                      <div className="question-card" key={item.id}>
                        <div className="card-head-row">
                          <strong>{item.title}</strong>
                          <button className="ghost-btn small" type="button" onClick={() => speakText(item.script, 0.9)}>
                            播放音频
                          </button>
                        </div>
                        <p className="muted">听完后再答题，不看文本也可以先试一轮。</p>
                        <strong>{item.question}</strong>
                        <div className="options-grid">
                          {item.options.map((option) => (
                            <button
                              key={option}
                              type="button"
                              className={`option-btn ${assessment.listeningAnswers[item.id] === option ? 'active' : ''}`}
                              onClick={() => updateAssessmentAnswer('listeningAnswers', item.id, option)}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ResourceCard>

                <ResourceCard title="3. 阅读小测">
                  <div className="reading-box">{assessmentBank.reading.passage}</div>
                  <div className="question-list compact">
                    {assessmentBank.reading.questions.map((item) => (
                      <div className="question-card" key={item.id}>
                        <strong>{item.question}</strong>
                        <div className="options-grid">
                          {item.options.map((option) => (
                            <button
                              key={option}
                              type="button"
                              className={`option-btn ${assessment.readingAnswers[item.id] === option ? 'active' : ''}`}
                              onClick={() => updateAssessmentAnswer('readingAnswers', item.id, option)}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ResourceCard>

                <ResourceCard title="4. 口语小测">
                  <div className="stack-sm">
                    <p className="muted">先朗读下面这句英文，系统会尽量识别你的表达；如果浏览器不支持，也可以继续用自评完成。</p>
                    <div className="speak-prompt">{assessmentBank.speaking.prompt}</div>
                    <div className="hero-pills small-wrap">
                      {assessmentBank.speaking.tips.map((tip) => (
                        <span key={tip}>{tip}</span>
                      ))}
                    </div>
                    <div className="actions-row left">
                      <button className="primary-btn" type="button" onClick={startSpeakingAssessment}>
                        开始朗读识别
                      </button>
                      <button className="ghost-btn" type="button" onClick={() => speakText(assessmentBank.speaking.prompt, 0.88)}>
                        听示范
                      </button>
                    </div>
                    <div className="result-box">
                      <p><strong>识别结果：</strong>{assessment.speakingTranscript || '还没有识别结果'}</p>
                      <p><strong>匹配度：</strong>{assessment.speakingSimilarity}%</p>
                      <p className="muted">{assessment.speakingError || '建议先跟读一遍示范，再录自己的版本。'}</p>
                    </div>
                    <div className="grid-three">
                      <label>
                        你的发音自然度
                        <input type="range" min="1" max="5" value={assessment.accentRating} onChange={(e) => setAssessment({ ...assessment, accentRating: Number(e.target.value) })} />
                      </label>
                      <label>
                        你的流利度
                        <input type="range" min="1" max="5" value={assessment.fluencyRating} onChange={(e) => setAssessment({ ...assessment, fluencyRating: Number(e.target.value) })} />
                      </label>
                      <label>
                        你的开口自信度
                        <input type="range" min="1" max="5" value={assessment.confidenceRating} onChange={(e) => setAssessment({ ...assessment, confidenceRating: Number(e.target.value) })} />
                      </label>
                    </div>
                  </div>
                </ResourceCard>

                <ResourceCard title="5. 写作小测">
                  <p className="muted">{assessmentBank.writing.prompt}</p>
                  <textarea
                    rows={4}
                    placeholder={assessmentBank.writing.hint}
                    value={assessment.writingSample}
                    onChange={(e) => setAssessment({ ...assessment, writingSample: e.target.value })}
                  />
                </ResourceCard>

                <div className="actions-row between">
                  <button className="ghost-btn" type="button" onClick={() => setOnboardingStep(1)}>
                    返回修改目标
                  </button>
                  <button className="primary-btn" type="button" onClick={() => setOnboardingStep(3)}>
                    看评测结果
                  </button>
                </div>
              </div>
            ) : null}

            {onboardingStep === 3 ? (
              <div className="stack-lg">
                <div>
                  <h2>确认后生成你的专属学习路径</h2>
                  <p className="muted">系统会结合你的目标、自评短板和刚才的快速评测来定计划。</p>
                </div>

                <div className="stats-grid">
                  <ScoreCard label="词汇" value={assessmentSummary.vocabScore} hint={`${assessmentSummary.vocabCorrect}/${assessmentSummary.vocabTotal} 题正确`} />
                  <ScoreCard label="听力" value={assessmentSummary.listeningScore} hint={`${assessmentSummary.listeningCorrect}/${assessmentSummary.listeningTotal} 题正确`} />
                  <ScoreCard label="阅读" value={assessmentSummary.readingScore} hint={`${assessmentSummary.readingCorrect}/${assessmentSummary.readingTotal} 题正确`} />
                  <ScoreCard label="口语" value={assessmentSummary.speakingScore} hint={`朗读匹配度 ${assessmentSummary.speakingSimilarity}%`} />
                  <ScoreCard label="发音自然度" value={assessmentSummary.pronunciationScore} hint={`自评 + 朗读结果综合`} />
                  <ScoreCard label="写作" value={assessmentSummary.writingScore} hint={`${assessmentSummary.writingWordCount} 个单词`} />
                </div>

                <div className="preview-card">
                  <strong>系统预判</strong>
                  <ul>
                    <li>会优先补：{assessmentSummary.listeningScore <= assessmentSummary.speakingScore ? '听力理解' : '口语表达'} 与 {assessmentSummary.vocabScore <= assessmentSummary.readingScore ? '词汇储备' : '阅读理解'}</li>
                    <li>每天仍会覆盖听说读写，不会只练单一能力。</li>
                    <li>会把资源难度收在“能学进去，但又不是太简单”的范围。</li>
                  </ul>
                </div>

                {error ? <p className="error-text">{error}</p> : null}
                <div className="actions-row between">
                  <button className="ghost-btn" type="button" onClick={() => setOnboardingStep(2)}>
                    回到评测
                  </button>
                  <button className="primary-btn" type="button" disabled={loading} onClick={createPlan}>
                    {loading ? '正在生成中...' : '生成我的学习计划'}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    );
  }

  const scores = profile?.assessment?.scores || {};
  const scoreCards = [
    ['听力', scores.listening || 0, '理解输入'],
    ['口语', scores.speaking || 0, '表达输出'],
    ['阅读', scores.reading || 0, '抓取信息'],
    ['写作', scores.writing || 0, '组织表达'],
    ['发音自然度', scores.pronunciation || 0, '重音与节奏'],
    ['词汇', scores.vocabulary || 0, '高频词调用']
  ];

  const todayPlan = profile.todayPlan || { tasks: [], resourceKit: { vocab: [], dialogue: [], listening: { questions: [] }, reading: { questions: [] }, writing: { frame: [] }, pronunciation: [] } };
  const resourceKit = todayPlan.resourceKit || { vocab: [], dialogue: [], listening: { questions: [] }, reading: { questions: [] }, writing: { frame: [] }, pronunciation: [] };

  return (
    <div className="app-shell dashboard-shell">
      <header className="dashboard-hero card">
        <div>
          <div className="brand-badge">Pathway English</div>
          <h1>{profile.form.goal}</h1>
          <p>{profile.form.goalDetail}</p>
          <div className="hero-pills small-wrap">
            <span>{profile.plan.track}</span>
            <span>{profile.form.dailyMinutes} 分钟 / 天</span>
            <span>{profile.form.timelineWeeks} 周计划</span>
          </div>
        </div>
        <div className="hero-side-metrics">
          <div>
            <strong>{profile.progress.totalPercent}%</strong>
            <span>总进度</span>
          </div>
          <div>
            <strong>{profile.progress.currentDay}</strong>
            <span>当前学习日</span>
          </div>
          <div>
            <strong>{profile.progress.streakDays}</strong>
            <span>连续完成</span>
          </div>
        </div>
      </header>

      <nav className="nav-tabs">
        {[
          ['today', '今日学习'],
          ['report', '能力报告'],
          ['progress', '学习进度']
        ].map(([key, label]) => (
          <button key={key} type="button" className={`nav-tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>
            {label}
          </button>
        ))}
        <button type="button" className="nav-tab ghost last" onClick={resetProfile}>重新开始</button>
      </nav>

      {error ? <p className="error-text inline">{error}</p> : null}

      {activeTab === 'today' ? (
        <div className="content-grid">
          <section className="main-column stack-lg">
            <div className="card route-card">
              <div className="section-inline">
                <div>
                  <span className="eyebrow-text">今天的主题</span>
                  <h2>{todayPlan.title}</h2>
                  <p>{todayPlan.goal}</p>
                </div>
                <div className="route-duration">预计 {todayPlan.estimatedMinutes} 分钟</div>
              </div>
              <div className="task-list">
                {todayPlan.tasks.map((task, index) => (
                  <div key={task.id} className={`task-row ${task.completed ? 'done' : ''}`}>
                    <div className="task-index">{index + 1}</div>
                    <div className="task-copy">
                      <div className="task-topline">
                        <strong>{task.title}</strong>
                        <span>{task.skill} · {task.minutes} 分钟</span>
                      </div>
                      <p>{task.why}</p>
                      <small>怎么做：{task.action}</small>
                    </div>
                    <button className={`task-btn ${task.completed ? 'done' : ''}`} type="button" onClick={() => completeTask(task.id)}>
                      {task.completed ? '已完成' : '完成'}
                    </button>
                  </div>
                ))}
              </div>
              <div className="actions-row between">
                <div className="mini-progress wide">
                  <span>今日完成度 {profile.progress.weeklyCompletionRate}%</span>
                  <ProgressBar value={profile.progress.weeklyCompletionRate} subtle />
                </div>
                <button className="primary-btn" type="button" onClick={completeDay} disabled={loading}>
                  完成今天，进入下一天
                </button>
              </div>
            </div>

            <ResourceCard title="1. 今天先学的高频词">
              <div className="vocab-grid">
                {resourceKit.vocab?.map((item) => (
                  <div key={item.word} className="vocab-card">
                    <div className="vocab-head">
                      <strong>{item.word}</strong>
                      <button className="ghost-btn small" type="button" onClick={() => speakText(item.word, 0.8)}>听发音</button>
                    </div>
                    <p>{item.meaning}</p>
                    <small>{item.example}</small>
                  </div>
                ))}
              </div>
            </ResourceCard>

            <ResourceCard
              title="2. 情景对话与跟读"
              action={<button className="ghost-btn small" type="button" onClick={() => speakText(resourceKit.dialogue?.map((item) => item[1]).join(' '), 0.88)}>播放整段</button>}
            >
              <div className="dialogue-list">
                {resourceKit.dialogue?.map(([speaker, line], idx) => (
                  <div className="dialogue-row" key={`${speaker}-${idx}`}>
                    <div className="speaker-tag">{speaker}</div>
                    <div className="dialogue-bubble">{line}</div>
                    <button className="ghost-btn small" type="button" onClick={() => speakText(line, 0.86)}>播放</button>
                  </div>
                ))}
              </div>
              <div className="note-box">
                <strong>怎么练更有效</strong>
                <ul>
                  {resourceKit.tips?.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </div>
            </ResourceCard>

            <ResourceCard
              title="3. 听力练习"
              action={<button className="ghost-btn small" type="button" onClick={() => speakText(resourceKit.listening?.script, 0.9)}>播放听力</button>}
            >
              <div className="reading-box">建议先听一遍，再点开文本核对。<br />{resourceKit.listening?.script}</div>
              <div className="question-list compact">
                {resourceKit.listening?.questions?.map((item, idx) => (
                  <div className="question-card" key={`${item.question}-${idx}`}>
                    <strong>{item.question}</strong>
                    <div className="options-grid">
                      {item.options.map((option) => {
                        const current = resourceAnswers.listening[item.question];
                        const isActive = current === option;
                        const isCorrect = current && option === item.answer;
                        const isWrong = current === option && option !== item.answer;
                        return (
                          <button
                            key={option}
                            type="button"
                            className={`option-btn ${isActive ? 'active' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                            onClick={() => setResourceAnswers((prev) => ({
                              ...prev,
                              listening: {
                                ...prev.listening,
                                [item.question]: option
                              }
                            }))}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </ResourceCard>

            <div className="grid-two-layout">
              <ResourceCard title="4. 阅读输入">
                <strong>{resourceKit.reading?.title}</strong>
                <div className="reading-box">{resourceKit.reading?.passage}</div>
                <div className="question-list compact">
                  {resourceKit.reading?.questions?.map((item, idx) => (
                    <div className="question-card" key={`${item.question}-${idx}`}>
                      <strong>{item.question}</strong>
                      <div className="options-grid">
                        {item.options.map((option) => {
                          const current = resourceAnswers.reading[item.question];
                          const isActive = current === option;
                          const isCorrect = current && option === item.answer;
                          const isWrong = current === option && option !== item.answer;
                          return (
                            <button
                              key={option}
                              type="button"
                              className={`option-btn ${isActive ? 'active' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                              onClick={() => setResourceAnswers((prev) => ({
                                ...prev,
                                reading: {
                                  ...prev.reading,
                                  [item.question]: option
                                }
                              }))}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </ResourceCard>

              <ResourceCard title="5. 输出练习">
                <p className="muted">写作提示</p>
                <div className="writing-prompt">{resourceKit.writing?.prompt}</div>
                <div className="frame-box">
                  {resourceKit.writing?.frame?.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </div>
                <div className="sample-box">
                  <strong>参考表达</strong>
                  <p>{resourceKit.writing?.sample}</p>
                </div>
                <div className="sample-box">
                  <strong>今天的发音重点</strong>
                  <div className="frame-box">
                    {resourceKit.pronunciation?.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </div>
                </div>
              </ResourceCard>
            </div>
          </section>

          <aside className="side-column stack-lg">
            <div className="card compact-card">
              <div className="section-inline">
                <h3>学习概览</h3>
                <span>{profile.progress.totalPercent}%</span>
              </div>
              <ProgressBar value={profile.progress.totalPercent} />
              <div className="mini-stats">
                <div><strong>{profile.progress.completedDays}</strong><span>已完成天数</span></div>
                <div><strong>{profile.progress.streakDays}</strong><span>连续学习</span></div>
                <div><strong>{profile.progress.weeklyCompletionRate}%</strong><span>今日完成率</span></div>
              </div>
            </div>

            <div className="card compact-card">
              <h3>今天为什么这么安排</h3>
              <ul className="plain-list">
                <li>先词汇激活，是为了降低听力和开口门槛。</li>
                <li>先听后说，是为了让表达先进入耳朵再进入嘴巴。</li>
                <li>最后安排读写整合，是为了防止只会做单项训练。</li>
              </ul>
            </div>

            <div className="card compact-card accent-card">
              <h3>你的当前短板标签</h3>
              <div className="chips-wrap soft">
                {(profile.assessment?.tags || []).map((tag) => (
                  <span className="chip static" key={tag}>{tag}</span>
                ))}
              </div>
              <p className="muted">这些标签会影响每天任务的比重和资源难度。</p>
            </div>
          </aside>
        </div>
      ) : null}

      {activeTab === 'report' ? (
        <div className="stack-lg">
          <div className="card">
            <div className="section-inline">
              <div>
                <span className="eyebrow-text">能力报告</span>
                <h2>{profile.assessment?.headline}</h2>
              </div>
            </div>
            <p>{profile.assessment?.summary}</p>
            <div className="stats-grid">
              {scoreCards.map(([label, value, hint]) => (
                <ScoreCard key={label} label={label} value={value} hint={hint} />
              ))}
            </div>
          </div>

          <div className="grid-two-layout">
            <div className="card">
              <h3>系统判断</h3>
              <ul className="plain-list">
                {(profile.assessment?.feedback || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="note-box subtle-note">
                <strong>这轮快速评测记录</strong>
                <ul>
                  {(profile.assessment?.detailNotes || []).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="card">
              <h3>阶段学习计划</h3>
              <div className="stage-list">
                {(profile.plan?.stages || []).map((stage) => (
                  <div className="stage-card" key={stage.id}>
                    <div className="section-inline">
                      <strong>{stage.name}</strong>
                      <span>{stage.weeks} 周</span>
                    </div>
                    <div className="frame-box">
                      {stage.focus.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                    <p>{stage.outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {activeTab === 'progress' ? (
        <div className="stack-lg">
          <div className="card">
            <div className="section-inline">
              <div>
                <span className="eyebrow-text">进度追踪</span>
                <h2>你不是只在“完成任务”，而是在慢慢把能力补起来。</h2>
              </div>
            </div>
            <div className="grid-four">
              {[
                ['听力', profile.progress?.skillProgress?.listening || 0],
                ['口语', profile.progress?.skillProgress?.speaking || 0],
                ['阅读', profile.progress?.skillProgress?.reading || 0],
                ['写作', profile.progress?.skillProgress?.writing || 0]
              ].map(([label, value]) => (
                <div key={label} className="skill-progress-card">
                  <div className="section-inline">
                    <strong>{label}</strong>
                    <span>{value}%</span>
                  </div>
                  <ProgressBar value={value} subtle />
                </div>
              ))}
            </div>
          </div>

          <div className="grid-two-layout">
            <div className="card">
              <h3>阶段推进</h3>
              {Object.entries(profile.progress?.stageProgress || {}).map(([key, value]) => (
                <div className="stage-progress-row" key={key}>
                  <div className="section-inline">
                    <span>{key.replace('stage-', '阶段 ')}</span>
                    <span>{value}%</span>
                  </div>
                  <ProgressBar value={value} subtle />
                </div>
              ))}
            </div>
            <div className="card">
              <h3>最近完成记录</h3>
              <div className="history-list">
                {(profile.history || []).length ? (
                  profile.history.slice(-6).reverse().map((item) => (
                    <div className="history-row" key={`${item.dayIndex}-${item.completedAt}`}>
                      <div>
                        <strong>Day {item.dayIndex}</strong>
                        <p>{item.theme}</p>
                      </div>
                      <span>{item.completionRate}%</span>
                    </div>
                  ))
                ) : (
                  <p className="muted">你完成几天后，这里会开始记录学习轨迹。</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
