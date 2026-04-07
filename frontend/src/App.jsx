import { useEffect, useMemo, useState } from 'react';

const defaultForm = {
  goal: '希望能在澳大利亚独立生活和工作',
  goalType: 'life',
  goalDetail: '我希望听说读写都提升，并且口语和听力要更真实可用。',
  timelineWeeks: 12,
  dailyMinutes: 40,
  currentLevel: '高中基础 / 基础薄弱',
  concerns: ['口语差', '听力不好', '词汇量少', '中式口音重'],
  targetScenes: ['生活', '工作']
};

const concernOptions = ['口语差', '听力不好', '词汇量少', '中式口音重', '各个方面都弱'];
const sceneOptions = ['生活', '工作', '社交', '综合'];
const levelOptions = ['基础薄弱', '高中基础 / 基础薄弱', '有一些基础 / 初中高级之间', '中级过渡', '较好'];

function ProgressBar({ value }) {
  return (
    <div className="progress-shell">
      <div className="progress-fill" style={{ width: `${value}%` }} />
    </div>
  );
}

function ScorePill({ label, value }) {
  return (
    <div className="score-pill">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function App() {
  const [form, setForm] = useState(defaultForm);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('today');

  useEffect(() => {
    const profileId = window.localStorage.getItem('english-profile-id');
    if (!profileId) return;
    fetch(`/api/profile/${profileId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('读取进度失败'))))
      .then((data) => setProfile(data))
      .catch(() => {
        window.localStorage.removeItem('english-profile-id');
      });
  }, []);

  const scores = profile?.assessment?.scores || {};
  const scoreCards = useMemo(() => ([
    ['听力', scores.listening],
    ['口语', scores.speaking],
    ['阅读', scores.reading],
    ['写作', scores.writing],
    ['发音自然度', scores.pronunciation],
    ['词汇', scores.vocabulary]
  ]), [scores]);

  const createPlan = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/profile/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('创建学习计划失败');
      const data = await res.json();
      setProfile(data);
      window.localStorage.setItem('english-profile-id', data.id);
      setActiveTab('today');
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
    } catch (err) {
      setError(err.message || '更新失败');
    } finally {
      setLoading(false);
    }
  };

  const completeTask = (taskId) => refreshProfile(() => fetch(`/api/profile/${profile.id}/task`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ taskId })
  }));

  const completeDay = () => refreshProfile(() => fetch(`/api/profile/${profile.id}/complete-day`, {
    method: 'POST'
  }));

  const resetProfile = async () => {
    if (!profile) return;
    setLoading(true);
    setError('');
    try {
      await fetch(`/api/profile/${profile.id}`, { method: 'DELETE' });
    } finally {
      window.localStorage.removeItem('english-profile-id');
      setProfile(null);
      setLoading(false);
    }
  };

  const toggleMultiSelect = (field, value) => {
    setForm((prev) => {
      const exists = prev[field].includes(value);
      return {
        ...prev,
        [field]: exists ? prev[field].filter((item) => item !== value) : [...prev[field], value]
      };
    });
  };

  if (!profile) {
    return (
      <div className="page-shell">
        <section className="hero-card">
          <div className="hero-copy">
            <span className="eyebrow">Goal-driven English Learning</span>
            <h1>让用户一进来就知道该学什么、为什么学、今天怎么学完。</h1>
            <p>
              这个 MVP 会先识别你的目标和短板，再生成一条适合中国学习者的学习路径：
              听说读写一起提升，但会把时间更多投给你最薄弱的部分。
            </p>
            <div className="hero-points">
              <span>目标驱动</span>
              <span>能力诊断</span>
              <span>每日计划</span>
              <span>进度追踪</span>
            </div>
          </div>
          <div className="panel-card form-card">
            <h2>1. 先告诉 AI 你的目标</h2>
            <label>
              学习目标
              <input value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} />
            </label>
            <label>
              目标类型
              <select value={form.goalType} onChange={(e) => setForm({ ...form, goalType: e.target.value })}>
                <option value="life">生活英语</option>
                <option value="work">工作英语</option>
                <option value="social">社交表达</option>
                <option value="general">综合提升</option>
              </select>
            </label>
            <label>
              目标补充说明
              <textarea value={form.goalDetail} onChange={(e) => setForm({ ...form, goalDetail: e.target.value })} rows={4} />
            </label>
            <div className="grid two-col">
              <label>
                计划周期（周）
                <input type="number" min="4" max="52" value={form.timelineWeeks} onChange={(e) => setForm({ ...form, timelineWeeks: Number(e.target.value) })} />
              </label>
              <label>
                每天学习时长（分钟）
                <input type="number" min="20" max="120" value={form.dailyMinutes} onChange={(e) => setForm({ ...form, dailyMinutes: Number(e.target.value) })} />
              </label>
            </div>
            <label>
              当前基础
              <select value={form.currentLevel} onChange={(e) => setForm({ ...form, currentLevel: e.target.value })}>
                {levelOptions.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>

            <div>
              <span className="field-label">你当前最担心的问题</span>
              <div className="chips">
                {concernOptions.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={`chip ${form.concerns.includes(item) ? 'selected' : ''}`}
                    onClick={() => toggleMultiSelect('concerns', item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="field-label">主要使用场景</span>
              <div className="chips">
                {sceneOptions.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={`chip ${form.targetScenes.includes(item) ? 'selected' : ''}`}
                    onClick={() => toggleMultiSelect('targetScenes', item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <button className="primary-btn" onClick={createPlan} disabled={loading}>
              {loading ? '正在生成规划...' : '生成我的英语学习计划'}
            </button>
            {error ? <p className="error-text">{error}</p> : null}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <div>
          <span className="eyebrow">Current goal</span>
          <h1>{profile.form.goal}</h1>
          <p>{profile.form.goalDetail}</p>
        </div>
        <div className="topbar-actions">
          <button className="ghost-btn" onClick={resetProfile}>重新开始</button>
        </div>
      </header>

      <section className="overview-grid">
        <div className="panel-card">
          <div className="section-heading">
            <h2>总进度</h2>
            <span>{profile.progress.totalPercent}%</span>
          </div>
          <ProgressBar value={profile.progress.totalPercent} />
          <div className="stat-row">
            <div><strong>{profile.progress.currentDay}</strong><span>当前天数</span></div>
            <div><strong>{profile.progress.streakDays}</strong><span>连续完成</span></div>
            <div><strong>{profile.progress.completedDays}</strong><span>已完成天数</span></div>
            <div><strong>{profile.progress.weeklyCompletionRate}%</strong><span>今日完成率</span></div>
          </div>
        </div>

        <div className="panel-card">
          <div className="section-heading">
            <h2>今日重点</h2>
            <span>{profile.todayPlan.estimatedMinutes} 分钟</span>
          </div>
          <p className="callout">{profile.todayPlan.goal}</p>
          <ul className="bullet-list compact">
            {profile.todayPlan.resources.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>

      <nav className="tabbar">
        {[
          ['today', '今日学习'],
          ['assessment', '能力报告'],
          ['roadmap', '阶段规划'],
          ['progress', '学习进度']
        ].map(([key, label]) => (
          <button key={key} className={activeTab === key ? 'tab active' : 'tab'} onClick={() => setActiveTab(key)}>
            {label}
          </button>
        ))}
      </nav>

      {error ? <p className="error-text inline">{error}</p> : null}

      {activeTab === 'today' && (
        <section className="content-grid">
          <div className="panel-card large-card">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Today</span>
                <h2>{profile.todayPlan.title}</h2>
              </div>
              <span>{profile.todayPlan.estimatedMinutes} 分钟</span>
            </div>
            <div className="task-list">
              {profile.todayPlan.tasks.map((task) => (
                <article key={task.id} className={`task-card ${task.completed ? 'done' : ''}`}>
                  <div className="task-main">
                    <div className="task-meta">
                      <span className="task-skill">{task.skill}</span>
                      <span>{task.minutes} 分钟</span>
                    </div>
                    <h3>{task.title}</h3>
                    <p>{task.action}</p>
                    <p className="muted">为什么这样学：{task.why}</p>
                    <p className="resource-note">资源：{task.resource}</p>
                  </div>
                  <button className={task.completed ? 'secondary-btn' : 'primary-btn small'} disabled={loading || task.completed} onClick={() => completeTask(task.id)}>
                    {task.completed ? '已完成' : '完成任务'}
                  </button>
                </article>
              ))}
            </div>
            <div className="action-row">
              <button className="primary-btn" onClick={completeDay} disabled={loading}>完成今天，进入下一天</button>
            </div>
          </div>

          <div className="side-stack">
            <div className="panel-card">
              <h2>为什么今天这么安排</h2>
              <ul className="bullet-list">
                <li>先用高频词和句型热身，降低听力与开口门槛。</li>
                <li>再做可理解输入，解决“文字看得懂，音频听不懂”的常见问题。</li>
                <li>随后把输入转成可调用表达，避免只学不说。</li>
                <li>最后做整合练习和复盘，避免学习歧义。</li>
              </ul>
            </div>
            <div className="panel-card">
              <h2>中国学习者适配标签</h2>
              <div className="chips readonly">
                {profile.assessment.tags.map((item) => <span key={item} className="chip selected static">{item}</span>)}
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'assessment' && (
        <section className="content-grid assessment-layout">
          <div className="panel-card large-card">
            <span className="eyebrow">Assessment</span>
            <h2>{profile.assessment.headline}</h2>
            <p className="callout">{profile.assessment.summary}</p>
            <div className="score-grid">
              {scoreCards.map(([label, value]) => <ScorePill key={label} label={label} value={value ?? '-'} />)}
            </div>
            <h3>关键反馈</h3>
            <ul className="bullet-list">
              {profile.assessment.feedback.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="panel-card">
            <h2>你的学习画像</h2>
            <div className="chips readonly">
              {profile.assessment.tags.map((item) => <span key={item} className="chip selected static">{item}</span>)}
            </div>
            <p className="muted">这个画像会影响每日任务比重、资源难度和 AI 反馈重点。</p>
          </div>
        </section>
      )}

      {activeTab === 'roadmap' && (
        <section className="panel-card large-card">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Roadmap</span>
              <h2>{profile.plan.track} · {profile.plan.totalWeeks} 周规划</h2>
            </div>
            <span>当前阶段：{profile.plan.currentStageId}</span>
          </div>
          <div className="stage-list">
            {profile.plan.stages.map((stage) => (
              <article key={stage.id} className={`stage-card ${profile.plan.currentStageId === stage.id ? 'active-stage' : ''}`}>
                <div className="section-heading">
                  <div>
                    <h3>{stage.name}</h3>
                    <p>{stage.weeks} 周</p>
                  </div>
                  <span>{profile.progress.stageProgress[stage.id]}%</span>
                </div>
                <ProgressBar value={profile.progress.stageProgress[stage.id]} />
                <ul className="bullet-list compact">
                  {stage.focus.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <p className="muted">{stage.outcome}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'progress' && (
        <section className="content-grid">
          <div className="panel-card large-card">
            <span className="eyebrow">Skill progress</span>
            <h2>四项能力进度</h2>
            {Object.entries(profile.progress.skillProgress).map(([key, value]) => (
              <div key={key} className="progress-row">
                <div className="progress-label">
                  <span>{({ listening: '听力', speaking: '口语', reading: '阅读', writing: '写作' })[key]}</span>
                  <span>{value}%</span>
                </div>
                <ProgressBar value={value} />
              </div>
            ))}
          </div>
          <div className="panel-card">
            <h2>最近完成记录</h2>
            {profile.history.length ? (
              <ul className="timeline-list">
                {[...profile.history].reverse().slice(0, 5).map((item) => (
                  <li key={`${item.dayIndex}-${item.completedAt}`}>
                    <strong>Day {item.dayIndex}</strong>
                    <span>{item.theme}</span>
                    <span>{item.completionRate}% 完成</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted">你完成一天学习后，这里会显示最近进展。</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
