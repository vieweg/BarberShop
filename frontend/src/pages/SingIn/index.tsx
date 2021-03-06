import React, { useRef, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import { Container, AnimatedContent, Content, Background } from './style';

import Button from '../../components/Button';
import Input from '../../components/Input';

import getValidateErrors from '../../utils/getValidateErrors';

import logoImage from '../../assets/logo.svg';

interface HandleSubmitProps {
  email: string;
  password: string;
}

const SingIn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { singIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: HandleSubmitProps) => {
      formRef.current?.setErrors({});
      setLoading(true);
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
      } catch (error) {
        setLoading(false);
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
    [singIn, addToast],
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
              <Button loading={loading} type="submit">
                Entrar
              </Button>
              <Link to="/forgot-password">Esqueci minha senha</Link>
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
