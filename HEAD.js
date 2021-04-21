const request = require('request');
const {execSync} = require('child_process');

/**
 * @returns {Promise<string>}
 */
const getDeployedHead = () => {
  return new Promise((resolve) =>
    request('https://web.dev/HEAD', (e, r) => resolve(e ? '' : r.body)),
  );
};

(async () => {
  const deployedHEAD = await getDeployedHead();
  const currentHEAD = execSync('git rev-parse HEAD').toString().trim();

  console.log(`Current HEAD: ${currentHEAD}`);
  console.log(`Deployed HEAD: ${deployedHEAD}`);

  if (currentHEAD === currentHEAD) {
    console.log('The current and deployed HEADs are the same, stopping build.');
    const BUILD_ID = process.env.BUILD_ID;
    execSync(`gcloud builds cancel '${BUILD_ID}'`);
  } else {
    console.log(
      'The current and deployed HEADs are different, continuing build.',
    );
  }
})();
