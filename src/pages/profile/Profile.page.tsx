import { Flex } from "@mantine/core";
import { UserProfile } from "../../interfaces/UserProfile";
import ProfileTemplate from "./components/ProfileTemplate";
import PortfolioSection from "./components/PortfolioSection";
import { useDisclosure } from "@mantine/hooks";
import ModalExit from "../../entities/ModalExit/ModalExit";
import { useParams } from "react-router";
import { useAuthStore } from "../../stores/authStore";

export default function Profile() {
  const { clearUser } = useAuthStore();
  const { id } = useParams();
  const user: UserProfile = {
    id: "3",
    firstName: "Иdгорь",
    lastName: "Малышев",
    nickname: "Lgorek2280",
    role: "Frontend",
    description:
      " В zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид  В zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид",
    workplace: 'OOO "ZUZU"',
    portfolio: [
      {
        id: "1",
        title: "Okoprom",
        description: "Machine tool sail webapp",
        links: ["hhtp://", null, "hhtp://"],
        previewImage:
          "https://i.pinimg.com/originals/db/46/90/db46900efc60e41a87a1274fecebc977.jpg",
      },
      {
        id: "2",
        title: "Okoprom",

        links: [null, null, null],
        previewImage:
          "https://i.pinimg.com/originals/db/46/90/db46900efc60e41a87a1274fecebc977.jpg",
      },
      {
        id: "3",
        title: "Okoprom",
        description:
          "В zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид  В zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид",
        links: ["hhtp://", "hhtp://", "hhtp://"],
        previewImage:
          "https://i.pinimg.com/originals/db/46/90/db46900efc60e41a87a1274fecebc977.jpg",
      },
      {
        id: "4",
        title: "Okoprom",
        description: "Machine tool sail webapp",
        links: ["hhtp://", "hhtp://", "hhtp://"],
        previewImage:
          "https://i.pinimg.com/originals/db/46/90/db46900efc60e41a87a1274fecebc977.jpg",
      },
    ],
  };
  const [opened, { open, close }] = useDisclosure(false);

  const onExit = () => {
    clearUser();
    close();
  };
  return (
    <Flex h="100%" mih="94vh" py={16} direction="column" gap={16}>
      <ProfileTemplate user={user} openModal={open} />

      <PortfolioSection user={user} thisAuthor={id} />

      <ModalExit close={close} opened={opened} onExit={onExit} />
    </Flex>
  );
}
