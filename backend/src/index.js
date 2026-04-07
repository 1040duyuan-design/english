import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import { createProfile, deleteProfile, getProfile, updateProfile } from './store.js';
import { buildInitialProfile, completeDay, completeTask } from './planner.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'english-learning-api' });
});

app.post('/api/profile/create', (req, res) => {
  const form = req.body || {};
  const id = nanoid(10);
  const profile = buildInitialProfile(form, id);
  createProfile(profile);
  res.status(201).json(profile);
});

app.get('/api/profile/:id', (req, res) => {
  const profile = getProfile(req.params.id);
  if (!profile) {
    return res.status(404).json({ message: 'Profile not found.' });
  }
  return res.json(profile);
});

app.patch('/api/profile/:id/task', (req, res) => {
  const { taskId } = req.body || {};
  if (!taskId) {
    return res.status(400).json({ message: 'taskId is required.' });
  }

  const updated = updateProfile(req.params.id, (profile) => completeTask(profile, taskId));
  if (!updated) {
    return res.status(404).json({ message: 'Profile not found.' });
  }
  return res.json(updated);
});

app.post('/api/profile/:id/complete-day', (req, res) => {
  const updated = updateProfile(req.params.id, (profile) => completeDay(profile));
  if (!updated) {
    return res.status(404).json({ message: 'Profile not found.' });
  }
  return res.json(updated);
});

app.delete('/api/profile/:id', (req, res) => {
  const deleted = deleteProfile(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: 'Profile not found.' });
  }
  return res.status(204).send();
});

app.listen(port, () => {
  console.log(`English learning API listening on http://localhost:${port}`);
});
