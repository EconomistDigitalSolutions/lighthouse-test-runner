# lighthouse-test-runner

`lighthouse-test-runner` is a npm module using [Google Lighthouse](https://developers.google.com/web/tools/lighthouse/) and runs lighthouse tests
on multiple urls and check against minimum acceptance rate for each test category.
It produces as well average score for all provided urls and check against minimum average score per category 

## Install

``` npm i --save-dev NAME_TO_BE_CONFIRMED ```
``` yarn add NAME_TO_BE_CONFIRMED --dev ```

## Use

you can use `lighthouse-test-runner` as command line tool by typing  `lighthouse-test-runner` It will look for `.lighthouse-test.json` in root directory of your project.

You can as well use programaticly 
```
import lighthouseTestRunner = from 'lighthouse-test-runner';
const options = { } // same structure as `.lighthouse-test.json`
await lighthouseTestRunner(options);
```

 ### config object `.lighthouse-test.json`
 
 available categories `accessibility`, `best-practices`, `seo`, `performance`, `pwa` 
 
 ```
 {
    "urlsToCheck": [
        "https://www.url.to/check1",
        "https://www.url.to/check2",
        ...
    ],
    "categories": {
        "seo": {
            "id": "seo",
            "singleMinimumScore": 0.7,
            "avarageMinimumScore": 0.75
        },
        "best-practices": {
            "id": "best-practices",
            "singleMinimumScore": 0.5,
            "avarageMinimumScore": 0.7
        },
        "accessibility": {
            "id": "accessibility",
            "singleMinimumScore": 0.7,
            "avarageMinimumScore": 0.75
        }
    }
}
 ```
 
 ## Todo
 - tests
 - update output look
 - general fool proofing

