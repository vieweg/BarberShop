import styled from 'styled-components/native';

const fontRegular = 'RobotoSlab-Regular';
const fontMedium = 'RobotoSlab-Medium';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;

export const Title = styled.Text`
  font-family: ${fontMedium};
  font-size: 24px;
  color: #f4ede8;
  margin: 64px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 16px;
`;

export const ForgotPasswordText = styled.Text`
  font-family: ${fontRegular};
  font-size: 16px;
  color: #f4ede8;
`;

export const CreateAcount = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #312e38;
  border-top-width: 1px;
  border-top-color: #232129;
  padding: 16px 0;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CreateAcountText = styled.Text`
  font-family: ${fontRegular};
  font-size: 16px;
  margin-left: 16px;
  color: #ff9600;
`;
