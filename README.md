# Bobbin

This project is built with AngularJS using components and [UI Router](https://github.com/angular-ui/ui-router).


### Description:
A bobbin is a cylinder of wounded thread that is used in sewing and embroidery machines. Bobbin is a mobile app for crafters that want to plan their projects efficiently with a built in shopping checklist. Users can create project boards and add photos of different types of swatches to their project board. Some of phase two features are to add google maps and calendars.

### Prerequisites
- Node v6.11.0
- NPM >= v5.3.0
- Firebase

### Spin up
```bash
npm install
grunt
```
### Staging
[Firebase](https://firebase.google.com/) credentials are needed in order to stage this app. You can create an account at the provided link and create a javascript file and plug in your credentials with the code snippet below.
```
'use strict';

bobbin.constant('FBCreds', {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
});```
