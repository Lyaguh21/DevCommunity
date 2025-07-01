import { Avatar, Box, Button, Flex, Text, UnstyledButton } from "@mantine/core";
import { UserProfile } from "../../../entities/user/UserProfile";
import classes from "../classes/profile.module.css";
import { Roles } from "../../../entities/user/Role";
import { Edit, Logout } from "tabler-icons-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import { IconBuilding, IconCode } from "@tabler/icons-react";
import { useAuthStore } from "../../../stores/authStore";
export default function ProfileTemplate({
  ThisUser,
  openModal,
}: {
  ThisUser: any;
  openModal: any;
}) {
  const { user } = useAuthStore();
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
  }, [open, ThisUser.description]);
  return (
    <Box w={"100%"} bg="white" className={classes.shadow} p={24}>
      <Flex align="center" justify="space-between">
        <Flex align="center" gap={8}>
          <Avatar
            src={`data:image/jpeg;base64,${ThisUser?.avatar}`}
            alt={ThisUser?.nickname}
            color="#4f46e5"
            h={60}
            w={60}
          >
            <Text fz={24} fw={700}>
              {ThisUser.firstName[0]}
              {ThisUser.lastName[0]}
            </Text>
          </Avatar>
          <Flex direction="column" gap={4}>
            <Text fz={24} fw={700}>
              {ThisUser.firstName} {ThisUser.lastName}
            </Text>
            <Text c="#6B7280" fz={16} lh="20px" component="div">
              @{ThisUser.nickname}
            </Text>
            <Flex align="center">
              <Flex visibleFrom="xs" justify="center" align="center">
                <IconCode size={16} color="#6B7280" />
              </Flex>
              <Text c="#6B7280" fz={16} lh="20px" component="div">
                Роль:{" "}
                <Text span c="black">
                  {Roles.find((role) => ThisUser.role == role.value)?.label}
                </Text>
              </Text>
            </Flex>

            {ThisUser.workplace && (
              <Flex align="center">
                <Flex visibleFrom="xs" justify="center" align="center">
                  <IconBuilding size={16} color="#6B7280" />
                </Flex>
                <Text c="#6B7280" fz={16} lh="20px" component="div">
                  Компания:{" "}
                  <Text span c="black">
                    {ThisUser.workplace}
                  </Text>
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>

        {user?.id === ThisUser.userId && (
          <Flex gap={8} style={{ alignSelf: "self-start" }}>
            <NavLink to="/profile/edit">
              <Button bg="#4f46e5" visibleFrom="sm">
                <Flex align="center" gap={4}>
                  <Edit size={16} />
                  <Text>Редактировать</Text>
                </Flex>
              </Button>
            </NavLink>
            <NavLink to="/profile/edit">
              <Button bg="#4f46e5" hiddenFrom="sm" px={6} w={36}>
                <Flex align="center" gap={4}>
                  <Edit size={16} />
                </Flex>
              </Button>
            </NavLink>

            <Button bg="#eb0918" visibleFrom="sm" onClick={openModal}>
              <Flex align="center" gap={4}>
                <Logout size={16} />
                <Text>Выйти</Text>
              </Flex>
            </Button>
            <Button
              bg="#eb0918"
              hiddenFrom="sm"
              px={6}
              w={36}
              onClick={openModal}
            >
              <Flex align="center" gap={4}>
                <Logout size={16} />
              </Flex>
            </Button>
          </Flex>
        )}
      </Flex>

      {ThisUser.description !== "" && (
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
            <Text component="span">{ThisUser.description}</Text>
          </Box>
          {ThisUser.description.length > 152 && (
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
