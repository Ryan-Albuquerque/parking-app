import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from '@chakra-ui/react';

export default function InfoPayModal(
  {
    isOpen,
    onClose,
    plate,
    value,
  }: { isOpen: boolean; plate: string; onClose: () => void; value: number },
  _ref: any
) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader alignSelf="center">Placa - {plate}</ModalHeader>
          <ModalCloseButton />
          <ModalBody alignSelf="center">
            <Text fontSize="lg" fontWeight="bold" padding=".5rem 0">Cobrar: R$ {value / 100}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
