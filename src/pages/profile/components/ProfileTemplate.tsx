import { Avatar, Box, Button, Flex, Text, UnstyledButton } from "@mantine/core";
import { UserProfile } from "../../../interfaces/UserProfile";
import classes from "../classes/profile.module.css";
import { Roles } from "../../../interfaces/Role";
import { Edit, Logout } from "tabler-icons-react";
import { useEffect, useRef, useState } from "react";
export default function ProfileTemplate({
  user,
  openModal,
}: {
  user: UserProfile;
  openModal: any;
}) {
  const [open, setOpen] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState("35px");

  useEffect(() => {
    if (textRef.current) {
      if (open) {
        setMaxHeight(`${textRef.current.scrollHeight}px`);
      } else {
        setMaxHeight("35px");
      }
    }
  }, [open, user.description]);
  return (
    <Box w={"100%"} bg="white" className={classes.shadow} p={24}>
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={8}>
          <Avatar
            src={user.avatar}
            alt={user.nickname}
            color="#4f46e5"
            h={60}
            w={60}
          >
            <Text fz={24} fw={700}>
              {user.nickname[0]}
            </Text>
          </Avatar>
          <Flex direction="column" gap={4}>
            <Text lh="20px" fz={24} fw={700}>
              {user.firstName} {user.lastName}
            </Text>
            <Text c="#6B7280" fz={16} lh="20px" component="div">
              @{user.nickname}
            </Text>
            <Text c="#6B7280" fz={16} lh="20px" component="div">
              Роль:{" "}
              <Text span c="black">
                {Roles.find((role) => user.role == role.value)?.label}
              </Text>
            </Text>
            <Text c="#6B7280" fz={16} lh="20px" component="div">
              Компания:{" "}
              <Text span c="black">
                {user.workplace}
              </Text>
            </Text>
          </Flex>
        </Flex>

        <Flex gap={8} style={{ alignSelf: "self-start" }}>
          <Button bg="#4f46e5" visibleFrom="sm">
            <Flex align="center" gap={4}>
              <Edit size={16} />
              <Text>Редактировать</Text>
            </Flex>
          </Button>
          <Button bg="#4f46e5" hiddenFrom="sm" px={6} w={36}>
            <Flex align="center" gap={4}>
              <Edit size={16} />
            </Flex>
          </Button>

          <Button bg="#eb0918" visibleFrom="sm" onClick={openModal}>
            <Flex align="center" gap={4}>
              <Logout size={16} />
              <Text>Выйти</Text>
            </Flex>
          </Button>
          <Button bg="#eb0918" hiddenFrom="sm" px={6} w={36}>
            <Flex align="center" gap={4}>
              <Logout size={16} />
            </Flex>
          </Button>
        </Flex>
      </Flex>

      {user.description && (
        <>
          <Box
            ref={textRef}
            style={{
              borderTop: "solid 1.5px rgb(196, 198, 201)",
              overflow: "hidden",
              maxHeight: maxHeight,
              transition: "max-height 0.3s ease",
              paddingTop: "12px",
              marginTop: "12px",
            }}
          >
            <Text c="#6B7280" span>
              О себе:{" "}
            </Text>
            <Text component="span">{user.description}</Text>
          </Box>
          {user.description.length > 152 && (
            <Flex w="100%" justify="flex-end">
              <UnstyledButton
                variant="subtle"
                c="#4f46e5"
                p={0}
                fw={500}
                onClick={() => setOpen(!open)}
              >
                {open ? "Свернуть" : "Раскрыть"}
              </UnstyledButton>
            </Flex>
          )}
        </>
      )}
    </Box>
  );
}
