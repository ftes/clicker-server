import halves from './halves'
import random from './random'
import { getState as getParentState } from '../'
import { START as NEW_QUESTION, onlyShown } from '../../questions/question'
import { toServer } from '../../time-offset'

export const START = 'clicker/showdown/START'

export const functions = {
  halves,
  random,
}

export default function reducer(state = [], action) {
  switch(action.type) {
  case START: {
    let func = functions[action.settings.showdown]
    let lastQuestion = action.lastQuestion
    if (lastQuestion && lastQuestion.answeredBy.length > 0) {
      let answeredBy = action.lastQuestion.answeredBy
      answeredBy = onlyShown(answeredBy, action.getState())
      let selected = answeredBy[Math.floor(Math.random() * answeredBy.length)]
      return func(action.settings, action.devices, selected, answeredBy,
        action.devicesSettings, (t) => toServer(t, action.getState()))
    }
    return state
  }
  case NEW_QUESTION:
    // clear old winner when new question arrives
    return []
  default: return state
  }
}

export function start(devices, devicesSettings) {
  return { type: START, devices, devicesSettings }
}

export function getState(state) {
  return getParentState(state).showdown
}