import React, { Component } from 'react'
import Document from './components/Document'
import FileUploader from './components/FileUploader'
import DocumentsApi from './api/documents'
import {
  UploadButton,
  Container,
  Header,
  Input,
  GalleryHeader,
  GalleryDocuments,
  H1,
  H2,
} from './styledComponents'
class App extends Component {
  state = {
    documents: [],
    documentsCount: '?',
    documentsTotalSize: '?',
    showUploadArea: false,
    filter: false
  }

  componentWillMount () {
    this.updateDocs()
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
    // eslint-disable-next-line
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
      <Container>
        <Header>
          <Input type="text" placeholder="Search documents..." onChange={this.updateFilter} data-cy="filter"></Input>
          <UploadButton onClick={this.toggleUploadArea} data-cy="upload">UPLOAD</UploadButton>
        </Header>
        <section>
          {this.state.showUploadArea && <FileUploader uploadDocuments={this.uploadDocuments} />}
          {this.state.error && <div>{this.state.error}</div>}
          <GalleryHeader>
            <H1 data-cy="documents-count">{this.state.documentsCount} {this.state.documentsCount===1?'document':'documents'}</H1>
            <H2 data-cy="documents-size">Total Size: {this.state.documentsTotalSize}kb</H2>
          </GalleryHeader>

          <GalleryDocuments>
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
          </GalleryDocuments>

        </section>
      </Container>
    );
  }
}

export default App;
