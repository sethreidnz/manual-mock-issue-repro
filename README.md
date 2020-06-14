# Jest manual mocking of named class export

This repository shows an example of trying to manually mock a class that is a named export of module. The issue it is trying to show is that it doesn't seem to work to try to spy on one of the mocked methods in the same way as described [here](https://jestjs.io/docs/en/es6-class-mocks#spying-on-methods-of-our-class).

## Reproducing the issue

To see the issue you will need to clone the repo and install the packages:

```
git clone https://github.com/sethreidnz/manual-mock-issue-repro.git
cd manual-mock-issue-repro
npm install
```

Then you can run the tests:

```
npm run test
```

Notice that the tests fail on the following. Even though that is importing the mock as described [here](https://jestjs.io/docs/en/es6-class-mocks#spying-on-methods-of-our-class).

```
expect(jest.fn()).toHaveBeenCalledTimes(expected)
```

Perhaps there is something wrong in how I am doing this but it appears to me that the class is not using the same instance of the function as I am importing from the `api/__mocks__/clients.ts` file but I'm not sure why.

### Further thoughts

I have actually used this exact same method to do the same thing but with a module in `node_modules` but placing a `__mocks__` folder with a module of the same name, exporting the function and doing it exactly the same. But in that case it was not a class that was being 'newed' up and that leads me to think that might be the reason. Perhaps there is a way for me to get around this?

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
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
