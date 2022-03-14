# Github Status

Simple Github Status tracker based on project idea from [app-ideas repo](https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/GitHub-Status-App.md). Depolyed on Github Pages [here](https://ranmerc.github.io/implement-app-ideas/beginner/Github%20Status/build/index.html).

## Requirements

Node.js with npm with the following npm packages installed locally or globally-

### [Parcel](https://parceljs.org/) (devDependency)

Used to enable usage of node modules (request in this case) in browser. Browserify not used because it takes some config for HMR. And Webpack [no longer](https://github.com/webpack/changelog-v5#automatic-nodejs-polyfills-removed) polyfills node modules.

### [Request](https://www.npmjs.com/package/request) (prodDependency)

Used to get the current [github status](https://www.githubstatus.com/) in json format.

## Install

    $ git clone https://github.com/ranmerc/implement-app-ideas
    $ cd implement-app-ideas/beginner/Github\ Status
    $ npm install

I had parcel installed globally so it is not included in package.json file so if you do not have parcel installed you may also want to do -

    $ npm install parcel-bundler --save-dev

## NPM Scripts

    $ npm run dev

Targets src/index.html outputs to dist/ and starts a dev server on port 1234.

    $ npm run build

Builds the production version of the app and outputs to build/. Cache folder is deleted because of this [issue](https://github.com/parcel-bundler/parcel/issues/2692) and public url is used because of this [issue](https://github.com/parcel-bundler/parcel/issues/323).
