import { Button, Flex, Modal, Text } from "@mantine/core";
import { IconCancel } from "@tabler/icons-react";
import { Logout } from "tabler-icons-react";
import { useAuthStore } from "../../stores/authStore";
import axios from "axios";
import { API } from "../../app/helpers";

export default function ModalExit({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  const { clearUser } = useAuthStore();

  const onExit = () => {
    clearUser();
    axios.post(`${API}/auth/logout`, {
      withCredentials: true,
    });
    close();
  };
  return (
    <Modal opened={opened} onClose={close} title="Вы уверены что хотите выйти?">
      <Flex gap={16}>
        <Button bg="#4f46e5" fullWidth onClick={close}>
          <Flex align="center" gap={4}>
            <IconCancel size={16} />
            <Text>Отмена</Text>
          </Flex>
        </Button>
        <Button bg="#eb0918" fullWidth onClick={onExit}>
          <Flex align="center" gap={4}>
            <Logout size={16} />
            <Text>Выйти</Text>
          </Flex>
        </Button>
      </Flex>
    </Modal>
  );
}
