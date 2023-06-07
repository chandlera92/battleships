### Live

https://chandlera92.github.io/battleships/

### Overview
The application utilizes two contexts that internally call custom hooks. The purpose of having separate contexts for the CoordinateForm and GameBoard is to ensure a clear separation of concerns. This approach allows the GameBoard to focus on its functionality without dictating how the consumer interacts with it.

The code includes utility functions to handle generating the grid and Y axis. It's worth noting that the function responsible for generating the game board and randomly placing ships is relatively simple. Further details can be found in the code comments.

To improve readability, the visible components have been divided into multiple files. While the ideal application structure for this project may be open to interpretation, the current arrangement avoids any obvious issues or drawbacks.

For testing, the components were tested using React Testing Library and Jest. Additionally, CircleCI was set up to automatically run tests for each pull request (PR). The code was organized in a logical manner, allowing for easy navigation through the sequence of PRs. Each PR includes a brief description for added context.

If you have any questions or would like further explanations regarding the decisions made or alternative approaches, please don't hesitate to reach out.

Thank you!

___________

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
