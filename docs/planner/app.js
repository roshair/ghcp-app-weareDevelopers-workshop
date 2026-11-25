import { filterSessions, sessions, toggleSaved } from './sessions.js';

const list = document.querySelector('#sessions');
const count = document.querySelector('#count');
const trackSelect = document.querySelector('#track');
let saved = new Set();
let selectedTrack = 'All tracks';

function updateCount() {
  const visibleSessions = filterSessions(sessions, selectedTrack);
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
  const updateButton = () => {
    const isSaved = saved.has(session.id);
    button.textContent = isSaved ? 'Saved' : 'Save';
    button.setAttribute('aria-label', `${isSaved ? 'Remove' : 'Save'} ${session.title}`);
    button.setAttribute('aria-pressed', String(isSaved));
  };
  updateButton();
  button.addEventListener('click', () => {
    saved = toggleSaved(saved, session.id);
    updateButton();
    updateCount();
  });
  card.append(meta, title, button);
  return card;
}

function render() {
  const visibleSessions = filterSessions(sessions, selectedTrack);
  list.replaceChildren(...visibleSessions.map(sessionCard));
  updateCount();
}

trackSelect.addEventListener('change', () => {
  selectedTrack = trackSelect.value;
  render();
});

render();
updateCount();
