let lockCount = 0;
let savedScrollY = 0;

function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

/**
 * Lock page scroll without jumping the viewport.
 * Uses overflow:hidden only (no position:fixed) so the scroll position
 * stays put when opening/closing modals — including under React Strict Mode.
 */
export function lockScroll() {
  lockCount++;
  if (lockCount > 1) return;

  savedScrollY = window.scrollY || document.documentElement.scrollTop || 0;
  const scrollbarWidth = getScrollbarWidth();

  document.documentElement.style.overflow = "hidden";
  document.documentElement.style.overscrollBehavior = "none";
  document.body.style.overflow = "hidden";
  document.body.style.overscrollBehavior = "none";
  document.body.style.touchAction = "none";

  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
}

export function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount > 0) return;

  document.documentElement.style.overflow = "";
  document.documentElement.style.overscrollBehavior = "";
  document.body.style.overflow = "";
  document.body.style.overscrollBehavior = "";
  document.body.style.touchAction = "";
  document.body.style.paddingRight = "";

  // Restore only if something else moved the scroll while locked.
  const current = window.scrollY || document.documentElement.scrollTop || 0;
  if (Math.abs(current - savedScrollY) > 1) {
    window.scrollTo({ top: savedScrollY, left: 0, behavior: "instant" });
  }
}
