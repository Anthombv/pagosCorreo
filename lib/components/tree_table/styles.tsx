import styled from "styled-components";
import theme from '../../styles/theme'

export type TableContainerProps = {
  headerBackground?: string;
  contentBackground?: string;
  headerColor?: string;
  contentColor?: string;
};

export const TableContainer = styled.div<TableContainerProps>`
  .dx-treelist-headers {
    ${({ headerBackground }: TableContainerProps) => {
      if (headerBackground) return `background-color: ${headerBackground};`;
    }}
    ${({ headerColor }: TableContainerProps) => {
      if (headerColor) return `color: ${headerColor};`;
    }}
  }
  .dx-header-filter {
    ${({ headerColor }: TableContainerProps) => {
      if (headerColor) return `color: ${headerColor};`;
    }}
  }
  .dx-treelist-rowsview {
    ${({ contentBackground }: TableContainerProps) => {
      if (contentBackground) return `background-color: ${contentBackground};`;
    }}
    ${({ contentColor }: TableContainerProps) => {
      if (contentColor) return `color: ${contentColor};`;
    }}
  }
  .dx-info {
    color: black;
    opacity: 1;
  }
  .dx-treelist-headers {
    border-color: ${theme.colors.softRed};
  }
  .dx-treelist-headers td {
    border-color: ${theme.colors.softRed};
  }
  .dx-treelist-rowsview {
    border-color: ${theme.colors.softRed};
  }
  .dx-treelist-rowsview td {
    border-color: ${theme.colors.softRed};
  }
`;
