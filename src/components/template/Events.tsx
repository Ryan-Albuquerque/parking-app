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
  FormErrorMessage,
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
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors: inErrors },
  } = useForm();
  const {
    register: outRegister,
    handleSubmit: handleOutSubmit,
    getValues: getOutValues,
    formState: { errors: outErrors },
  } = useForm();
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
        window.location.reload();
      }
    } catch (error: any) {
      console.error(
        'Erro ao processar evento de entrada',
        JSON.stringify(error?.message)
      );
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
      }
    } catch (error: any) {
      console.error(
        'Erro ao processar evento de saída',
        JSON.stringify(error?.message)
      );
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
            <FormControl isInvalid={!!inErrors['plate']}>
              <Text fontSize="lg" fontWeight="bold" padding=".5rem 0">
                Entrada
              </Text>
              <FormLabel htmlFor="plate" fontWeight="normal">
                Placa
              </FormLabel>
              <Input
                {...register('plate', { required: 'Campo Obrigatório' })}
                type="text"
                id="plate"
                placeholder="Digite a placa"
              />
              <FormErrorMessage>
                {(inErrors.plate && inErrors.plate.message)?.toString()}
              </FormErrorMessage>
            </FormControl>
            <Flex justifyContent="flex-end" w="100%">
              <Button colorScheme="blue" type="submit">
                Iniciar
              </Button>
            </Flex>
          </VStack>
        </Box>
        <Box bg="gray.100" p={4} borderRadius="md">
          <VStack
            spacing={4}
            as="form"
            onSubmit={handleOutSubmit(onGetOutSubmit)}
          >
            <FormControl isInvalid={!!outErrors['plateOut']}>
              <Text fontSize="lg" fontWeight="bold" padding=".5rem 0">
                Saída
              </Text>
              <FormLabel htmlFor="plate" fontWeight="normal">
                Placa
              </FormLabel>
              <Input
                {...outRegister('plateOut', { required: 'Campo obrigatório' })}
                type="text"
                id="plate"
                placeholder="Digite a placa"
              />
              <FormErrorMessage>
                {(outErrors.plateOut && outErrors.plateOut.message)?.toString()}
              </FormErrorMessage>
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
