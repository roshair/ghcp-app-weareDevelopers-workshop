import { deepEqual, equal } from 'node:assert/strict';
import { test } from 'node:test';
import { filterSessions, sessions, toggleSaved } from '../docs/planner/sessions.js';

test('session IDs are unique so saves cannot select multiple cards', () => {
  equal(new Set(sessions.map(({ id }) => id)).size, sessions.length);
});

test('saving and removing a session keeps other selections intact', () => {
  const saved = new Set(['keynote']);
  const added = toggleSaved(saved, 'systems');
  deepEqual([...added], ['keynote', 'systems']);
  deepEqual([...toggleSaved(added, 'keynote')], ['systems']);
  deepEqual([...saved], ['keynote']);
});

test('all tracks shows every session', () => {
  deepEqual(filterSessions('All tracks'), sessions);
});

test('engineering filter returns two sessions in time order', () => {
  deepEqual(
    filterSessions('Engineering').map(({ id }) => id),
    ['systems', 'small-prs'],
  );
});

test('saved sessions remain unchanged when a track is filtered', () => {
  const saved = new Set(['keynote']);
  deepEqual([...filterSessions('Engineering')].map(({ id }) => id), ['systems', 'small-prs']);
  deepEqual([...saved], ['keynote']);
});
