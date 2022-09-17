const { glob } = require("glob");
const { promisify } = require("util");
const PG = promisify(glob);

async function loadFiles(dirName) {
  const Files = await PG(
    `${process.cwd().replace(/\\/g, "/")}/${dirName}/**/*.js`
  );
  Files.forEach((file) => delete require.cache[require.resolve(file)]);
  return Files;
}

module.exports = { loadFiles };
