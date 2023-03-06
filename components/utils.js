'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
function _export(target, all) {
  for (var name in all)
    Object.defineProperty(target, name, {
      enumerable: true,
      get: all[name],
    });
}
_export(exports, {
  EMAIL_PATTERN: () => EMAIL_PATTERN,
  isValidEmail: () => isValidEmail,
});
const EMAIL_PATTERN = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$';
const isValidEmail = (email = '') =>
  Boolean(String(email).toLowerCase().match(EMAIL_PATTERN));
