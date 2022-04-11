//const config = {};

export class Logger {
  static success(message, ...args) {
    console.log(`${message} success `, ...args);
  }
  static log(message, ...args) {
    console.log(message, ...args);
  }
  static warn(message, ...args) {
    console.warn(`${message} warn `, ...args);
  }
  static error(message, ...args) {
    console.error(`${message} error `, ...args);
  }
}
