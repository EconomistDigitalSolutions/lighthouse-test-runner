/* eslint-disable no-restricted-syntax, no-await-in-loop, no-loop-func, no-console */
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const validateSingleAudit = (score, singleMinimumScore) =>
  score > singleMinimumScore;

const validateAverageResults = (auditResults, category, numberOfUrls) => {
  const avgScore = auditResults[category.id] / numberOfUrls;

  return {
    hasPassed: avgScore > category.avarageMinimumScore,
    avgScore,
    minimumScore: category.avarageMinimumScore,
  };
};

const flags = {
  chromeFlags: ['--headless'],
};

const validate = async ({ urlsToCheck, categories }) => {
  console.log('???????????------------', categories);

  flags.onlyCategories = Object.values(categories).map((cat) => cat.id);
  console.log('???????????');
  const auditResults = flags.onlyCategories.reduce((res, flag) => {
    res[flag] = 0;
    return res;
  }, {});
  const chrome = await chromeLauncher.launch(flags);
  flags.port = chrome.port;

  let passed = true;

  for (const url of urlsToCheck) {
    let results;
    try {
      results = await lighthouse(url, flags, null);
    } catch (e) {
      console.log('e', e);
    }
    console.log(
      `\n\n\n------------------------------ Results for: ${url} ------------------------------\n`
    );

    Object.values(categories).forEach(({ id, singleMinimumScore }) => {
      const { score } = results.lhr.categories[id];
      const hasPassed = validateSingleAudit(score, singleMinimumScore);
      if (hasPassed) {
        console.log(
          '\x1b[32m',
          `Passed: ${id} with ${score} minimum passing score ${singleMinimumScore}`,
          '\x1b[0m'
        );
      } else {
        console.error(
          '\x1b[31m',
          `Faild: ${id} with ${score} minimum passing score ${singleMinimumScore}`,
          '\x1b[0m'
        );
        passed = false;
      }
      auditResults[id] += score;
    });

    console.log(
      '\n-------------------------------------------------------------------------'
    );
  }
  Object.values(categories).forEach((category) => {
    const { hasPassed, avgScore, minimumScore } = validateAverageResults(
      auditResults,
      category,
      urlsToCheck.length
    );
    if (hasPassed) {
      console.log(
        '\x1b[32m',
        `PASSED: category: ${
          category.id
        } score: ${avgScore}, minimum passing score: ${minimumScore}\n`,
        '\x1b[0m'
      );
    } else {
      console.log(
        '\x1b[31m',
        `FAILED: category: ${
          category.id
        } score: ${avgScore}, minimum passing score: ${minimumScore}\n`,
        '\x1b[0m'
      );
      passed = false;
    }
  });
  await chrome.kill();
  return passed;
};

export default validate;
