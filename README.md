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
http -server
grunt
```
### Staging
[Firebase](https://firebase.google.com/) credentials are needed in order to stage this app. After creating a Firebase account, `cp` fb-creds.dist.js over to fb-creds.js and add your credentials.

```bash
cp app/values/fb-creds.dist.js app/values/fb-creds.js
```

You'll need a server to run Bobbin in your browser, if you don't have one installed, [http-server](https://www.npmjs.com/package/http-server) is a quick option.

```bash
npm install --save http-server
```
Then open a new terminal tab and run:

```bash
hs -o```
