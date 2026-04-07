import fs from 'fs';
import path from 'path';

const dataDir = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const dataFile = path.join(dataDir, 'profiles.json');

function ensureStore() {
  fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ profiles: {} }, null, 2), 'utf-8');
  }
}

function readStore() {
  ensureStore();
  const content = fs.readFileSync(dataFile, 'utf-8');
  return JSON.parse(content || '{"profiles":{}}');
}

function writeStore(data) {
  ensureStore();
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf-8');
}

export function createProfile(profile) {
  const store = readStore();
  store.profiles[profile.id] = profile;
  writeStore(store);
  return profile;
}

export function getProfile(id) {
  const store = readStore();
  return store.profiles[id] || null;
}

export function updateProfile(id, updater) {
  const store = readStore();
  const existing = store.profiles[id];
  if (!existing) return null;
  const updated = updater(existing);
  store.profiles[id] = updated;
  writeStore(store);
  return updated;
}

export function deleteProfile(id) {
  const store = readStore();
  if (!store.profiles[id]) return false;
  delete store.profiles[id];
  writeStore(store);
  return true;
}
