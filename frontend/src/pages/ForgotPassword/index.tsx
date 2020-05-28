import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiArrowLeft, FiMail } from 'react-icons/fi';
import getValidateErrors from '../../utils/getValidateErrors';

import { Container, AnimatedContent, Content, Background } from './style';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logoImage from '../../assets/logo.svg';

interface HandleSubmitProps {
  email: string;
}

const ForgottPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: HandleSubmitProps) => {
      formRef.current?.setErrors({});
      setLoading(true);
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email é obrigatório')
            .email('Informe um email válido'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/forgot', { email: data.email });

        addToast({
          type: 'success',
          title: 'Solicitação realizada com sucesso',
          description:
            'Verifique sua caixa de email, você receberá um email com instruções',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidateErrors(error));
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao efetuar a recuperação',
          description: 'Verifique os dados e tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <>
      <Container>
        <Background />
        <AnimatedContent>
          <Content>
            <img src={logoImage} alt="" />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Recuperar minha senha</h1>
              <Input
                icon={FiMail}
                name="email"
                type="text"
                placeholder="E-mail"
              />
              <Button loading={loading} type="submit">
                Recuperar senha
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

export default ForgottPassword;
