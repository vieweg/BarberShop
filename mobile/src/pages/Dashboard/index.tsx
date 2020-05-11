import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useAuth } from '../../hooks/auth';

import { Container, Title } from './styles';

const Dashboard: React.FC = () => {
  const { singOut } = useAuth();

  return (
    <Container>
      <Title>Dashboard</Title>
      <TouchableOpacity onPress={singOut}>
        <Title>Sair</Title>
      </TouchableOpacity>
    </Container>
  );
};

export default Dashboard;
