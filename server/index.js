const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const port = 3001
const docs = require('./docs')
const REQUESTS_DELAY = 500

const requestDelay = (req, res, next) => {
  setTimeout(() => next(), REQUESTS_DELAY)
}

// To simulate a slow api
app.use(requestDelay)

const MEGABYTES_10 = 10 * 1024 * 1024
app.use(fileUpload({
  limits: { fileSize: MEGABYTES_10 },
  abortOnLimit: true

  // Activate the following if the machine has little ram
  // useTempFiles: true,
  // tempFileDir: '/tmp/'
}))

app.get('/api/list', async (req, res) => {
  const list = await docs.getList({
    filterByName: req.query.filterByName
  })
  res.send(list)
})

app.delete('/api/delete/:id', async (req, res) => {
  const result = await docs.delete(req.params.id)
  res.send(result) //Idempotent
})

app.post('/api/upload', async (req, res) => {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send({error: 'No files were uploaded.'});
  }

  const result = await docs.add(req.files)

  res.send(result);
});

app.listen(port, () => console.log(`Mock server running on ${port}!`))