import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import {
  createGuestUser,
  getDashboard,
  getProfile,
  getUser,
  saveAssessment,
  savePlan,
  saveProfile,
  saveResourceAssignments,
  saveStudySession,
  touchUser
} from './store.js';
import { assessmentFramework, multiUserDataModel, problemTagDictionary, resourceMappingPrinciples } from './framework.js';
import { buildInitialProfile, buildWeeklyPlan, completeDay, completeTask } from './planner.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

function scoreToDifficulty(score) {
  if (score == null) return 'bridge';
  if (score < 45) return 'support';
  if (score < 75) return 'bridge';
  return 'challenge';
}

function skillToTrainingMode(skill, tags = []) {
  if (skill === 'speaking') {
    if (tags.includes('发音自然度偏弱')) return '跟读 + 重音节奏';
    if (tags.includes('开口反应慢')) return '限时开口 + 场景抢答';
    return '角色扮演 + 半开放表达';
  }
  if (skill === 'listening') {
    return tags.includes('听力输入薄弱') ? '慢速输入 + 关键词抓取' : '正常语速 + 信息提取';
  }
  if (skill === 'writing') {
    return '句型支架 + 场景写作';
  }
  if (skill === 'reading') {
    return '信息提取 + 场景文本';
  }
  return '综合整合';
}

function buildResourceAssignments(profile) {
  const scores = profile?.assessment?.scores || {};
  const tags = profile?.assessment?.tags || [];
  const scenes = profile?.form?.targetScenes || ['综合'];
  const scene = scenes[0] || '综合';
  const skillMap = [
    ['listening', '听力'],
    ['speaking', '口语'],
    ['reading', '阅读'],
    ['writing', '写作'],
    ['pronunciation', '发音']
  ];

  return skillMap.map(([key, label]) => ({
    id: nanoid(8),
    skill: label,
    difficulty: scoreToDifficulty(scores[key]),
    scene,
    trainingMode: skillToTrainingMode(key === 'pronunciation' ? 'speaking' : key, tags),
    reason: `根据当前${label}表现与问题标签自动分配。`
  }));
}


function enrichDashboardPayload(dashboard) {
  if (!dashboard?.profile) {
    return { ...dashboard, overview: null };
  }

  const currentStage = dashboard.profile.plan.stages.find(
    (stage) => stage.id === dashboard.profile.plan.currentStageId
  ) || dashboard.profile.plan.stages[0];

  return {
    ...dashboard,
    overview: {
      currentStage,
      weeklyPlan: buildWeeklyPlan(dashboard.profile),
      nextMilestone:
        dashboard.profile.progress.currentDay % 5 === 0
          ? '今天适合做阶段复盘或微测评'
          : `${5 - ((dashboard.profile.progress.currentDay - 1) % 5 + 1)} 天后进入本周复盘`,
      recentHistory: (dashboard.profile.history || []).slice(-5).reverse()
    }
  };
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'english-learning-api', version: 'v5' });
});

app.get('/api/framework', (_req, res) => {
  res.json({
    assessmentFramework,
    problemTagDictionary,
    resourceMappingPrinciples,
    multiUserDataModel
  });
});

app.post('/api/users/guest', (req, res) => {
  const user = createGuestUser(req.body?.displayName || '访客学员');
  res.status(201).json(user);
});

app.get('/api/users/:userId/dashboard', (req, res) => {
  const dashboard = getDashboard(req.params.userId);
  if (!dashboard) {
    return res.status(404).json({ message: 'User not found.' });
  }
  touchUser(req.params.userId);
  return res.json(enrichDashboardPayload(dashboard));
});

app.post('/api/users/:userId/bootstrap', (req, res) => {
  const userId = req.params.userId;
  const user = getUser(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const form = req.body || {};
  const profile = buildInitialProfile(form, `profile_${nanoid(8)}`);
  const assessmentRecord = {
    id: `assess_${nanoid(8)}`,
    type: 'initial',
    submittedAt: new Date().toISOString(),
    scores: profile.assessment.scores,
    tags: profile.assessment.tags,
    raw: form.assessmentInput || null,
    notes: profile.assessment.feedback || []
  };
  const resourceAssignments = buildResourceAssignments(profile);

  saveProfile(userId, profile);
  saveAssessment(userId, assessmentRecord);
  savePlan(userId, profile.plan);
  saveResourceAssignments(userId, resourceAssignments);
  touchUser(userId);

  return res.status(201).json({
    user,
    profile,
    assessment: assessmentRecord,
    plan: profile.plan,
    resourceAssignments,
    overview: {
      currentStage: profile.plan.stages.find((stage) => stage.id === profile.plan.currentStageId) || profile.plan.stages[0],
      weeklyPlan: buildWeeklyPlan(profile),
      nextMilestone: '4 天后进入本周复盘',
      recentHistory: []
    }
  });
});


app.post('/api/users/:userId/tasks/:taskId/complete', (req, res) => {
  const userId = req.params.userId;
  const profile = getProfile(userId);
  if (!profile) {
    return res.status(404).json({ message: 'Profile not found.' });
  }

  const updatedProfile = completeTask(profile, req.params.taskId);
  saveProfile(userId, updatedProfile);
  savePlan(userId, updatedProfile.plan);
  touchUser(userId);

  return res.status(201).json({
    profile: updatedProfile,
    plan: updatedProfile.plan,
    overview: {
      currentStage: updatedProfile.plan.stages.find((stage) => stage.id === updatedProfile.plan.currentStageId) || updatedProfile.plan.stages[0],
      weeklyPlan: buildWeeklyPlan(updatedProfile),
      nextMilestone:
        updatedProfile.progress.currentDay % 5 === 0
          ? '今天适合做阶段复盘或微测评'
          : `${5 - ((updatedProfile.progress.currentDay - 1) % 5 + 1)} 天后进入本周复盘`,
      recentHistory: (updatedProfile.history || []).slice(-5).reverse()
    }
  });
});

app.post('/api/users/:userId/complete-day', (req, res) => {
  const userId = req.params.userId;
  const profile = getProfile(userId);
  if (!profile) {
    return res.status(404).json({ message: 'Profile not found.' });
  }

  const updatedProfile = completeDay(profile);
  saveProfile(userId, updatedProfile);
  savePlan(userId, updatedProfile.plan);
  touchUser(userId);

  return res.status(201).json({
    profile: updatedProfile,
    plan: updatedProfile.plan,
    overview: {
      currentStage: updatedProfile.plan.stages.find((stage) => stage.id === updatedProfile.plan.currentStageId) || updatedProfile.plan.stages[0],
      weeklyPlan: buildWeeklyPlan(updatedProfile),
      nextMilestone:
        updatedProfile.progress.currentDay % 5 === 0
          ? '今天适合做阶段复盘或微测评'
          : `${5 - ((updatedProfile.progress.currentDay - 1) % 5 + 1)} 天后进入本周复盘`,
      recentHistory: (updatedProfile.history || []).slice(-5).reverse()
    }
  });
});

app.post('/api/users/:userId/study-sessions', (req, res) => {
  const userId = req.params.userId;
  const user = getUser(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  const payload = req.body || {};
  const session = saveStudySession(userId, {
    id: `session_${nanoid(8)}`,
    createdAt: new Date().toISOString(),
    completionRate: payload.completionRate ?? null,
    skippedTasks: payload.skippedTasks || [],
    selfDifficulty: payload.selfDifficulty || null,
    feedback: payload.feedback || '',
    calibrationSignal: payload.calibrationSignal || 'behavioral'
  });
  touchUser(userId);
  return res.status(201).json(session);
});

app.listen(port, () => {
  console.log(`English learning API listening on http://localhost:${port}`);
});
