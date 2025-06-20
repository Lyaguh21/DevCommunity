import { Button, Flex, Modal, Text } from "@mantine/core";
import { IconCancel } from "@tabler/icons-react";
import { Trash } from "tabler-icons-react";

export default function ModalConfirmDelete({
  opened,
  close,
  onDelete,
}: {
  onDelete: () => void;
  opened: boolean;
  close: () => void;
}) {
  return (
    <Modal opened={opened} onClose={close} title="Подтвердите удаление">
      <Flex gap={16}>
        <Button bg="#4f46e5" fullWidth onClick={close}>
          <Flex align="center" gap={4}>
            <IconCancel size={16} />
            <Text>Отмена</Text>
          </Flex>
        </Button>
        <Button bg="#eb0918" fullWidth onClick={onDelete}>
          <Flex align="center" gap={4}>
            <Trash size={16} />
            <Text>Удалить</Text>
          </Flex>
        </Button>
      </Flex>
    </Modal>
  );
}
