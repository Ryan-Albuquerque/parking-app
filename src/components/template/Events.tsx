'use client';
import {
  Box,
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
  Grid,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { startEvent, finishEvent } from '@/lib/api';
import InfoPayModal from '../organisms/InfoPayModal';
import { useState } from 'react';

export default function Events({ user }: { user: any }) {
  const toast = useToast({
    position: 'top',
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, getValues, reset: resetInForm } = useForm();
  const { register: outRegister, handleSubmit: handleOutSubmit, getValues: getOutValues, reset: resetOutForm } = useForm();
  const [valueToPayInCents, setValueToPay] = useState<number>(0);
  const [plate, setPlate] = useState<string>('');

  const onGetInSubmit = async () => {
    const { plate } = getValues();
    try {
      const data = await startEvent(
        {
          parkId: user.parkId,
          getInUserId: user.userId,
          getInTime: new Date().toISOString(),
          licensePlate: plate,
        },
        { token: localStorage.getItem('token') }
      );

      if (data) {
        toast({
          title: `Carro ${plate}`,
          description: 'Entrada cadastrada com sucesso',
          status: 'success',
          isClosable: true,
        });
      }
      resetInForm();
    } catch (error: any) {
      console.error('Erro ao processar evento de entrada', JSON.stringify(error?.message));
      toast({
        title: `Erro ao processar evento de entrada`,
        description: error.message,
        status: 'error',
        isClosable: true,
      });
    }
  };

  const onGetOutSubmit = async () => {
    const { plateOut } = getOutValues();
    try {
      const data = await finishEvent(
        {
          getOutUserId: user.userId,
          getOutTime: new Date().toISOString(),
          licensePlate: plateOut,
        },
        { token: localStorage.getItem('token') }
      );

      if (data) {
        toast({
          title: `Carro ${plateOut}`,
          description: 'Saída cadastrada com sucesso',
          status: 'success',
          isClosable: true,
        });
        setValueToPay(data.paidValueInCents);
        setPlate(plateOut);
        onOpen();
        resetOutForm();
      }
    } catch (error: any) {
      console.error('Erro ao processar evento de saída', JSON.stringify(error?.message));
      toast({
        title: `Erro ao processar evento de saída`,
        description: error.message,
        status: 'error',
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 1fr' }}
        gap={6}
        padding={'3rem 2rem 10rem '}
      >
        <Box bg="gray.100" p={4} borderRadius="md">
          <VStack spacing={4} as="form" onSubmit={handleSubmit(onGetInSubmit)}>
            <FormControl>
              <Text fontSize="lg" fontWeight="bold" padding=".5rem 0">
                Entrada
              </Text>
              <FormLabel htmlFor="plate" fontWeight="normal">
                Placa
              </FormLabel>
              <Input
                {...register('plate')}
                type="text"
                id="plate"
                placeholder="Digite a placa"
              />
            </FormControl>
            <Flex justifyContent="flex-end" w="100%">
              <Button colorScheme="blue" type="submit">
                Iniciar
              </Button>
            </Flex>
          </VStack>
        </Box>
        <Box bg="gray.100" p={4} borderRadius="md">
          <VStack spacing={4} as="form" onSubmit={handleOutSubmit(onGetOutSubmit)}>
            <FormControl>
              <Text fontSize="lg" fontWeight="bold" padding=".5rem 0">
                Saída
              </Text>
              <FormLabel htmlFor="plate" fontWeight="normal">
                Placa
              </FormLabel>
              <Input
                {...outRegister('plateOut')}
                type="text"
                id="plate"
                placeholder="Digite a placa"
              />
            </FormControl>
            <Flex justifyContent="flex-end" w="100%">
              <Button colorScheme="red" type="submit">
                Fechar
              </Button>
            </Flex>
          </VStack>
        </Box>
      </Grid>
      {isOpen && valueToPayInCents && (
        <InfoPayModal
          value={valueToPayInCents}
          plate={plate}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
}
