import { createGlobalStyle } from "styled-components";

// estilos globales
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    min-width: 500px;
  }
  .actionButton{
    cursor: pointer;
  }
  .dx-treelist-headers .column-soli {
    color: rgb(93, 207, 201);
    font-weight: bold;
  }
  .dx-treelist-headers .column-conta {
    color: rgb(192, 93, 207);
    font-weight: bold;
  }
  .dx-treelist-headers .column-teso {
    color: rgb(209, 122, 36);
    font-weight: bold;
  }
  .dx-treelist-headers .column-finan {
    color: rgb(110, 199, 88);
    font-weight: bold;
  }
  .dx-treelist-headers .bold {
    font-weight: bold;
  }
`;

export default GlobalStyle;
