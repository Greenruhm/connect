export const displayIf = (condition) => !condition && { display: 'none' };

export const toggle = (prop, fn) => fn(!prop);

export const noop = () => {};
