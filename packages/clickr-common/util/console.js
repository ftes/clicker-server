export default {
  log: (...args) => logIfLevelSufficient('log', ...args),
  info: (...args) => logIfLevelSufficient('info', ...args),
  warn: (...args) => logIfLevelSufficient('warn', ...args),
  error: (...args) => logIfLevelSufficient('error', ...args),
}

const levels = ['info', 'log', 'warn', 'error']
let minLevel = 'log'
export function setLevel(level) {
  minLevel = level}

function logIfLevelSufficient(level, ...args) {
  if (levels.indexOf(level) >= levels.indexOf(minLevel)) {
    console[level](...args)
  }
}