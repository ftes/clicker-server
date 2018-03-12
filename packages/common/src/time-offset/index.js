import { PREFIX } from '../websocket';
import { TIME } from '../websocket/message-types';

const initialState = 0;
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PREFIX + TIME: {
      const clientTime = new Date().getTime();
      const serverTime = action.payload;
      const offset = clientTime - serverTime;
      return offset;
    }
    default: return state;
  }
};

export default reducer;

export function getState(state) {
  return state.timeOffset;
}

export function toServer(time, state) {
  return new Date(time - getState(state)).getTime();
}

export function toClient(time, state) {
  return new Date(time + getState(state)).getTime();
}
