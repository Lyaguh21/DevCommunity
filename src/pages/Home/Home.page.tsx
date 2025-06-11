import { Center, Flex, Text } from "@mantine/core";
import FilterSection from "./components/FilterSection";
import PostTemplate from "./components/PostTemplate";
import { useState } from "react";
import { Post } from "../../interfaces/Post.interface";

export default function Home() {
  const [filters, setFilters] = useState({
    type: "All",
    direction: "All",
  });

  const posts = [
    {
      id: 1,
      title: "Test",
      content: "# Test",
      author: {
        name: "Тема",
        surname: "Иванов",
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
        name: "Тема2",
        surname: "Иванов2",
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
  ];
  const [filteredData, setFilteredData] = useState<Post[]>(posts);

  return (
    <Flex direction="column" py={32}>
      <FilterSection filters={filters} setFilters={setFilters} />
      {filteredData.length === 0 && (
        <Center>
          <Text>Постов еще нет, создайте первый!</Text>
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
