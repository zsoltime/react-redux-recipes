# React-Redux Recipe Finder

App to find recipes and dishes, using an external API. You can also save these recipes for later.

## Tools Used

- [React.js library](https://facebook.github.io/react/)
- [React Router](https://github.com/ReactTraining/react-router)
- [Webpack module bundler](https://webpack.js.org/)
- [Babel.js compiler](https://babeljs.io/)
- [ESLint linter](http://eslint.org/) with [Airbnb's JS config](https://github.com/airbnb/javascript)
- [Sass](http://sass-lang.com/) preprocessor with [PostCSS' Autoprefixer](https://github.com/postcss/autoprefixer)
- [Karma](https://karma-runner.github.io) test runner
- [Mocha](https://mochajs.org/) test framework
- [Expect](https://github.com/mjackson/expect) assertion library

## Folder Structure

- `src/actions/` - Redux actions
- `src/api/` - If you need to make calls to a backend API
- `src/components/` - Presentational/stateless/dumb components
- `src/containers/` - Containers/stateful components
- `src/images/` - Your images
- `src/reducers/` - Redux reducers
- `src/styles/` - Your Sass files
- `src/tests/` - Unit tests
- `src/utils/` - Utility functions, error handlers, formatters, etc.
- `src/index.jsx` - This is where you init the app and call render

## Install and Build

You need to have `yarn` [installed](https://yarnpkg.com/lang/en/docs/install/) on your computer, or you can use `npm`.

#### Clone this repo

``` bash
git clone https://github.com/zsoltime/react-starter.git
cd react-starter
```

#### Install dependencies

``` bash
yarn
# OR
npm install
```

#### Start dev server with hot reload

It builds HTML, CSS, and JavaScript bundle, starts a dev server and inject new versions of the files that you edited at runtime. Open [http://localhost:3000](http://localhost:3000) to view it in browser.

``` bash
yarn start
# OR
npm start
```

#### Build production bundle

It builds to the `dist` folder. It creates the JavaScript bundle, uglifies JS, minifies CSS - ready to deploy.

``` bash
yarn build
# OR
npm run build
```

#### Run unit tests

Run unit tests with Karma and Mocha

``` bash
yarn test
# OR
npm run test
```
