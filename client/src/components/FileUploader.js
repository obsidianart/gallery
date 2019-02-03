import React, { PureComponent } from 'react';
import Dropzone from 'react-dropzone'
import {
  DropzoneStyled
} from '../styledComponents'

class FileUploader extends PureComponent {
  showUserError = (file) => {
    alert('Sorry, your file is either too big or the wrong format. Only jpg and png under 10MB are accepted')
  }

  render() {
    return (
      <Dropzone
        accept="image/jpeg, image/png"
        onDropAccepted={this.props.uploadDocuments}
        onDropRejected={this.showUserError}
        multiple={false}
        maxSize={10000000}
      >
        {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
          return (
            <DropzoneStyled
              isDragAccept={isDragAccept}
              isDragReject={isDragReject}
              {...getRootProps()}
              data-cy="dropzone"
            >
              <input {...getInputProps()} />
              {!isDragReject && (
                <p>
                  {isDragAccept ? 'Drop' : 'Drag'} jpg or png here or click... Maximum size is 10MB
                </p>
              )}
              {isDragReject && <p>One file at time, jpg or png</p>}
            </DropzoneStyled>
          )
        }}
      </Dropzone>
    );
  }
}

export default FileUploader;
