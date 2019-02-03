# Stefano Solinas - 3 February 2019

## Installation
- If required [install Node](https://nodejs.org/en/)
- Go to the root folder from terminal and run `cd client && npm install`
- Go to the root folder from terminal and run `cd server && npm install`


## Running
- Go to the root folder from terminal and run `cd client && npm start`
- Go to the root folder from terminal and run `cd server && npm start`


## deatiled script info
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



## Security
On the frontend perspective, the main risk is the user content generated from user A but displayed from user B. User generated content might contain executable script if added directly to the page.
With the current structure, a document is represented by:
- `id` => this is generated hence no risk
- `size` => this is generated hence no risk
- `name` => this is inserted by the user. Sanitization is probably done serverside. For security reason frontend should not trust the backend data in a high security application. The React template interpolation should take care correctly of any attempt to manipulate this

Note: there's no requirement or UX suggestion that the files can be retrieved from this interface (even if it is asked that the mock saves them). The ability of retrieving files would open for a lot more security concern and might require the backend to perform additional security on the images.

Backend security is out of scope for this test but:
- filename sanification
- file type check against headers
- evaluate remove jpg/png metadata and resave
- evaluate possible attack in the search, sanitaze input before passing to the data layer
- evaluate brutoforce or ddos attack, limit user request per minute etc


## Improvements
Depending on the actual use the following might be useful
- User feedback for slow operations: Show the user a loading message while fetching (search and list)
- User feedback for slow operations: Uploading percentage
- Explicit errors: currently the backend always return a generic error. It is likely that for security this is the case but it's worth seeing if some error can be descriptive
- Better design: I'm not sure about this one, the requirements ask for a specific design
- Auto-upload on drag: instead of clicking the button allow the entire window to be a drop area
- Check file headers instead of mime type: I remember a bug on a browser from 4 years ago using mime type, more testing is required (I think the problem was when uploading from a Samsung Android phone but I can't test it)
- Directly upload on mobile: for mobile screen evaluate the possibility to not having drag & drop
- Evaluate pagination: Is pagination needed? how many files can be there?

## Libraries
I'm going to discuss only frotend libraries
- The project is based on the basic react app
- react-dropzone: It allows a nicer interface for uploading files and allows drag and drop
- styled-components: it helps with the styling of the application

## API
All endpoint return json. All endpoint return an `{error: 'actual error'}` on expected error.
The global error handler is not updated, if the mock goes that bad probably we should fix the mock.

### GET /api/list?filterByName=[string]
- returns the list of all documents
- accept a query param called filterByName, all documents are returned when empty
- sizes are in KB
- returns a json object
- example
```
  GET /api/list?filterByName=Doc 1
  Accept: application/json
```
``` JSON
//HTTP 200
//response body

{
  "documents": [
    {
      "id": "1",
      "name": "Doc 1",
      "size": 600
    }
  ],
  "documentsCount": 1,
  "documentsTotalSize": 600
}
```

### DELETE /api/delete/:id
- the file is removed from the list
- the endpoint is idempotent (it always return 200 unless an error occurs)

```
  DELETE /api/delete/1
  Accept: application/json
```
``` JSON
//HTTP 200
//response body

{}
```

### POST /api/upload
- the endpoint leverage on [express-filer-uploader](https://www.npmjs.com/package/express-fileupload)
- the maximum file size is 10
- the endpoint accept multiple files, this might be incorrect against the requirements
```
  POST /api/upload
  Accept: application/json
  Content-Type: multipart/form-data; boundary=----foobar

  ------foobar
    Content-Disposition: form-data; name="9mb.jpg"; filename="9mb.jpg"
    Content-Type: image/jpeg
  ------foobar--

  iVBORw0KGgoAAAANSUhEUgAAAzoAAAI2CAYAAACYBP17AAAMSGlDQ1BJQ0MgUHJvZmlsZQAASImVVwdYU8kWnltSSWiBCEgJvYlSpEsJoUUQkCrYCEkgocSYEETsyqKCaxcRsKGrIoquBRA79rIodtfyUBaVlXWxYEPlTQro6vfe...
```
``` JSON
//HTTP 200
//response body

{}
```

### POST /api/reset
- reset the mock to it's original state, used only for testing
- 
```
  POST /api/upload
  Accept: application/json
```
``` JSON
//HTTP 200
//response body

{}
```

---
## Other notes
I did not implement a way to download the documents because there's no suggestion in the UX that this is a possible interaction.