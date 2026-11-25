import { filterByTrack, getTracks, toggleSaved } from './sessions.js';

const list = document.querySelector('#sessions');
const count = document.querySelector('#count');
const trackSelect = document.querySelector('#track');
let saved = new Set();
let visible = [];

function updateCount() {
  count.textContent = `${visible.length} shown · ${saved.size} saved`;
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

function render() {
  visible = filterByTrack(trackSelect.value);
  list.replaceChildren(...visible.map(sessionCard));
  updateCount();
}

trackSelect.replaceChildren(...getTracks().map((track) => new Option(track, track)));
trackSelect.addEventListener('change', render);
render();
