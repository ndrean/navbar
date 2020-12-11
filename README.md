## CRA

CRA with updated ServiceWorker: `npx create-react-app my-app --template cra-template-pwa`

## Difficult bugs to remove

"Cannot update a component from inside the function body of a different component."

"Cannot update a component (`_c`) while rendering a different component (`_c`)"

## React-hook-forms & Material-UI

- need to register the form fields `TexField` component with `inputRef={register()}`

- need to control the form field `Checkbox` component with:

```js
control={
   <Controller as={Checkbox} control={control}  defaultValue={false} name="remember"/>
```

## Bundle analysis

`yarn add source-map-explorer` and add `"analyze": "source-map-explorer 'build/static/js/*.js'"` in **package.json**.

## Available Scripts

`yarn start`
`yarn build`
`yarn analyze`
`static-server` from the "/build" folder.

With the conflict of Ruby's `serve`, used **static-server** to run the build file from the folder "./build". <https://www.npmjs.com/package/static-server>

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
