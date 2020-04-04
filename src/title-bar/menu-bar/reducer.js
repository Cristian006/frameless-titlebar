export const initialState = {
  selectedPath: [-1],
  altKey: false
};

export default (state, action) => {
  switch (action.type) {
    case 'alt': {
      return {
        ...state,
        altKey: action.altKey
      };
    }
    case 'reset': {
      return {
        ...state,
        selectedPath: [-1]
      };
    }
    case 'set': {
      return {
        ...state,
        selectedPath: [...state.selectedPath.slice(0, action.depth), action.selected]
      };
    }
    case 'del': {
      return {
        ...state,
        selectedPath: state.selectedPath.slice(0, action.depth)
      }
    }
    case 'button-set':
    case 'hover-sub': {
      // when hovering over a sub menu add -1 for the sub menu
      return {
        ...state,
        selectedPath: [...state.selectedPath.slice(0, action.depth), action.selected, -1]
      };
    }
    default:
      return state;
  }
};
