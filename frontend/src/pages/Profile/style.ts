import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  height: 144px;
  background-color: #28262e;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;

  a {
    svg {
      width: 24px;
      height: 24px;
      color: #999591;

      &:hover {
        color: ${shade(0.2, '#999591')};
      }
    }
  }
`;

export const AvatarProfile = styled.div`
  position: relative;
  margin-bottom: 32px;
  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }
  label {
    display: flex;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 48px;
    height: 48px;
    background-color: #ff9900;
    border: none;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
    cursor: pointer;

    svg {
      color: #312e38;
      width: 22px;
      height: 22px;
    }

    &:hover {
      background-color: ${shade(0.2, '#ff9900')};
    }

    input {
      display: none;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;

  align-items: center;
  justify-content: center;
  margin-top: -90px;

  form {
    display: flex;
    flex-direction: column;

    width: 100%;
    max-width: 450px;
    margin: 0px 10px 10px 0;
    text-align: left;

    h1 {
      margin-bottom: 20px;
      font-size: 20px;
      color: #f4ede8;
    }
  }
  > a {
    display: flex;
    align-items: center;
    margin-top: 80px;
    color: #f4ede8;
    transition: color 0.2s;
    text-decoration: none;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }

    svg {
      margin-right: 16px;
    }
  }
`;
