let lockCount = 0;
let savedScrollY = 0;

function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

export function lockScroll() {
  lockCount++;
  if (lockCount > 1) return;

  savedScrollY = window.scrollY;
  const scrollbarWidth = getScrollbarWidth();

  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.top = `-${savedScrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount > 0) return;

  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  document.body.style.paddingRight = "";
  window.scrollTo(0, savedScrollY);
}
