import { filterSessions, sessions, toggleSaved } from './sessions.js';

const list = document.querySelector('#sessions');
const count = document.querySelector('#count');
const trackFilter = document.querySelector('#track-filter');
let saved = new Set();
let visibleSessions = sessions;

for (const track of new Set(sessions.map((session) => session.track))) {
  const option = document.createElement('option');
  option.value = track;
  option.textContent = track;
  trackFilter.append(option);
}

function updateCount() {
  count.textContent = `${visibleSessions.length} shown · ${saved.size} saved`;
}

function sessionCard(session) {
  const card = document.createElement('li');
  const meta = document.createElement('p');
  meta.className = 'meta';
  meta.textContent = `${session.time} · ${session.track}`;
  const title = document.createElement('h3');
  title.textContent = session.title;
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Save';
  button.setAttribute('aria-label', `Save ${session.title}`);
  const updateButton = () => button.setAttribute('aria-pressed', String(saved.has(session.id)));
  updateButton();
  button.addEventListener('click', () => {
    saved = toggleSaved(saved, session.id);
    updateButton();
    updateCount();
  });
  card.append(meta, title, button);
  return card;
}

function renderSessions() {
  visibleSessions = filterSessions(trackFilter.value);
  list.replaceChildren(...visibleSessions.map(sessionCard));
  updateCount();
}

trackFilter.addEventListener('change', renderSessions);
renderSessions();
