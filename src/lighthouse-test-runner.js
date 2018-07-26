import validate from './validate';

async function lighthouseTestRunner(options) {
  console.log('whyyyy?');
  const testPassed = await validate(options);
  console.log('whyyyy22222?');

  const fontColor = testPassed ? '\x1b[0m' : '\x1b[31m';
  console.log(
    fontColor,
    '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
  );
  console.log(
    fontColor,
    testPassed
      ? 'ALL GOOD ALL TESTS HAVE PASSED'
      : 'SOME TEST HAVE FAILED PLEASE SEE ABOVE LOG FOR DETAILS'
  );
  console.log(
    fontColor,
    '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
  );
  process.exit(testPassed ? 0 : 1);
}

export default lighthouseTestRunner;
