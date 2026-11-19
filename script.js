'use strict';
const data = window.PORTFOLIO;
const safeUrl = value => {
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; }
  catch { return null; }
};
function externalLink(label, href, className = '') {
  const url = safeUrl(href);
  if (!url) return null;
  const link = document.createElement('a');
  link.textContent = label;
  link.href = url;
  link.className = className;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  return link;
}
document.querySelectorAll('[data-name]').forEach(el => { el.textContent = data.name; });
document.querySelector('[data-contact]').textContent = data.contact;
document.title = `${data.name} — Fullstack Developer`;
document.querySelectorAll('[data-link]').forEach(el => {
  const href = safeUrl(data.links[el.dataset.link]);
  if (href) { el.href = href; el.hidden = false; el.target = '_blank'; el.rel = 'noopener noreferrer'; }
});
function element(tag, className, text) {
  const node = document.createElement(tag);
  node.className = className;
  if (text) node.textContent = text;
  return node;
}
const list = document.querySelector('#project-list');
data.projects.forEach((project, index) => {
  const card = element('article', 'project');
  const number = element('span', 'project-number', String(index + 1).padStart(2, '0'));
  number.setAttribute('aria-hidden', 'true');
  const info = element('div', 'project-info');
  const title = element('h3', '', project.name);
  title.id = `project-${index}`;
  card.setAttribute('aria-labelledby', title.id);
  info.append(element('p', 'project-category', project.category), title, element('p', 'project-description', project.description));
  const stack = element('ul', 'tags');
  stack.setAttribute('aria-label', 'Стек проекта');
  project.stack.forEach(tech => stack.append(element('li', '', tech)));
  info.append(stack);
  const links = element('div', 'project-links');
  const repo = externalLink('Репозиторий ↗', project.repo);
  const demo = externalLink('Демо ↗', project.demo);
  if (repo) links.append(repo);
  if (demo) links.append(demo);
  info.append(links);
  const feature = element('div', 'project-feature');
  feature.append(element('h4', '', 'Внутри проекта'), element('p', '', project.feature));
  if (project.snippet) {
    const pre = element('pre', 'code-preview');
    pre.setAttribute('aria-label', 'Фрагмент кода, форматирование адаптировано');
    pre.append(element('code', '', project.snippet));
    feature.append(pre);
  }
  const code = externalLink(project.file + ' ↗', project.code, 'code-link');
  if (code) feature.append(code);
  card.append(number, info, feature);
  list.append(card);
});

const themeToggle = document.querySelector('#theme-toggle');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
function updateThemeLabel() {
  const dark = document.documentElement.dataset.theme
    ? document.documentElement.dataset.theme === 'dark' : systemTheme.matches;
  themeToggle.textContent = dark ? 'Светлая тема' : 'Тёмная тема';
}
themeToggle.hidden = false;
updateThemeLabel();
systemTheme.addEventListener('change', updateThemeLabel);
themeToggle.addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme
    ? document.documentElement.dataset.theme === 'dark' : systemTheme.matches;
  document.documentElement.dataset.theme = dark ? 'light' : 'dark';
  updateThemeLabel();
});

// Reveal each block once. Keep the hero and already-visible content immediate.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealBlocks = document.querySelectorAll(
  '.experience, .about-heading, .about-copy p, #stack > h2, .stack-group, #projects > h2, .section-intro, .project-info, .project-feature, .contact'
);
let revealObserver;
function setupReveals() {
  revealObserver?.disconnect();
  revealBlocks.forEach(block => block.classList.remove('is-pending'));
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('is-pending');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });
  revealBlocks.forEach(block => {
    block.classList.add('reveal');
    if (block.getBoundingClientRect().top >= window.innerHeight) {
      block.classList.add('is-pending');
      revealObserver.observe(block);
    }
  });
}
setupReveals();
reducedMotion.addEventListener('change', setupReveals);

// Keep a stable accessible heading; animate only its visual representation.
const typedRole = document.querySelector('#typed-role');
const roles = ['Fullstack Developer', 'Backend Developer', 'Frontend Developer'];
let typingTimer;
let roleIndex = 0;
let characterIndex = roles[0].length;
let deleting = true;
function typeNextCharacter() {
  const role = roles[roleIndex];
  characterIndex += deleting ? -1 : 1;
  typedRole.textContent = role.slice(0, characterIndex);
  let delay = deleting ? 45 : 90;
  if (characterIndex === 0 && deleting) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 300;
  } else if (!deleting && characterIndex === role.length) {
    deleting = true;
    delay = 2400;
  }
  typingTimer = setTimeout(typeNextCharacter, delay);
}
function restartTyping() {
  clearTimeout(typingTimer);
  roleIndex = 0;
  characterIndex = roles[0].length;
  deleting = true;
  typedRole.textContent = roles[0];
  if (!reducedMotion.matches && !document.hidden) {
    typingTimer = setTimeout(typeNextCharacter, 2400);
  }
}
restartTyping();
reducedMotion.addEventListener('change', restartTyping);
document.addEventListener('visibilitychange', restartTyping);
