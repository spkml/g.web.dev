const {execSync} = require('child_process');

const isProd = process.env.ELEVENTY_ENV === 'prod';

/**
 * Write the HEAD SHA to the `dist` on prod builds.
 *
 * @returns {Promise<void>}
 */
const writeHEAD = async () => {
  if (isProd) {
    const HEAD = execSync('git rev-parse HEAD').toString().trim();
    require('fs').writeFileSync('./dist/HEAD', HEAD);
  }
};

module.exports = writeHEAD;
