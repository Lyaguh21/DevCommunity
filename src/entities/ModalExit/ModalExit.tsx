import { Button, Flex, Modal, Text } from "@mantine/core";
import { Login, Logout } from "tabler-icons-react";

export default function ModalExit({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  return (
    <Modal opened={opened} onClose={close} title="Вы уверены что хотите выйти?">
      <Flex gap={16}>
        <Button bg="#4f46e5" fullWidth onClick={close}>
          <Flex align="center" gap={4}>
            <Login size={16} />
            <Text>Отмена</Text>
          </Flex>
        </Button>
        <Button bg="#eb0918" fullWidth>
          <Flex align="center" gap={4}>
            <Logout size={16} />
            <Text>Выйти</Text>
          </Flex>
        </Button>
      </Flex>
    </Modal>
  );
}
