'use client';
import EventHistoryTable from '@/components/organisms/EventHistoryTable';
import Events from '@/components/template/Events';
import { getUserInfo } from '@/lib/api';
import { Box, Button, Flex, useBreakpointValue, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Index() {
  const router = useRouter();
  const toast = useToast({ position: 'top' });

  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    };

    getToken();
  }, []);

  useEffect(() => {
    if (token && !user) {
      const getData = async () => {
        try {
          const data = await getUserInfo(token);
          if (!data) {
            throw new Error('Faça login novamente');
          }
          setUser(data);
        } catch (error: any) {
          toast({
            title: 'Erro ao buscar dados de usuário',
            description: error.message,
            status: 'error',
            isClosable: true,
          });
          router.push('/');
        }
      };

      getData();
    }
  }, [token, user, router, toast]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    router.push('/');
  };


  const maxBoxWidth = useBreakpointValue({ base: '100%', lg: '80%' });

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
      <Flex justifyContent='center'>
        <Box maxWidth={maxBoxWidth}>
          <Events user={user} />
          <EventHistoryTable user={user} />
        </Box>
      </Flex>
    </>
  );
}
