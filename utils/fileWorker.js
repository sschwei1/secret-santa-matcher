const fs = require('fs');

const participantFilePath = './participants';

const genOutPath = () => {
  const outPath = './output';
  const subPrefix = 'match';

  if(!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath);
  }

  const folderCnt = fs
    .readdirSync(outPath, {withFileTypes: true})
    .filter(entry => entry.isDirectory())
    .length;

  const fullOutPath = `${outPath}/${subPrefix}_${folderCnt}`;

  if(!fs.existsSync(fullOutPath)) {
    fs.mkdirSync(fullOutPath);
  }

  return fullOutPath;
};

const outputDirectory = genOutPath();


const readParticipants = () => {
  if(!fs.existsSync(participantFilePath))
    return [];

  return fs.readFileSync(participantFilePath, 'utf8').trim().split('\r\n');
};

const writeMatchToFile = (match) => {
  const ending = '.match.txt';
  const fileText = `
    ~~ Secret Santa ~~
    ${match.name} gifts to ${match.giftTo}
  `;

  fs.writeFileSync(`${outputDirectory}/${match.name}${ending}`, fileText);
}

const writeMatchesToFile = (matches) => {
  matches.forEach(e => writeMatchToFile(e));
}

module.exports = {
  readParticipants,
  writeMatchToFile,
  writeMatchesToFile
};