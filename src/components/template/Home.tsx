'use client';
import {
  Box,
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  FormErrorMessage,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { login, register } from '@/lib/api';
import ILoginProps from '@/interfaces/ILoginProps';
import { useRouter } from 'next/navigation';
import IRegisterProps from '@/interfaces/IRegisterProps';

export default function Home() {
  const router = useRouter();
  const toast = useToast({
    position: 'top',
  });

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    getValues: loginValues,
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
  } = useForm<ILoginProps>();
  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    getValues: registerValues,
    formState: { errors: registerErrors, isSubmitting: isRegisterSubmitting },
  } = useForm<IRegisterProps>();

  const onSubmitLogin = async () => {
    try {
      const data = loginValues();
      console.log('Login:', data);
      const token = await login(data);

      if (token) {
        localStorage.setItem('token', token);
        toast({
          description: 'Usuário logado com sucesso',
          status: 'success',
          isClosable: true,
        });
        window.location.assign('/events');
      } else {
        throw new Error('Erro ao obter token');
      }
    } catch (error: any) {
      console.error('Erro ao submeter login', JSON.stringify(error?.message));
      toast({
        title: 'Erro ao fazer login',
        description: error.message,
        status: 'error',
        isClosable: true,
      });
    }
  };

  const onSubmitRegister = async () => {
    try {
      const body = registerValues();
      console.log('Register:', body);
      const data = await register(body);

      if (data) {
        toast({
          description: 'Usuário criado com sucesso',
          status: 'success',
          isClosable: true,
        });
        window.location.reload();
      } else {
        throw new Error('Erro ao cadastrar');
      }
    } catch (error: any) {
      console.error('Erro ao submeter login', JSON.stringify(error?.message));
      toast({
        title: 'Erro ao cadastrar',
        description: error.message,
        status: 'error',
        isClosable: true,
      });
    }
  };
  const maxBoxWidth = useBreakpointValue({ base: '90%', md: '30%' });
  return (
    <VStack
      spacing={4}
      align="center"
      maxWidth={maxBoxWidth}
      margin="15rem auto"
    >
      <Box width="100%">
        <Tabs isFitted>
          <TabList>
            <Tab>Login</Tab>
            <Tab>Registro</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <form onSubmit={handleLoginSubmit(onSubmitLogin)}>
                <VStack spacing={4} align="stretch" gap="2rem">
                  <FormControl isInvalid={loginErrors?.username}>
                    <FormLabel htmlFor="username">Usuário</FormLabel>
                    <Input
                      id="username"
                      type="text"
                      {...loginRegister('username', {
                        required: 'Campo obrigatório',
                      })}
                    />
                    <FormErrorMessage>
                      {(
                        loginErrors.username && loginErrors.username.message
                      )?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={loginErrors?.password}>
                    <FormLabel htmlFor="password">Senha</FormLabel>
                    <Input
                      id="password"
                      type="password"
                      {...loginRegister('password', {
                        required: 'Campo obrigatório',
                      })}
                    />
                    <FormErrorMessage>
                      {(
                        loginErrors.password && loginErrors.password.message
                      )?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <Button type="submit">
                    {!isLoginSubmitting ? 'Login' : 'Carregando'}
                  </Button>
                </VStack>
              </form>
            </TabPanel>
            <TabPanel>
              <form onSubmit={handleRegisterSubmit(onSubmitRegister)}>
                <VStack spacing={4} align="stretch" gap="2rem">
                  <FormControl isInvalid={registerErrors?.parkName}>
                    <FormLabel htmlFor="parkName">
                      Nome do Estacionamento
                    </FormLabel>
                    <Input
                      id="parkName"
                      type="text"
                      placeholder="Adicione o nome de um estacionamento válido"
                      {...registerRegister('parkName', {
                        required: 'Campo obrigatório',
                      })}
                    />
                    <FormErrorMessage>
                      {(
                        registerErrors.parkName &&
                        registerErrors.parkName.message
                      )?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={registerErrors?.username}>
                    <FormLabel htmlFor="username">Usuário</FormLabel>
                    <Input
                      id="username"
                      type="text"
                      {...registerRegister('username', {
                        required: 'Campo obrigatório',
                      })}
                    />
                    <FormErrorMessage>
                      {(
                        registerErrors.username &&
                        registerErrors.username.message
                      )?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={registerErrors?.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      type="email"
                      id="email"
                      {...registerRegister('email', {
                        required: 'Campo obrigatório',
                      })}
                    />
                    <FormErrorMessage>
                      {(
                        registerErrors.email && registerErrors.email.message
                      )?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={registerErrors?.password}>
                    <FormLabel htmlFor="password">Senha</FormLabel>
                    <Input
                      id="password"
                      type="password"
                      {...registerRegister('password', {
                        required: 'Campo obrigatório',
                        minLength: {
                          value: 7,
                          message: 'Senha deve conter mais de 7 caracteres',
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {(
                        registerErrors.password &&
                        registerErrors.password.message
                      )?.toString()}
                    </FormErrorMessage>
                  </FormControl>
                  <Button type="submit">
                    {!isRegisterSubmitting ? 'Registrar' : 'Carregando'}
                  </Button>
                </VStack>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </VStack>
  );
}
