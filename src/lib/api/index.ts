import ILoginProps from '@/interfaces/ILoginProps';
import IRegisterProps from '@/interfaces/IRegisterProps';
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

export async function getUserInfo(token?: string) {
  try {
    const { data } = await instance.post('api/Auth/userinfo', { token });

    return data;
  } catch (error: any) {
    if (error?.response?.data) {
      throw new Error(error?.response?.data);
    }
    throw new Error('Erro ao fazer busca do usuário');
  }
}

export async function startEvent(input: any, options: any) {
  try {
    const { data } = await instance.post('api/Event/start', input, {
      headers: {
        Authorization: `Bearer ${options.token}`,
      },
    });

    return data;
  } catch (error: any) {
    if (error?.response?.data) {
      throw new Error(error?.response?.data);
    }
    throw new Error('Erro ao iniciar um evento');
  }
}

export async function getEventHistory(options: any) {
  try {
    const { data } = await instance.get(
      `api/Event/history?parkId=${options.parkId}&page=${options.page || 1}`,
      {
        headers: {
          Authorization: `Bearer ${options.token}`,
        },
      }
    );

    return data;
  } catch (error: any) {
    if (error?.response?.data) {
      throw new Error(error?.response?.data);
    }
    throw new Error('Erro ao buscar historico');
  }
}

export async function finishEvent(input: any, options: any) {
  try {
    const { data } = await instance.post('api/Event/finish', input, {
      headers: {
        Authorization: `Bearer ${options.token}`,
      },
    });

    return data;
  } catch (error: any) {
    if (error?.response?.data) {
      throw new Error(error?.response?.data);
    }
    throw new Error('Erro ao finalizar um evento');
  }
}
