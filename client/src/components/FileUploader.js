import React, { PureComponent } from 'react';
import Dropzone from 'react-dropzone'

// import './Document.css';

const baseStyle = {
  width: 200,
  height: 200,
  borderWidth: 2,
  borderColor: '#666',
  borderStyle: 'dashed',
  borderRadius: 5
};
const activeStyle = {
  borderStyle: 'solid',
  borderColor: '#6c6',
  backgroundColor: '#eee'
};
const rejectStyle = {
  borderStyle: 'solid',
  borderColor: '#c66',
  backgroundColor: '#eee'
};


class FileUploader extends PureComponent {

  render() {
    return (
      <Dropzone
        accept="image/jpeg, image/png"
        onDropAccepted={this.props.uploadDocuments}
        multiple={false}
        maxSize={10000000}
      >
        {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
          let styles = { ...baseStyle }
          styles = isDragActive ? { ...styles, ...activeStyle } : styles
          styles = isDragReject ? { ...styles, ...rejectStyle } : styles

          return (
            <div
              {...getRootProps()}
              style={styles}
            >
              <input {...getInputProps()} />
              <div>
                {isDragAccept ? 'Drop' : 'Drag'} files here or click...
              </div>
              {isDragReject && <div style={{backgroundColor:'red'}}>One file at time, jpg or png</div>}
            </div>
          )
        }}
      </Dropzone>
    );
  }
}

export default FileUploader;
