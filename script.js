document.addEventListener('DOMContentLoaded', () => {
  const groups = Array.from(document.querySelectorAll('.nav-group'));
  const toggleButtons = Array.from(document.querySelectorAll('.nav-toggle'));
  const currentPath = window.location.pathname;

  const normalize = (value) => {
    let path = value || '/';
    if (!path.startsWith('/')) {
      path = `/${path}`;
    }
    if (path.endsWith('/index.html')) {
      path = path.replace(/\/index\.html$/, '/');
    }
    if (path !== '/' && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    return path;
  };

  const resolveHref = (link) => {
    try {
      return new URL(link.getAttribute('href'), window.location.href).pathname;
    } catch {
      return '';
    }
  };

  groups.forEach((group) => {
    const toggle = group.querySelector('.nav-toggle');
    const links = Array.from(group.querySelectorAll('.submenu a'));
    const activeLink = links.find((link) => normalize(resolveHref(link)) === normalize(currentPath));

    if (activeLink) {
      group.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  document.querySelectorAll('.sidebar a').forEach((link) => {
    if (normalize(resolveHref(link)) === normalize(currentPath)) {
      link.classList.add('active');
      const group = link.closest('.nav-group');
      if (group) {
        group.classList.add('is-open');
        const toggle = group.querySelector('.nav-toggle');
        toggle.setAttribute('aria-expanded', 'true');
      }
    }
  });

  toggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';

      groups.forEach((group) => {
        const otherToggle = group.querySelector('.nav-toggle');
        group.classList.remove('is-open');
        otherToggle.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        const group = button.closest('.nav-group');
        group.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
});
