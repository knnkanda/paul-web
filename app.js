const grid = document.querySelector('#app-grid');
const tagList = document.querySelector('#tag-list');
const searchInput = document.querySelector('#search-input');
const emptyState = document.querySelector('#empty-state');
const resultCount = document.querySelector('#result-count');
let selectedTag = 'すべて';

const allTags = ['すべて', ...new Set(apps.flatMap((app) => app.tags))];

function renderTags() {
  tagList.innerHTML = allTags.map((tag) => `<button class="tag-button ${tag === selectedTag ? 'active' : ''}" type="button" data-tag="${tag}">${tag}</button>`).join('');
  tagList.querySelectorAll('[data-tag]').forEach((button) => {
    button.addEventListener('click', () => { selectedTag = button.dataset.tag; renderTags(); renderApps(); });
  });
}

function getFilteredApps() {
  const query = searchInput.value.trim().toLowerCase();
  return apps.filter((app) => {
    const matchesTag = selectedTag === 'すべて' || app.tags.includes(selectedTag);
    const searchable = [app.title, app.description, ...app.tags].join(' ').toLowerCase();
    return matchesTag && (!query || searchable.includes(query));
  });
}

function renderApps() {
  const filtered = getFilteredApps();
  resultCount.textContent = filtered.length;
  emptyState.hidden = filtered.length !== 0;
  grid.innerHTML = filtered.map((app) => `
    <article class="app-card">
      <a class="thumbnail ${app.visual}" href="${app.url}" target="_blank" rel="noreferrer noopener" aria-label="${app.title}を開く">
        <div class="thumb-grid"></div><div class="thumb-label"><small>${app.visualSub}</small>${app.visualLabel}</div>
      </a>
      <div class="card-content"><div class="card-top"><div><h3 class="card-title">${app.title}</h3><p class="card-description">${app.description}</p></div><a class="card-link" href="${app.url}" target="_blank" rel="noreferrer noopener" aria-label="${app.title}を開く">OPEN ↗</a></div><div class="tags">${app.tags.map((tag) => `<span class="tag">#${tag}</span>`).join('')}</div></div>
    </article>`).join('');
}

searchInput.addEventListener('input', renderApps);
renderTags();
renderApps();
