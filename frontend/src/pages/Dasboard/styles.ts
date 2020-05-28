import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  width: 100%;
  padding: 32px 15px;
  background-color: #28262e;
`;

export const HeaderContent = styled.header`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }
  button {
    margin-left: auto;
    width: 50px;
    height: 50px;
    background: transparent;
    border: none;

    svg {
      width: 20px;
      height: 20px;
      color: #999591;
      transition: color 0.2s;
    }

    &:hover > svg {
      color: #fff;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  > img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    font-size: 16px;
    line-height: 26px;
    color: #f4ede8;

    a {
      text-decoration: none;
      color: #ff9900;
      font-weight: 500;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap-reverse;
`;

export const Schedule = styled.div`
  width: 100%;
  max-width: 640px;
  margin-right: auto;

  h1 {
    font-weight: 500;
    font-size: 36px;
    line-height: 47px;
    color: #f4ede8;
  }

  > p {
    position: relative;
    margin-top: 12px;
    display: flex;
    align-items: center;

    span {
      display: flex;
      align-items: center;
      margin-right: 20px;
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;
      color: #ff9900;
      text-transform: capitalize;
    }

    span + span::before {
      content: '';
      position: absolute;
      margin-left: -10px;
      width: 1px;
      height: 12px;
      background-color: #ff9900;
    }
  }
`;

export const NextAppointment = styled.div`
  width: 100%;
  margin-top: 64px;
  display: flex;
  flex-direction: column;

  p {
    font-size: 20px;
    line-height: 26px;
    color: #999591;
  }

  > div {
    display: flex;
    position: relative;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-top: 24px;
    background-color: #3e3b47;
    border-radius: 10px;
    transition: background-color 0.2s;

    &::before {
      content: '';
      position: absolute;
      top: 10%;
      left: 1;
      width: 2px;
      height: 80%;
      background-color: #ff9900;
      border-radius: 50%;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin: 16px 24px;
    }

    strong {
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
      color: #f4ede8;
    }

    span {
      display: flex;
      align-items: center;
      margin-left: auto;
      margin-right: 24px;
      font-size: 20px;
      line-height: 26px;
      color: #999591;

      svg {
        width: 24px;
        height: 24px;
        margin-right: 12px;
        color: #ff9900;
      }
    }

    &:hover {
      background-color: ${shade(0.1, '#3e3b47')};
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    display: flex;
    margin-bottom: 24px;
    padding-bottom: 16px;
    font-size: 20px;
    color: #999591;
    border-bottom: 1px solid #3e3b47;
  }
  > p {
    color: #f4ede8;
    font-size: 14px;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    display: flex;
    align-items: center;
    margin-right: 26px;
    font-size: 16px;
    line-height: 26px;
    color: #f4ede8;

    svg {
      width: 20px;
      height: 20px;
      margin-right: 12px;
      color: #ff9900;
    }
  }

  div {
    display: flex;
    flex: 1px;
    align-items: center;
    background-color: #3e3b47;
    border-radius: 10px;
    transition: background-color 0.2s;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      margin: 16px 24px;
    }

    strong {
      font-weight: 500;
      font-size: 20px;
      line-height: 26px;
      color: #f4ede8;
    }

    &:hover {
      background-color: ${shade(0.1, '#3e3b47')};
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
