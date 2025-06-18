import { Flex } from "@mantine/core";
import { UserProfile } from "../../interfaces/UserProfile";
import ProfileTemplate from "./components/ProfileTemplate";
import PortfolioSection from "./components/PortfolioSection";

export default function Profile() {
  const user: UserProfile = {
    id: "1",
    firstName: "Игорь",
    lastName: "Малышев",
    nickname: "Lgorek2280",
    role: "HR",
    description: "Работаю в zuzu, главный тех лид",
    workplace: 'OOO "ZUZU"',
    portfolio: [
      {
        id: "1",
        title: "Okoprom",
        description: "Machine tool sail webapp",
        links: ["hhtp://", "hhtp://", "hhtp://"],
        previewImage:
          "https://i.pinimg.com/originals/db/46/90/db46900efc60e41a87a1274fecebc977.jpg",
      },
      {
        id: "2",
        title: "Okoprom",
        description: "Machine tool sail webapp",
        links: ["hhtp://", "hhtp://", "hhtp://"],
        previewImage:
          "https://i.pinimg.com/originals/db/46/90/db46900efc60e41a87a1274fecebc977.jpg",
      },
      {
        id: "3",
        title: "Okoprom",
        description:
          "Machine tool sail webappffffffffffff fefefew fewfwefwefewfw efwefwe",
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

  return (
    <Flex h="100%" pt={32} direction="column" gap={32}>
      <ProfileTemplate user={user} />

      <PortfolioSection projects={user.portfolio} />
    </Flex>
  );
}
