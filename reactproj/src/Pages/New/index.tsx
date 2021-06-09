import React, { useRef, useCallback } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';
import { useHistory } from 'react-router-dom'
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useToast } from '../../hooks/ToastContext';
import { Container } from './styles'
import api from '../../services/api'

interface NewInFormData {
  disciplina: string;
  professor: string;
  diasemana: string;
  periodo: string;
  horario: string;
}

const New: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast()
  const history = useHistory();

  const handleSubmit = useCallback(async (data: NewInFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        disciplina: Yup.string().required('Disciplina obrigatória'),
        professor: Yup.string().required('Professor obrigatório'),
        diasemana: Yup.string().required('Dia Semana obrigatório'),
        periodo: Yup.string().required('Periodo obrigatório'),
        horario: Yup.string().required('Horário obrigatório')
      })
      await schema.validate(data, {
        abortEarly: false,
      });
      
      formRef.current?.reset()
      await api.post('teachers', data)
      history.push('/dashboard')

      addToast({
        type: 'success',
        title: 'Cadastro realizado',
        description: 'Cadastro realizado com sucesso!!',
      });

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
      }

      addToast({
        type: 'error',
        title: 'Erro no Cadastro',
        description: 'Ocorreu um erro ao fazer o cadastro, tente novamente',
      });
    }
  }, [addToast]);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Cadastro Professores/Disciplina</h1>
        <Input name="disciplina" placeholder="Disciplina" />
        <Input name="professor" placeholder="Professor" />
        <Input name="diasemana" placeholder="Dia Semana" />
        <Input name="periodo" placeholder="Periodo" />
        <Input name="horario" placeholder="Horario" />
        <Button type="submit">Cadastrar</Button>
      </Form>
    </Container>
  )
}

export default New

