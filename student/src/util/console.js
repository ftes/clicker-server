export default {
  log: (msg, ...opt) => console.log(msg, ...opt),
  info: (msg, ...opt) => console.info(msg, ...opt),
  warning: (msg, ...opt) => console.warning(msg, ...opt),
  error: (msg, ...opt) => console.error(msg, ...opt),
}