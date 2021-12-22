let logEnabled = false;

const enableLogging = (logState) => {
  logEnabled = logState;
}

const logMessage = (log) => {
  if(logEnabled) {
    console.log(log);
  }
}

module.exports = {
  enableLogging,
  log: logMessage
}