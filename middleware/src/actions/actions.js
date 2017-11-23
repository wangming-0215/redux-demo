export const DISPATCH_ACTION = 'DISPATCH_ACTION';

export function dispatchAction(text) {
  return {
    type: DISPATCH_ACTION,
    text
  };
}
