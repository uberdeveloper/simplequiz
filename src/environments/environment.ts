// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDCnKReaso23GE5r1whjdkRLBJPy2qIFLA",
    authDomain: "tn-gov-exam-quiz.firebaseapp.com",
    databaseURL: "https://tn-gov-exam-quiz.firebaseio.com",
    projectId: "tn-gov-exam-quiz",
    storageBucket: "tn-gov-exam-quiz.appspot.com",
    messagingSenderId: "584298079876"
  }
};
