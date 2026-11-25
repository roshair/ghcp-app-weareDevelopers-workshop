import { deepEqual, equal } from 'node:assert/strict';
import { test } from 'node:test';
import { ALL_TRACKS, filterByTrack, getTracks, sessions, toggleSaved } from '../docs/planner/sessions.js';

test('track filter defaults to all six sessions', () => {
  equal(getTracks()[0], ALL_TRACKS);
  equal(filterByTrack(ALL_TRACKS).length, 6);
});

test('Engineering shows its two sessions in time order and All restores six', () => {
  deepEqual(filterByTrack('Engineering').map(({ id }) => id), ['systems', 'small-prs']);
  equal(filterByTrack(ALL_TRACKS).length, 6);
});

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
