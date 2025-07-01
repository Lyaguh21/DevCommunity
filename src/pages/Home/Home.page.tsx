import { Center, Flex, LoadingOverlay, Text } from "@mantine/core";
import FilterSection from "./components/FilterSection";
import PostTemplate from "./components/PostTemplate";
import { useState, useEffect } from "react";
import { Post } from "../../entities/post/Post.interface";
import axios from "axios";
import { API } from "../../app/helpers";
import { notifications } from "@mantine/notifications";

export default function Home() {
  const [originalData, setOriginalData] = useState<Post[]>([]);
  const [filteredData, setFilteredData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: "All",
    direction: "All",
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API}/posts`, {
        withCredentials: true,
      })
      .then((res) => {
        setOriginalData(res.data);
        setFilteredData(res.data);
      })
      .catch(() => {
        notifications.show({
          title: "Ошибка",
          message: "Не удалось загрузить посты",
          color: "red",
        });
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filterPosts = () => {
      let filtered = [...originalData];

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
  }, [filters, originalData]);

  return (
    <Flex direction="column" py={16} mih="94vh">
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 1 }}
      />
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
