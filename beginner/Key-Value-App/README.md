# Key Value

Simple project that displays the Key and KeyCode of the pressed key, based on project idea from [app-ideas repo](https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Key-Value-App.md). Depolyed on Github Pages [here](https://deadmercury.github.io/implement-app-ideas/beginner/Key-Value-App/build/index.html).

## Requirements

Node.js with npm with the following npm packages installed locally or globally-

### [Parcel](https://parceljs.org/) (devDependency)

Used to enable usage of node modules (tone in this case) in browser. Browserify not used because it takes some config for HMR. And Webpack [no longer](https://github.com/webpack/changelog-v5#automatic-nodejs-polyfills-removed) polyfills node modules.

### [Tone.js](https://www.npmjs.com/package/tone) (prodDependency)

Used to make sound on keypress.

## Install

    $ git clone https://github.com/deadmercury/implement-app-ideas
    $ cd implement-app-ideas/beginner/Key-Value-App
    $ npm install

I had parcel installed globally so it is not included in package.json file so if you do not have parcel installed you may also want to do -

    $ npm install parcel-bundler --save-dev

## NPM Scripts

    $ npm run dev

Targets src/index.html outputs to dist/ and starts a dev server on port 1234.

    $ npm run build

Builds the production version of the app and outputs to build/. Cache folder is deleted because of this [issue](https://github.com/parcel-bundler/parcel/issues/2692) and public url is used because of this [issue](https://github.com/parcel-bundler/parcel/issues/323).

## References

- Design on [Figma](https://www.figma.com/file/kvSMCP97Tz6kG55DBpNpAb/Key-App).

- How to code CSS media queries targeting ALL mobile devices and tablets? on [Stack Overflow](https://stackoverflow.com/a/42835826).

- KeyboardEvent on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).

- Tone.js [docs](https://tonejs.github.io/docs/14.7.58/index.html).
