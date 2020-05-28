import React, { useCallback, useRef, useState, ChangeEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiArrowLeft, FiMail, FiUser, FiLock, FiCamera } from 'react-icons/fi';
import getValidateErrors from '../../utils/getValidateErrors';

import {
  Container,
  Header,
  HeaderContent,
  AvatarProfile,
  Content,
} from './style';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { useAuth } from '../../hooks/auth';

interface HandleSubmitProps {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: HandleSubmitProps) => {
      formRef.current?.setErrors({});
      setLoading(true);
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .email('Informe um email válido')
            .required('Email é obrigatório'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => val.length > 0,
            then: Yup.string()
              .min(6, 'Minimo de 6 caracteres')
              .required('Password is required'),
          }),
          password_confirmation: Yup.string().when('old_password', {
            is: value => value.length > 0,
            then: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Confirmation not match')
              .required('Password confirm is required'),
          }),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);
        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Perfil atualizado com sucesso',
        });

        setLoading(false);
        history.push('/dashboard');
      } catch (error) {
        setLoading(false);
        if (error instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidateErrors(error));
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao atualizar seu perfil',
          description: 'Verifique os dados e tente novamente.',
        });
      }
    },
    [addToast, history, updateUser],
  );

  const handleUpdateAvatar = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const formData = new FormData();
        formData.append('avatar', e.target.files[0]);

        api.patch('profile/avatar', formData).then(response => {
          updateUser(response.data);
          addToast({
            type: 'success',
            title: 'Avatar atualizado!',
          });
        });
      }
    },
    [updateUser, addToast],
  );
  return (
    <>
      <Container>
        <Header>
          <HeaderContent>
            <Link to="/dashboard">
              <FiArrowLeft />
            </Link>
          </HeaderContent>
        </Header>
        <Content>
          <AvatarProfile>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleUpdateAvatar} />
            </label>
          </AvatarProfile>
          <Form
            ref={formRef}
            initialData={{
              name: user.name,
              email: user.email,
            }}
            onSubmit={handleSubmit}
          >
            <h1>Meu perfil</h1>
            <Input icon={FiUser} name="name" type="text" placeholder="Nome" />
            <Input
              icon={FiMail}
              name="email"
              type="text"
              placeholder="E-mail"
            />
            <Input
              containerStyle={{ marginTop: '24px' }}
              icon={FiLock}
              name="old_password"
              type="password"
              placeholder="Senha Atual"
            />
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Nova Senha"
            />
            <Input
              icon={FiLock}
              name="password_confirmation"
              type="password"
              placeholder="Confirme a senha"
            />
            <Button loading={loading} type="submit">
              Confirmar mudanças
            </Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Profile;
