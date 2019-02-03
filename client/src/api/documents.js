const get = async ({ filterByName}) => {
  try {
    let url = `${process.env.REACT_APP_API}/list`

    if (filterByName) {
      url += `?filterByName=${filterByName}`
    }

    const response = await fetch(url)
    if (response.status > 200) throw new Error('Something is wrong with the server, please try again')
    const list = await response.json()

    return ({
      documents: list.documents,
      documentsCount: list.documentsCount,
      documentsTotalSize: list.documentsTotalSize,
    })
  } catch (e) {
    return ({
      error: e && e.message
    })
  }
}

const deleteDocument = async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/delete/${id}`, {method: 'delete'})
    if (response.status > 200) throw new Error('Something is wrong with the server, please try again')
    return response
  } catch (e) {
    return ({
      error: e && e.message
    })
  }
}

const uploadDocuments = async (files) => {
  try {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append(file.name, file);
    })

    const response = await fetch(`${process.env.REACT_APP_API}/upload`, {
      method: 'POST',
      body: formData
    })

    if (response.status > 200) throw new Error('Something went wrong while uploading your file, if the problem persist double check your file.')

    return {}
  } catch (e) {
    console.log(e)
    return ({
      error: e && e.message
    })
  }
    // const req = await fetch('./foo.json');
    // const total = Number(req.headers.get('content-length'));
    // let loaded = 0;
    // for await (const { length } of req.body.getReader()) {
    //   loaded = += length;
    //   const progress = ((loaded / total) * 100).toFixed(2); // toFixed(2) means two digits after floating point
    //   console.log(`${progress}%`); // or yourDiv.textContent = `${progress}%`;
    // }
}

export default {
  get,
  upload: uploadDocuments,
  delete: deleteDocument
}