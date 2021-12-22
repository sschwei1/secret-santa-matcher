const fw = require('./fileWorker');
const lw = require('./loggingWorker');

const getParticipants = () =>{
  return fw.readParticipants().map(e => {
    return {
      name: e,
      giftTo: undefined
    };
  });
}

const loopAllowed = (participantsLeft, loopCount) => {
  return participantsLeft > 1 && loopCount > 1;
}

const shuffleList = (participants, writeToFile = true, logging = false) => {
  lw.enableLogging(logging);

  const result = [];
  let initName;
  let lastChosen;
  let loopCount = 0;

  do {
    let rand = Math.floor(Math.random() * (participants.length + loopAllowed(participants.length, loopCount)));

    if(rand === participants.length) {
      lastChosen.giftTo = initName;
      result.push(lastChosen);

      lw.log(`lastChosen: ${lastChosen.name}\nchosen: ${initName}\n\n`);
      lw.log('loop');

      rand = Math.floor(Math.random() * (participants.length));
      initName = undefined;
      lastChosen = undefined;
      loopCount = 0;
    }

    const chosen = participants[rand];

    if(!lastChosen) {
      initName = chosen.name;
    } else {
      lastChosen.giftTo = chosen.name;
      result.push(lastChosen);
      lw.log(`lastChosen: ${lastChosen.name}\nchosen: ${chosen.name}\n\n`);
    }

    participants.splice(rand,1);
    lastChosen = chosen;
    loopCount++;
  } while (participants.length > 1);

  lastChosen.giftTo = participants[0].name;
  participants[0].giftTo = initName;
  result.push(lastChosen);
  result.push(participants[0]);

  lw.log(result.map(e => e.name + ' => ' + e.giftTo).join('\n'));

  if(writeToFile) {
    fw.writeMatchesToFile(result);
  }

  return result;
}

module.exports = {
  getParticipants,
  shuffleList
}