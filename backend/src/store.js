import fs from 'fs';
import path from 'path';

const dataDir = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const dataFile = path.join(dataDir, 'store.json');

const EMPTY_STORE = {
  users: {},
  profiles: {},
  assessments: {},
  plans: {},
  studySessions: {},
  resourceAssignments: {}
};

function ensureStore() {
  fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify(EMPTY_STORE, null, 2), 'utf-8');
  }
}

function readStore() {
  ensureStore();
  try {
    const content = fs.readFileSync(dataFile, 'utf-8');
    return { ...EMPTY_STORE, ...(JSON.parse(content || '{}')) };
  } catch {
    return { ...EMPTY_STORE };
  }
}

function writeStore(nextStore) {
  ensureStore();
  fs.writeFileSync(dataFile, JSON.stringify(nextStore, null, 2), 'utf-8');
}

export function createGuestUser(displayName = '访客学员') {
  const store = readStore();
  const id = `user_${Math.random().toString(36).slice(2, 10)}`;
  const user = {
    id,
    displayName,
    role: 'learner',
    authMode: 'guest',
    createdAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString()
  };
  store.users[id] = user;
  store.assessments[id] = [];
  store.studySessions[id] = [];
  store.resourceAssignments[id] = [];
  writeStore(store);
  return user;
}

export function getUser(userId) {
  const store = readStore();
  return store.users[userId] || null;
}

export function getProfile(userId) {
  const store = readStore();
  return store.profiles[userId] || null;
}

export function touchUser(userId) {
  const store = readStore();
  if (!store.users[userId]) return null;
  store.users[userId].lastActiveAt = new Date().toISOString();
  writeStore(store);
  return store.users[userId];
}

export function saveProfile(userId, profile) {
  const store = readStore();
  store.profiles[userId] = profile;
  writeStore(store);
  return profile;
}

export function saveAssessment(userId, assessment) {
  const store = readStore();
  if (!store.assessments[userId]) store.assessments[userId] = [];
  store.assessments[userId].push(assessment);
  writeStore(store);
  return assessment;
}

export function savePlan(userId, plan) {
  const store = readStore();
  store.plans[userId] = plan;
  writeStore(store);
  return plan;
}

export function saveResourceAssignments(userId, assignments) {
  const store = readStore();
  store.resourceAssignments[userId] = assignments;
  writeStore(store);
  return assignments;
}

export function saveStudySession(userId, session) {
  const store = readStore();
  if (!store.studySessions[userId]) store.studySessions[userId] = [];
  store.studySessions[userId].push(session);
  writeStore(store);
  return session;
}

export function getDashboard(userId) {
  const store = readStore();
  const user = store.users[userId] || null;
  if (!user) return null;
  return {
    user,
    profile: store.profiles[userId] || null,
    assessments: store.assessments[userId] || [],
    plan: store.plans[userId] || null,
    resourceAssignments: store.resourceAssignments[userId] || [],
    studySessions: store.studySessions[userId] || []
  };
}
