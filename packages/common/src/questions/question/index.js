import { PRESS } from '../../websocket/message-types';
import { PREFIX } from '../../websocket';
import { key } from '../../util/device';
import { isShown, getDevice } from '../../devices/device-list';

export const START = 'clicker/questions/START';

function create(id, title) {
  const answeredBy = [];
  const date = new Date();
  return {
    id, title, answeredBy, date,
  };
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case PREFIX + PRESS: {
      const data = action.payload;
      if (!data.pressed) return state;
      const deviceKey = key(data);
      const alreadyAnswered = state.answeredBy.find(d => d === deviceKey);
      if (alreadyAnswered) return state;
      return {
        ...state,
        answeredBy: [
          ...state.answeredBy,
          deviceKey,
        ],
      };
    }
    case START:
    // id and title set by parent reducer
      return create(action.id, action.title || `Question ${action.id}`, false);
    default: return state;
  }
}

export function start() {
  return { type: START };
}

export function hasAnswered(question, deviceKey) {
  return question.answeredBy.indexOf(deviceKey) !== -1;
}

export function onlyShown(answeredBy, state) {
  return answeredBy.filter(deviceKey => isShown(getDevice(state, deviceKey), state));
}
