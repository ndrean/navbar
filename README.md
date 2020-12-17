# A React app skeleton using Mobx, Universal Router, Material-UI, React-Hook-Forms

## Deploy

### Netlify

Just go to <https://netlify.com> ....

### Surge:

Install the **surge cli** (<https://surge.sh/>), run `yarn build`, then `surge` in the "./build" folder: name it and view the app at: <http://rmm.surge.sh/>

### Github pages

Install `yarn add gh-pages --dev`, then add to "package.json":

```js
"homepage": "https://ndrean.github.io/navbar",
...
"scripts": {
  "predeploy": "yarn build",
  "deploy": "gh-pages -d build"
}
```

and run `yarn deploy`.

## TODOs

0. ~~All Material-UI imports with rewired/custom-cra~~
1. ~~Modal for sign-in~~
2. ~~dynamic badges in navbar on #contacts & #pages-views~~
3. ~~Mobile format of navbar & drawer~~
4. ~~navigation with drawer~~
5. Images: use Cloudinary API to save images without back-end
6. ~~Dynamic form: new + delete dynamic form user~~
7. ~~Implement fake POST and fake return token~~
8. ~~Suspense/lazy for code splitting~~
9. ~~Facebook login, in modal & login-form~~
10. ~~create Alert with the return token: FB-token & user created with fake-token~~
11. Compare with React Router for passing props vs Universal Router - Mobx

## CRA & Material-UI config (to use imports)

1- CRA with updated ServiceWorker: `npx create-react-app my-app --template cra-template-pwa`

2- Configure **babel** with `babel-plugin-import`, create a `.babelrc.js` file in the root directory of your project. Since we use CRA, we need `react-app-rewired` and `customize-cra` to be able to use `.babelrc.js`.

## Notes

### Difficulties code bugs to remove from Mobx

1- "Cannot update a component from inside the function body of a different component."

2- "Cannot update a component (`_c`) while rendering a different component (`_c`)"

Some recipies:

-> try put in `useEffect` for one,

-> perform action in navbar method calling the component rather than in the component,

-> use `action` on every event method.

But no solution found for Modal: `(isSubmitSuccessful) store.setModalClose()` <=> pb 2.

## React-hook-forms & Material-UI

- need to register the form fields `TexField` component with `inputRef={register()}`

- need to control the form field `Checkbox` component with:

- add inputs "on the fly". Take an array of data and map the indexed form. Note that the name should be something like: `name={`data[${i}].email`}`where `i` is the index of the mapping.

For the checkbox, needed below:

```js
control={
   <Controller as={Checkbox} control={control}  defaultValue={false} name="remember"/>
```

### Insert image in CardMedia - Material-UI from a folder

To insert several cards, map an array `cards` as shown in the example. Then needed to:

1. `import...` (Webpack),
2. use `component="img"`
3. use `image` tag <=> `background-image = url("...")`

> Code example

```js
import imgReact from "../img/React.png";
import imgMobx from "../img/Mobx.jpeg";
...
const cards = [
  {
    name: "React",
    image: imgReact,
    url: "https://fr.reactjs.org/",
  },
  {
    name: "Mobx",
    image: imgMobx,
    url: "https://mobx.js.org/README.html",
  },
  [...]
}
{cards.map(({ name, image, url }) => (...
<CardMedia component="img" image={image} title={`tech: ${name}`} loading="lazy" />
```

### To implement Cloudinary REST API to save pictures without back-end

72x72

- Input:

```js
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
<input type="file" accept="image/*" onClick={()=> setImageFile(e.target.files[0])}/>`
```

- send to the cloud: direct call Cloudinary REST API

```js
const formData = new FormData();
formData.append("file", fileCL);
formData.append("upload_preset", "ml_default");
fetch(`https://api.cloudinary.com/v1_1/${props.cloudname}/upload/`,
  {
    method: "POST",
    body: formData,
  }
)
  // CL response will be a SECURE_LINK and a unique ID
  .then((res) => res.json())
  .then((resCL) => {
    console.log(resCL.public_id);
    console.log(resCL.secure_url);
```

2- save into the Cloud or host file sytem

3- preview with `URL.createObjectURL()` or with `readAsDataURL`

```js
<input type="file" accept="image/*" id="inputFile"/>
<img id="previewElt"/>
const previewImg = document.getElementById("previewElt")
const fileElt = document.getElementById("inputFile")
```

4- save an image into a file with a "fake" `<a>` where we simulate the `click()` and using `new Blob`:

<https://robkendal.co.uk/blog/2020-04-17-saving-text-to-client-side-file-using-vanilla-js>

```js
const contentType = "image/*"; // or `text/plain" .or "text/html" or...
const a = document.createElement("a");
const blob = new Blob([content], { type: contentType });
a.href = URL.createObjectURL(blob);
a.download = "filename"; // the name given to the file: to be changed
a.click(); // simulate the click
URL.revokeObjectURL(a.href);
```

OR with `new FileReader()`

```js
fileElt.addEventListener("change", () => {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  previewImg.scr = url;
```

4- Resize an image: `canvas` and `readAsDataURL` and `canvasToBlob`

<https://htmldom.dev/resize-an-image/>

4- display

## Code notes

### To view on mobile phone the dev stage

`http-server ./build -a 0.0.0.0 -p 8090` and open **192.168.0.41:8090**

### Use formdata with RHF

```js
const formRef = React.useRef(null)

const data = new FormData(formRef.current)
fetch("url", {
  method: "POST",
  mode: "cors",
  body: data,
  }
})
<form ... ref={formRef}>
```

> !!!! NO CONTENT-TYPE ..... !!!!

### Dynamic "on-the-fly" form creation with RHF

If we want to produce a payload like:

```js
users: [{ email: "", password: ""},...,{ email: "", password: ""}]
```

then we will use `const [users, setUSers]=React.useState("")` and we use the naming:

```js
{users.map((_,i)=> {
  <TextField key={i}
  ...
  name={users[${i}].email}
  />
  ...
})}
```

### Note on Promise.all and useEffect with async

We will fetch several pages, so make several calls. Then we will run several `json()` calls. Use `Promise.all`.

```js
useEffect(() => {
  async function fetchData(){
    const urlApi2 = "https://reqres.in/api/users";
    const requests = [1, 2].map((page) => fetch(`${urlApi2}?page=${page}`));
    const response = await Promise.all(requests);
    const users = await Promise.all(response.map((r) => r.json()));
    return users.flatMap((u) => u.data);
  }
  fetchData().then(....)
}, []);
```

<https://javascript.info/promise-api>

### Note on arrays of objects

> replace an object in the array on attribute change

```js
const A = [{"a":1, "b":true},{"a":2,"b":false}]
const [values, setValues] = useState(A)
// we want to replace with newValue = {"a":2,"b":true}
setValues(prev => {
  return prev.map(obj=> {
    if (obj.a===newValue.a) return {...obj, newValue.b};
  return obj
  })
})
```

> Append to an array of objects if not present

```js
const store = [
  { a: 1, b: true },
  { a: 2, b: false },
];
const [values, setValues] = useState(store);
const result = [
  { a: 2, b: true },
  { a: 3, b: false },
];
const keysOfAs = Array.from(store, ({ a }) => a); // array of keys values
setValues((prev) => {
  for (const obj of result) {
    if (!keysOfAs.includes(obj.a)) [...prev, obj];
  }
});
```

### a Loader/Spinner

```css
.loader {
  display: inline-block;
  width: 40px;
  height: 40px;
}

.loader:after {
  content: " ";
  display: block;
  width: 30px;
  height: 30px;
  margin: 1px;
  border-radius: 50%;
  border: 5px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: loader 1.2s linear infinite;
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

### Make a phone call

`<a href="tel:60305520">Call me!</a>`

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

```

```
