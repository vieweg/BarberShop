import styled from 'styled-components';
import { shade, grayscale } from 'polished';

export const Container = styled.button`
  margin-top: 20px;
  background: #ff9000;
  color: #312e38;
  border: 0;
  border-radius: 10px;
  padding: 16px;
  font-weight: 700;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }

  &:disabled {
    background: ${grayscale('#ff9000')};
  }
`;
