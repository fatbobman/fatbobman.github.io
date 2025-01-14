export function setTheme() {
  if (
    localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

// 监听暗黑模式的变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  setTheme();
});

// 保证其他的页面也能够监听到 localStorage 的变化
window.addEventListener('storage', function (event) {
  if (event.key === 'color-theme') {
    setTheme();
  }
});

setTheme();
