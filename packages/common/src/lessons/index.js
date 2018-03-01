import { create, ADD } from './lesson'
import { START as NEW_QUESTION } from '../questions/question'
import { getState as questions } from '../questions/question-list'

const initialState = []

export const reducer = (state = initialState, action) => {
  switch (action.type) {
  case NEW_QUESTION:
  case ADD:
    if (action.type === NEW_QUESTION) {
      if (!isNewDay(state)) return state
      action = {} // use empty action
    }
    action.id = getNextIdLocal(state)
    return [
      ...state,
      create(action)
    ]
  default:
    return state
  }
}

export default reducer

export function getState(state) {
  return state.lessons
}

function getNextIdLocal(state) {
  return state
    .map(l => l.id)
    .reduce((max, i) => Math.max(max, i), 0)
    + 1
}

// assumptions:
// 1. both arrays are sorted by date
// 2. there is a lesson before the first question
function groupQuestionsByLessonsInternal(lessons, questions) {
  const groups = []
  let qIndex = 0
  let lIndex = 0
  let currentQuestions = []
  while (lIndex < lessons.length) {
    let l = lessons[lIndex++]
    let nextL = lessons[lIndex]
    let q = questions[qIndex]
    while (qIndex < questions.length &&
      (nextL === undefined || q.date < nextL.date)) {
      currentQuestions.push(q)
      q = questions[++qIndex]
    }
    groups.push({
      lesson: l,
      questions: currentQuestions,
    })
    currentQuestions = []
  }
  return groups
}

export function groupQuestionsByLesson(state) {
  return groupQuestionsByLessonsInternal(getState(state), questions(state))
}

function getLastLesson(state) {
  return state.slice(-1)[0]
}

function isNewDay(state) {
  // compare dateStrings (omits hours, minutes, seconds)
  const lastLesson = getLastLesson(state)
  if (!lastLesson) return true
  const dateOfLastLesson = lastLesson.date.toDateString()
  const today = new Date().toDateString()
  return (today !== dateOfLastLesson)
}