import React, { useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Container, AnimatedContent, Content, Background } from './style';

import Button from '../../components/Button';
import Input from '../../components/Input';

import getValidateErrors from '../../utils/getValidateErrors';

import logoImage from '../../assets/logo.svg';

interface handleSubmitProps {
  email: string;
  password: string;
}

const SingIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { singIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: handleSubmitProps) => {
      formRef.current?.setErrors({});
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Campo obrigatório')
            .email('Insira um email válido'),
          password: Yup.string().required('Campo Obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await singIn(data);

        history.push('/dashboard');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidateErrors(error));
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro na autenticação, verifique suas credenciais.',
        });
      }
    },
    [singIn, addToast, history],
  );

  return (
    <>
      <Container>
        <AnimatedContent>
          <Content>
            <img src={logoImage} alt="" />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu login</h1>
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
              <a href="forget">Esqueci minha senha</a>
            </Form>
            <Link to="/singup">
              <FiLogIn />
              Criar conta
            </Link>
          </Content>
        </AnimatedContent>
        <Background />
      </Container>
    </>
  );
};

export default SingIn;
