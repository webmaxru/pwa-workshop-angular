# A simple app for the PWA Workshop

## Prerequisites
1. Latest stable versions of `node`, `npm` installed.
2. Having `yarn` installed is strongly recommended.
3. Any simple web server od browser extension. Recommended:
[Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb/)


## Install
1. Clone the repo
2. 
```bash
yarn
```
or
```bash
npm install
```

## Install/update Angular CLI
```bash
npm uninstall -g angular-cli
npm uninstall -g @angular/cli
npm cache clean
npm install -g @angular/cli@latest
```

Check the version:
```bash
npm list @angular/cli version -g
```
The output should be `1.0.0-rc.0`

## Checking the app
1. In the terminal
```bash
ng serve
```
2. Open [http://localhost:4200/](http://localhost:4200/). You should see the page with `PWA Workshop` header. There will be some warnings about `<template> element` in the console. Ignore them.
3. "Ctrl-C" to stop the app.

## Creating a production build and serving it via external web server
```bash
ng build --prod
```
The `dist` folder should be created. Start `Web Server for Chrome` extension and point to this folder using "Choose folder" button. Open the link you see in "Web Server URL(s)" section (make sure the "Automatically show index.html" option is on). You should see the page with `PWA Workshop` header.

## We are ready to start the workshop! Follow the trainer instructions.