import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import backgroundImage from '../../assets/sign-in-background.png';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: stretch;
`;

const animatedLeftToRight = keyframes`
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1
  }
`;

export const AnimatedContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;

  animation: ${animatedLeftToRight} 1s;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;

  form {
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 450px;
    margin: 80px 10px 10px 0;
    text-align: center;

    h1 {
      margin-bottom: 20px;
    }

    a {
      color: #f4ede8;
      text-decoration: none;
      margin-top: 16px;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
  > a {
    display: flex;
    align-items: center;
    margin-top: 80px;
    color: #ff9000;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }

    svg {
      margin-right: 16px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${backgroundImage}) no-repeat center;
  background-size: cover;
`;
