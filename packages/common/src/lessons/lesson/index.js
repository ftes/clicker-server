export const ADD = 'clicker/lessons/ADD';

export function create(action) {
  return {
    id: action.id,
    // hack, to make sure that new lesson is before simultaneous question
    date: action.date || new Date(Date.now() - 1000),
    title: action.title || null,
  };
}

export function add(title, date) {
  return { type: ADD, title, date };
}
