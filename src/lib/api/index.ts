import ILoginProps from '@/interfaces/ILoginProps';
import { IRegisterProps } from '@/interfaces/IRegisterProps';
import axios from 'axios';

const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

export async function login(input: ILoginProps) {
  try {
    const { data } = await instance.post('api/Auth/login', input);

    if (data.token) {
      return data.token;
    }
  } catch (error: any) {
    if (error?.response?.data) {
      throw new Error(error.response.data);
    }
    throw new Error('Erro ao fazer login');
  }
}

export async function register(input: IRegisterProps) {
  try {
    const { data } = await instance.post('api/Auth/register', input);

    return data;
  } catch (error: any) {    
    if (error?.response?.data) {
      throw new Error(error?.response?.data);
    }
    throw new Error('Erro ao fazer cadastro de novo usuário');
  }
}
