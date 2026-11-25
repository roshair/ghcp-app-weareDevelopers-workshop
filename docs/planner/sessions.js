export const sessions = [
  { id: 'keynote', time: '09:00', track: 'Community', title: 'Welcome to the summit' },
  { id: 'systems', time: '09:30', track: 'Engineering', title: 'Designing resilient systems' },
  { id: 'accessible', time: '10:00', track: 'Design', title: 'Making the web more accessible' },
  { id: 'small-prs', time: '10:30', track: 'Engineering', title: 'Shipping smaller pull requests' },
  { id: 'design', time: '11:00', track: 'Design', title: 'Prototyping with your team' },
  { id: 'open-source', time: '11:30', track: 'Community', title: 'Finding your first open-source issue' },
];

export function toggleSaved(saved, id) {
  const next = new Set(saved);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}

export function filterSessions(track) {
  if (!track || track === 'All tracks') return [...sessions];
  return sessions
    .filter((session) => session.track === track)
    .sort((a, b) => a.time.localeCompare(b.time));
}
