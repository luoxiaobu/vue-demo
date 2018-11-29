var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var transitionEndEvent
if (inBrowser && !isIE9) {
  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
}

const t = 'WebKitCSSMatrix';
const support3D = t in window && 'm11' in new window[t]();

export function getTranslate (x = '0px', y = '0px', z = '0px') {
  return support3D ? `translate3d(${x}, ${y}, ${z})` : `translate(${x}, ${y})`;
}
export { transitionEndEvent }
