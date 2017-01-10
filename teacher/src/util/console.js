export default {
  log: (msg, ...opt) => console.log(msg, ...opt),
  info: (msg, ...opt) => console.info(msg, ...opt),
  warn: (msg, ...opt) => console.warn(msg, ...opt),
  error: (msg, ...opt) => console.error(msg, ...opt),
}