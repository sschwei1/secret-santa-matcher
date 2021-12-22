const sw = require('./utils/shuffleWorker');

const participants = sw.getParticipants();

const result = sw.shuffleList(participants);