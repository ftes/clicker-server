import fetch from 'isomorphic-fetch'

import { connectWebsocket } from '../util/websocket'

export const RESET = 'clicker/core/RESET'
export const SET = 'clicker/settings/SET'
export const TOGGLE_SHOW = 'clicker/settings/TOGGLE_SHOW'
export const UNLOCK = 'clicker/settings/UNLOCK'
export const REQUEST_DEFAULT_SETTINGS =
  'clicker/settings/REQUEST_DEFAULT_SETTINGS'
export const RECEIVE_DEFAULT_SETTINGS =
  'clicker/settings/RECEIVE_DEFAULT_SETTINGS'

export const initialState = {
  default: {
    pin: '0000',
    server: 'http://localhost:4001',
    deviceId: 'random' + Math.floor(Math.random() * 100),
    nButtons: 4,
  },
  custom: {},
  show: false,
  unlocked: false,
  unlockFailed: false,
}

const int = (value) => parseInt(value || 0, 10)
const identity = (value) => value
const parsers = {
  nButtons: int,
}

function getParser(key) {
  return parsers[key] || identity
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case RESET:
    return {
      ...state,
      custom: {},
    }
  case SET:
    return {
      ...state,
      custom: {
        ...state.custom,
        [action.key]: getParser([action.key])(action.value),
      }
    }
  case TOGGLE_SHOW:
    return {
      ...state,
      show: !state.show,
      unlocked: false,
      unlockFailed: false,
    }
  case UNLOCK: {
    let pin = get(state, 'pin')
    return {
      ...state,
      unlocked: action.pin === pin,
      unlockFailed: !(action.pin === pin),
    }
  }
  case RECEIVE_DEFAULT_SETTINGS:
    return {
      ...state,
      default: {
        ...state.default,
        ...action.settings,
      }
    }
  default: return state
  }
}

export default reducer

export function getState(state) {
  return state.settings
}

export function get(state, key) {
  return state.custom[key] || state.default[key]
}

export function set(key, value) {
  return { type: SET, key, value }
}

export function toggleShow() {
  return { type: TOGGLE_SHOW }
}

export function unlock(pin) {
  return { type: UNLOCK, pin }
}

function requestDefaultSettings() {
  return { type: REQUEST_DEFAULT_SETTINGS }
}

function receiveDefaultSettings(settings) {
  return { type: RECEIVE_DEFAULT_SETTINGS, settings }
}

export function fetchDefaultSettings(state) {
  return dispatch => {
    dispatch(requestDefaultSettings())
    //eslint-disable-next-line no-undef
    return fetch(process.env.REACT_APP_SETTINGS, { mode: 'cors' })
      .then(response => response.json())
      .then(json => {
        dispatch(receiveDefaultSettings(json))
        connectWebsocket(dispatch, getState(state).custom.server || json.server)
      })
  }
}

export function reset() {
  return { type: RESET }
}