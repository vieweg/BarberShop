import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isError: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  padding: 16px 0;
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  color: #666360;

  & + div {
    margin-top: 6px;
  }

  svg {
    margin: 0 10px;
  }

  ${props =>
    props.isError &&
    css`
      border-color: #ff0000;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

  input {
    flex: 1;
    background: #232129;
    color: #f4ede8;
    border: none;

    &::placeholder {
      color: #666360;
    }
  }
`;

export const Error = styled(Tooltip)`
  margin: 0 16px;

  svg {
    margin: 0;
    color: #ff0000;
  }

  span {
    background-color: #ff0000;
    color: #fff;

    &::before {
      border-color: #ff0000 transparent;
    }
  }
`;
