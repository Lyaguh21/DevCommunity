import { Center, Flex, Text } from "@mantine/core";
import FilterSection from "./components/FilterSection";
import PostTemplate from "./components/PostTemplate";
import { useState, useEffect } from "react";
import { Post } from "../../interfaces/Post.interface";

export default function Home() {
  const [filters, setFilters] = useState({
    type: "All",
    direction: "All",
  });

  const posts: Post[] = [
    {
      id: 1,
      title: "Test",
      content:
        "ewdw\ndedeef\n# feffef\n### fref\n# feffef\n### fref\n# feffef\n### fref\n# feffef\n### fref",
      author: {
        firstname: "Тема",
        lastname: "Иванов",
        nickname: "Lyaguh",
        email: "test@gmail.com",
        password: "11111111",
        role: "Frontend",
      },
      type: "Content",
      direction: "Frontend",
      likes: 0,
      isLikedByUser: false,
    },
    {
      id: 2,
      title: "Test 2",
      content:
        "В этой статье я поделюсь лучшими практиками использования React Hooks, которые помогут вам писать более чистый и эффективный код. Рассмотрим useState, useEffect, useContext и кастомные хуки В этой статье я поделюсь лучшими практиками использования React Hooks, которые помогут вам писать более чистый и эффективный код. Рассмотрим useState, useEffect, useContext и кастомные хуки",
      author: {
        firstname: "Тема2",
        lastname: "Иванов2",
        nickname: "Lyaguh2",
        email: "test@gmail.com",
        password: "11111111",
        role: "Backend",
      },
      type: "Vacancy",
      direction: "Backend",
      likes: 1,
      isLikedByUser: false,
      previewImage:
        "https://avatars.mds.yandex.net/get-mpic/12476287/2a0000018da9d80e0e03876d95283b129253/orig",
    },
    {
      id: 3,
      title: "Test",
      content:
        "ewdw\ndedeef\n# feffef\n### fref\n# feffef\n### fref\n# feffef\n### fref\n# feffef\n### fref",
      author: {
        firstname: "Темe2eа",
        lastname: "e2",
        nickname: "212",
        email: "test@gmail.com",
        password: "11111111",
        role: "QA",
      },
      type: "Event",
      direction: "QA",
      likes: 0,
      isLikedByUser: false,
    },
  ];
  const [filteredData, setFilteredData] = useState<Post[]>(posts);

  useEffect(() => {
    const filterPosts = () => {
      let filtered = [...posts];

      if (filters.type !== "All") {
        filtered = filtered.filter((post) => post.type === filters.type);
      }

      if (filters.direction !== "All") {
        filtered = filtered.filter(
          (post) => post.direction === filters.direction
        );
      }

      setFilteredData(filtered);
    };

    filterPosts();
  }, [filters]);

  return (
    <Flex direction="column" py={32} mih="94vh">
      <FilterSection filters={filters} setFilters={setFilters} />
      {filteredData.length === 0 && (
        <Center>
          <Text>Постов не найдено!</Text>
        </Center>
      )}
      {filteredData.length > 0 && (
        <Flex direction="column" gap={16}>
          {filteredData.map((post) => (
            <PostTemplate key={post.id} post={post} />
          ))}
        </Flex>
      )}
    </Flex>
  );
}
