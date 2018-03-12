export const PRESS = 'clicker/buttons/press';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PRESS:
      return {
        ...state,
        [action.number]: action.pressed,
      };
    default: return state;
  }
};

export default reducer;

export function getState(state) {
  return state.buttons;
}

export function press(number, pressed) {
  return { type: PRESS, number, pressed };
}
