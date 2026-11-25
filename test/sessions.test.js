import { deepEqual, equal } from 'node:assert/strict';
import { test } from 'node:test';
import { filterSessions, sessions, toggleSaved } from '../docs/planner/sessions.js';

test('session IDs are unique so saves cannot select multiple cards', () => {
  equal(new Set(sessions.map(({ id }) => id)).size, sessions.length);
});

test('all tracks returns the full schedule in its original order', () => {
  deepEqual(filterSessions('all'), sessions);
});

test('filtering by track preserves schedule order', () => {
  deepEqual(
    filterSessions('Engineering').map(({ id }) => id),
    ['systems', 'small-prs'],
  );
});

test('saving and removing a session keeps other selections intact', () => {
  const saved = new Set(['keynote']);
  const added = toggleSaved(saved, 'systems');
  deepEqual([...added], ['keynote', 'systems']);
  deepEqual([...toggleSaved(added, 'keynote')], ['systems']);
  deepEqual([...saved], ['keynote']);
});
