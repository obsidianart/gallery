import React, { Component } from 'react';
import './App.css';
import Document from './components/Document'
import FileUploader from './components/FileUploader'
import DocumentsApi from './api/documents'

class App extends Component {
  state = {
    documents: [],
    documentsCount: '?',
    documentsTotalSize: '?',
    showUploadArea: false,
    filter: false
  }

  async componentWillMount () {
    await this.updateDocs()
  }

  toggleUploadArea = async () => {
    this.setState({
      showUploadArea: !this.state.showUploadArea
    })
  }

  updateDocs = async () => {
    const documents = await DocumentsApi.get({ filterByName:this.state.filter})
    this.setState({ ...documents })
  }

  deleteDocument = async (id) => {
    // I know I'm not actually removing the file
    //eslint-disable-next-line
    const confirmed = confirm('Are you sure you want to delete?')

    if (!confirmed) return

    this.setState({
      documents: this.state.documents.map(doc=>({
        ...doc,
        ...(doc.id === id && { deleting: true }),
      }))
    })

    const deletion = await DocumentsApi.delete(id)
    deletion.error && this.setState({ error: deletion.error })
    this.updateDocs()
  }
  
  uploadDocuments = async (files) => {
    const upload = await DocumentsApi.upload(files)
    upload.error && this.setState({ error: upload.error })
    this.updateDocs()
  }

  updateFilter = async (event) => {
    // Depending on the use we might want to debounce here
    this.setState({ filter: event.target.value }, ()=>{
      this.updateDocs()
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <input type="text" placeholder="Search documents" onChange={this.updateFilter}></input>
          <button onClick={this.toggleUploadArea}>UPLOAD</button>
        </header>
        <FileUploader uploadDocuments={this.uploadDocuments} />
        {this.state.error && <div>{this.state.error}</div>}
        <div>
          <h3>{this.state.documentsCount} documents</h3>
          <h4>Total Size: {this.state.documentsTotalSize}kb</h4>
        </div>

        {this.state.documents.map(({ id, name, size, deleting})=>(
          <Document
            key={id}
            id={id}
            name={name}
            size={size}
            deleting={deleting}
            deleteDocument={this.deleteDocument}
          />
        ))}
      </div>
    );
  }
}

export default App;
