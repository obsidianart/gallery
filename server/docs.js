// I'm not going to worry about the order of complexity of the functions in this file
// This is a mock, if I want more I use an actual database

const uniqid = require('uniqid')

const originalState = [
  {
    id: '1',
    name: 'Doc 1',
    size: 600
  }, {
    id: '2',
    name: 'Doc 2',
    size: 200
  }
]

let documents = [...originalState]

const getTotalSize = (docs) => docs.reduce((total, doc) => (total + doc.size), 0)

const getTotalCount = (docs) => docs.length


module.exports = {
  getList: async ({ limit, filterByName } = {}) => {
    let list = documents

    if (filterByName) {
      list = list.filter(doc => doc.name.toLowerCase().includes(filterByName.toLowerCase()))
    }

    //I need to evaluate the total before slicing it
    const totalCount = list.length

    if (limit) {
      list = list.slice(0, limit);
    }

    return {
      documents:list,
      documentsCount: getTotalCount(list),
      documentsTotalSize: getTotalSize(list),
    }
  },
  
  add: async (files) => {
    try {
      const fileNames = Object.keys(files)

      const saveFilesPromises = fileNames.map(fileName => new Promise((resolve, reject) => {
        const id = uniqid()
        const file = files[fileName]

        // This would be replace by checking the actual header on the file if this would be for real
        let extension = ''
        if (file.mimetype === 'image/jpeg') {
          extension='.jpg'
        } else if (file.mimetype === 'image/png') {
          extension = '.png'
        }

        file.mv(`${__dirname}/tmp/${id}${extension}`, (err) => {
          if (err) reject(err)
          documents.push({
            id,
            name: fileName,
            size: Math.floor(file.data.byteLength / 1000)
          })
          resolve()
        })
      }))
      
      await Promise.all(saveFilesPromises)
      return {}
    } catch (e) {
      console.log(e)
      return {error: 'Something went wrong uploading the file'}
    }
    
  },

  delete: async (id) => {
    documents = documents.filter(doc => doc.id !== id)
    return {}
  },

  reset: async () => {
    documents = [...originalState]
    return {}
  }
}