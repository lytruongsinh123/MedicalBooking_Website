This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Explain Redux and React
persisStore in utils/redux.js
When App run, redux is injected on App automactic throught utils/index.js
App react is connected with redux, redux is "transparent" with react is that
mean App redux is Parallel Running in App react in order to Control var of App react 
throungt "State" also know as save "State" in PersisStore is defined in App redux
Each "Component" control "State" itself
The diffrenence of Redux and LocalStorage

* Essentially, both Redux and LocalStorage are used to store information. Redux was created to solve the problem of sharing state between components. Since Redux runs alongside React, for example, if we want to know which language is currently being used, a component can retrieve that data from Redux. In short, Redux helps components share state more easily. If we use props, they only work when components have a parent-child relationship and pass data down. But for components that are on the same level or even unrelated in the hierarchy, Redux can handle this issue.
* As for the difference between Redux and LocalStorage: although Redux can also save data to LocalStorage, when we change the value in Redux, the React components will automatically update accordingly.
* When using Local Storage, there’s no library that directly links Redux to Local Storage. Therefore, changes made to values in Local Storage won’t automatically trigger updates in React components.
* Function help React "communication" Redux
  - import { connect } from 'react-intl'
  - const mapStateToPros and mapDispatchToProps
  - Fuction connect cover two function mapStateToPros and mapDispatchToProps...