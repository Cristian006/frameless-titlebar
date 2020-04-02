export const initialState = [-1];
export default (state, action) => {
  switch (action.type) {
    case 'reset': {
      return [-1];
    }
    case 'set': {
      return [...state.slice(0, action.depth), action.selected];
    }
    case 'del': {
      return state.slice(0, action.depth);
    }
    case 'button-set':
    case 'hover-sub': {
      // when hovering over a sub menu add -1 for the sub menu
      return [...state.slice(0, action.depth), action.selected, -1];
    }
    default:
      return state;
  }
};
