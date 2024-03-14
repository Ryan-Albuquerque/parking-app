import { getEventHistory } from '@/lib/api';
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  Flex,
  Box,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const EventHistoryTable = ({ user, updateTable }: any) => {
  const router = useRouter();

  const [internalUpdateHandler, setInternUpdateHandler] = useState(updateTable);
  const [events, setEvents] = useState<{
    result?: object;
    meta?: { totalSize: number };
  }>();
  const [page, setPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEventHistory({
          token: localStorage?.getItem('token'),
          parkId: user.parkId,
          page: page + 1,
        });
        setEvents(data);
        setInternUpdateHandler(false);
      } catch (error: any) {
        console.error('Erro ao buscar dados de eventos:', error.message);
        setEvents({});
      }
    };

    fetchEvents();
  }, [user, page]);

  const nextPage = async () => {
    try {
      const data = await getEventHistory({
        token: localStorage?.getItem('token'),
        parkId: user.parkId,
        page: page + 1,
      });
      setEvents(data);
      setPage((prevPage) => prevPage + 1);
    } catch (error: any) {
      console.error('Erro ao buscar dados de eventos:', error.message);
      router.refresh();
    }
  };

  const prevPage = async () => {
    try {
      if (page > 0) {
        const data = await getEventHistory({
          token: localStorage?.getItem('token'),
          parkId: user.parkId,
          page: page - 1,
        });
        setEvents(data);
        setPage((prevPage) => prevPage - 1);
      }
    } catch (error: any) {
      console.error('Erro ao buscar dados de eventos:', error.message);
      router.refresh();
    }
  };

  return (
    <>
      <Flex justifyContent="center">
        <Box overflowY="auto" maxWidth="90%">
          <Table variant="simple" margin="5rem auto">
            <Thead>
              <Tr>
                <Th>Entrada</Th>
                <Th>Saída</Th>
                <Th>Placa</Th>
              </Tr>
            </Thead>
            <Tbody>
              {internalUpdateHandler ? (
                <Tr>
                  <Td colSpan={3}>Carregando novas informações ....</Td>
                </Tr>
              ) : Array.isArray(events?.result) && events.result.length > 0 ? (
                events.result.map((event, index) => (
                  <Tr key={index}>
                    <Td>
                      {new Date(event.getInTime).toLocaleString()} -{' '}
                      {event.getInUserName}
                    </Td>
                    <Td>
                      {event.getOutTime &&
                        new Date(event.getOutTime).toLocaleString()}{' '}
                      - {event.getOutUserName}
                    </Td>
                    <Td>{event.licensePlate}</Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={3}>Nenhum evento encontrado.</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
          <Flex mt={4} justifyContent="flex-end" margin="5rem auto">
            {!(page === 0) && <Button onClick={prevPage}>Anterior</Button>}
            {!(
              page + 1 >=
              Math.ceil((events?.meta?.totalSize || 0) / itemsPerPage)
            ) && <Button onClick={nextPage}>Próxima</Button>}
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default EventHistoryTable;
