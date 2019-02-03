import React, { PureComponent } from 'react';
import {
  DocumentStyled,
  DeleteButton
} from '../styledComponents'


class Document extends PureComponent {
  render() {
    const { name, size, id, deleting, deleteDocument} = this.props

    return (
      <DocumentStyled deleting={deleting} data-cy="document">
        <div>
          <h3>{name}</h3>
          <p>{size}kb</p>
        </div>
        <DeleteButton onClick={() => deleteDocument(id)}>delete</DeleteButton>
      </DocumentStyled>
    );
  }
}

export default Document;
