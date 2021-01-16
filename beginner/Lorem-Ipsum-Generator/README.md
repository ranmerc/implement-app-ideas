# Lorem Ipsum Generator

A simple lorem generator based on project idea from [app-ideas repo](https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Lorem-Ipsum-Generator.md). Depolyed on Github Pages [here](https://deadmercury.github.io/implement-app-ideas/beginner/Lorem-Ipsum-Generator/build/index.html).

## Requirements

Node.js with npm with the following npm packages installed locally or globally-

### [Parcel](https://parceljs.org/) (devDependency)

Used to enable usage of node modules (lorem-ipsum in this case) in browser. Browserify not used because it takes some config for HMR. And Webpack [no longer](https://github.com/webpack/changelog-v5#automatic-nodejs-polyfills-removed) polyfills node modules.

### [lorem-ipsum](https://www.npmjs.com/package/lorem-ipsum) (prodDependency)

Used to generate lorem ipsum text.

## Install

    $ git clone https://github.com/deadmercury/implement-app-ideas
    $ cd implement-app-ideas/beginner/Lorem-Ipsum-Generator
    $ npm install

I had parcel installed globally so it is not included in package.json file so if you do not have parcel installed you may also want to do -

    $ npm install parcel-bundler --save-dev

## NPM Scripts

    $ npm run dev

Targets src/index.html outputs to dist/ and starts a dev server on port 1234.

    $ npm run build

Builds the production version of the app and outputs to build/. Cache folder is deleted because of this [issue](https://github.com/parcel-bundler/parcel/issues/2692) and public url is used because of this [issue](https://github.com/parcel-bundler/parcel/issues/323). Tried [experimental tree shaking](https://parceljs.org/cli.html#enable-experimental-scope-hoisting/tree-shaking-support) available in parcel.

## References

- Design on [Figma](https://www.figma.com/file/ajSZIO7J5BYfKEQerZnCLv/Lorem-Ipsum-Generator).
- How to remove the default arrow icon from a dropdown list (select element)? on
  [Stack Overflow](https://stackoverflow.com/a/20464860).
- Outline radius? on [Stack Overflow](https://stackoverflow.com/a/6810937).
