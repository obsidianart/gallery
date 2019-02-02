import React, { PureComponent } from 'react';
import './Document.css';

class Document extends PureComponent {
  render() {
    const { name, size, id, deleting, deleteDocument} = this.props

    return (
      <div className={`Document ${deleting?'deleting':''}`}>
        <p>{name}</p>
        <p>{size}</p>
        <p>{id}</p>
        <button onClick={() => deleteDocument(id)}>delete</button>
      </div>
    );
  }
}

export default Document;
