let timeoutId;
let hasShownModal = false;
const MODAL_INTERVAL = 7200 * 1000; // 4天
const IDLE_INTERVAL = 45000; // 45秒
const LAST_SHOWN_KEY = 'weeklyModalLastShownTime';

function canShowModal() {
  const lastShownTime = localStorage.getItem(LAST_SHOWN_KEY);
  if (!lastShownTime) return true;

  const now = Date.now();
  const timeDiff = now - parseInt(lastShownTime);
  return timeDiff >= MODAL_INTERVAL;
}

function updateLastShownTime() {
  localStorage.setItem(LAST_SHOWN_KEY, Date.now().toString());
}

function toggleModal() {
  const backdrop = document.getElementById('modal-backdrop');
  const modal = document.getElementById('default-modal');

  if (backdrop && modal) {
    if (backdrop.classList.contains('hidden')) {
      if (!canShowModal()) return;

      backdrop.classList.remove('hidden');
      backdrop.classList.add('flex');
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      updateLastShownTime();
    } else {
      backdrop.classList.add('hidden');
      backdrop.classList.remove('flex');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    // 更新状态并重新设置监听
    hasShownModal = !hasShownModal;
    if (!hasShownModal) {
      setupEventListeners();
    }
  }
}

function resetTimer() {
  if (!hasShownModal && canShowModal()) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      toggleModal();
      removeEventListeners();
    }, IDLE_INTERVAL);
  }
}

function setupEventListeners() {
  document.addEventListener('mousemove', resetTimer);
  document.addEventListener('keypress', resetTimer);
  resetTimer();
}

function removeEventListeners() {
  document.removeEventListener('mousemove', resetTimer);
  document.removeEventListener('keypress', resetTimer);
}

function handleBackdropClick(event) {
  if (event.target.id === 'modal-backdrop') {
    toggleModal();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const closeButtons = document.querySelectorAll('[data-modal-hide="default-modal"]');
  closeButtons.forEach((button) => {
    button.addEventListener('click', toggleModal);
  });

  // 添加遮罩层点击事件
  const modalBackdrop = document.getElementById('modal-backdrop');
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', handleBackdropClick);
  }

  setupEventListeners();
});
