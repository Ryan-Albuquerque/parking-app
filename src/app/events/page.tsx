'use client'
import Events from '@/components/template/Events';
import { getUserInfo } from '@/lib/api';
import { Box, Button, Flex, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const getUser = async (token?: string) => {
  try {
    const data = await getUserInfo(token);
    return data;
  } catch (error: any) {
    console.error('Erro ao buscar dados do usuário', JSON.stringify(error?.message));
    return null;
  }
};

export default function Index() {
  const router = useRouter();
  const toast = useToast({
    position: 'top',
  });

  const [user, setUser] = useState();
  const [token, setToken] = useState(localStorage?.getItem('token') ?? '');


  useEffect(() => {
    const getData = async () => {
      const data = await getUser(token);

      if (!data) {
        toast({
          title: 'Erro ao buscar dados de usuário',
          description: "Faça login novamente",
          status: 'error',
          isClosable: true,
        });
        router.push('/');
      }

      setUser(data);
    };

    getData();
  }, [token]);

  const handleSignOut = () => {
    localStorage?.removeItem('token');
    setToken('');
    router.refresh();
  };

  return (
    <>
      <Flex justifyContent="flex-end">
        <Box>
          <Button
            ml="auto"
            margin={'2rem'}
            colorScheme="red"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </Box>
      </Flex>
      <Events user={user}/>
    </>
  );
}