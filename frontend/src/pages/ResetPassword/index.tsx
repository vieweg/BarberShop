import React, { useCallback, useRef, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiArrowLeft, FiLock } from 'react-icons/fi';
import getValidateErrors from '../../utils/getValidateErrors';

import { Container, AnimatedContent, Content, Background } from './style';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logoImage from '../../assets/logo.svg';

interface HandleSubmitProps {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const history = useHistory();
  const params = new URLSearchParams(useLocation().search);

  const handleSubmit = useCallback(
    async (data: HandleSubmitProps) => {
      formRef.current?.setErrors({});
      setLoading(true);
      try {
        const schema = Yup.object().shape({
          password: Yup.string().min(6, 'Minimo de 6 caracteres'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Confirmação inválida',
          ),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const token = params.get('token');

        await api.post('/password/reset', {
          password: data.password,
          password_confirmation: data.password_confirmation,
          token,
        });

        addToast({
          type: 'success',
          title: 'Senha Alterada com sucesso',
          description: 'Você já pode proceder com seu login',
        });
        setLoading(false);
        history.push('/');
      } catch (error) {
        setLoading(false);
        if (error instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidateErrors(error));
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao redefinir a senha',
          description: 'Verifique os dados e tente novamente.',
        });
      }
    },
    [addToast, history, params],
  );

  return (
    <>
      <Container>
        <Background />
        <AnimatedContent>
          <Content>
            <img src={logoImage} alt="" />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Nova senha</h1>
              <Input
                icon={FiLock}
                name="password"
                type="password"
                placeholder="Nova senha"
              />
              <Input
                icon={FiLock}
                name="password_confirmation"
                type="password"
                placeholder="Confirme a senha"
              />
              <Button loading={loading} type="submit">
                Redefinir senha
              </Button>
            </Form>
            <Link to="/">
              <FiArrowLeft />
              Voltar para login
            </Link>
          </Content>
        </AnimatedContent>
      </Container>
    </>
  );
};

export default ResetPassword;
