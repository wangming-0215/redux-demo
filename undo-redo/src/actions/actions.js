export const UNDO = 'UNDO';
export const REDO = 'REDO';

export function undo() {
  return {
    type: UNDO
  };
}

export function redo() {
  return {
    type: REDO
  };
}
