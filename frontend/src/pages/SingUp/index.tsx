import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidateErrors from '../../utils/getValidateErrors';

import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Container, AnimatedContent, Content, Background } from './style';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logoImage from '../../assets/logo.svg';

interface HandleSubmitProps {
  name: string;
  email: string;
  password: string;
}

const SingUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: HandleSubmitProps) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('Email é obrigatório')
            .email('Informe um email válido'),
          password: Yup.string().min(6, 'Minimo de 6 caracteres'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);
        addToast({
          type: 'success',
          title: 'Cadastro efetuado com sucesso',
          description:
            'Agora você ja pod usar suas credenciais para efetuar seu login.',
        });
        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidateErrors(error));
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao efetuar o cadastro',
          description: 'Verifique os dados e tente novamente.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <>
      <Container>
        <Background />
        <AnimatedContent>
          <Content>
            <img src={logoImage} alt="" />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu Cadastro</h1>
              <Input icon={FiUser} name="name" type="text" placeholder="Nome" />
              <Input
                icon={FiMail}
                name="email"
                type="text"
                placeholder="E-mail"
              />
              <Input
                icon={FiLock}
                name="password"
                type="password"
                placeholder="Senha"
              />
              <Button>Entrar</Button>
            </Form>
            <Link to="/">
              <FiArrowLeft />
              Voltar para logon
            </Link>
          </Content>
        </AnimatedContent>
      </Container>
    </>
  );
};

export default SingUp;
