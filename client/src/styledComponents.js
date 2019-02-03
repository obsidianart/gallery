import styled, { css } from 'styled-components/macro'

const mobileBreakpoint = '600px'

// --------------------- GENERAL -----------------------

export const Container = styled.div`
  max-width: 980px; // 960px + padding
  padding-left: 10px;
  padding-right: 10px;
  margin: 0 auto;
  * {
    box-sizing: border-box;
  }
`

const Button = styled.button`
  text-align: center;
  background-color: #c3d4ff;
  border: 1px solid #333;
`

// --------------------- HEADER -----------------------
export const Header = styled.header`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-top: 30px;

  @media (max-width:${mobileBreakpoint}) {
    flex-direction: column-reverse;
  }
`

export const UploadButton = styled(Button)`
  padding: 8px 30px;
  font-size: 16px;
  margin-bottom: 10px;
`

export const Input = styled.input`
  width: 50%;
  border: 1px solid #333;
  background-color: #eee;
  font-size: 16px;
  padding: 8px;
  margin-bottom: 10px;

  @media (max-width:${mobileBreakpoint}) {
    width: 100%;
  }

  ::placeholder {
    color: #000;
  }
`

// --------------------- Dropzone -----------------------
export const DropzoneStyled = styled.div`
  padding: 50px 5px;
  text-align: center;
  border: 1px dashed #333;
  border-radius: 5;

  ${({ isDragAccept }) => isDragAccept && css`
    background-color: #90EE90;
  `}

  ${({ isDragReject }) => isDragReject && css`
    background-color: red;
  `}

`

// --------------------- DOCUMENTS AREA ---------------------
export const GalleryHeader = styled.header`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;

  @media (max-width:${mobileBreakpoint}) {
    flex-direction: column;
  }
`

export const GalleryDocuments = styled.header`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0 -20px;
  
  @media (max-width:${mobileBreakpoint}) {
    flex-direction: column;
  }
`

export const H1 = styled.h1`
  font-size: 36px;
  font-weight: normal;
  margin: 10px 0;
`

export const H2 = styled.h2`
  font-size: 20px;
  font-weight: normal;
  margin: 8px 0;
`

// --------------------- DOCUMENT ---------------------
export const DocumentStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  border: 1px solid #333;
  padding: 10px;
  width: calc(33.33% - 40px);
  margin: 20px;

  ${({ deleting }) => deleting && css`
    opacity: 0.3
  `}

  @media (max-width:${mobileBreakpoint}) {
    width: auto;
  }

  h3 {
    font-weight: normal;
    font-size: 24px;
    margin: 10px 0;
  }
`

export const DeleteButton = styled(Button)`
  padding: 4px 16px;
  font-size: 14px;
  margin-bottom: 16px;
`

