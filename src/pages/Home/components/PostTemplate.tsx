import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { Post } from "../../../interfaces/Post.interface";
import classes from "../classes/Home.module.css";
import { Roles } from "../../../interfaces/Role";
import { Heart, Point } from "tabler-icons-react";
import TypeAndDirection from "./TypeAndDirection";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function PostTemplate({ post }: { post: Post }) {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(post.isLikedByUser);

  const handleLike = async () => {
    try {
      const newLikeStatus = !isLiked;
      setIsLiked(newLikeStatus);
      setLikes(newLikeStatus ? likes + 1 : likes - 1);

      // Отправка запроса на сервер
      // await api.likePost(post.id);

      // Если нужно, можно обновить состояние из ответа сервера
      // const updatedPost = await api.getPost(post.id);
      // setLikes(updatedPost.likes);
      // setIsLiked(updatedPost.isLikedByUser);
    } catch (error) {
      // Откат изменений при ошибке
      setIsLiked(isLiked);
      setLikes(likes);
      console.error("Лайк не поставился", error);
    }
  };

  return (
    <Box w={"100%"} bg="white" className={classes.shadow} p={24}>
      <Flex justify="space-between">
        <Flex gap={6}>
          <Avatar
            src={post.author.avatar}
            alt={post.author.nickname}
            color="#4f46e5"
            h={40}
            w={40}
          >
            {post.author.nickname[0]}
          </Avatar>
          <Box>
            <Text lh="20px" fz={16} fw={600}>
              {post.author.name} {post.author.surname}
            </Text>
            <Text c="#6B7280" fz={14} lh="20px" component="div">
              <Flex align="center">
                {post.author.nickname}
                <Point fill="#6B7280" stroke="#6B7280" size={16} />
                {Roles.find((role) => post.author.role == role.value)?.label}
              </Flex>
            </Text>
          </Box>
        </Flex>

        <TypeAndDirection type={post.type} direction={post.direction} />
      </Flex>

      <Text fz={20} fw={700} my={16}>
        {post.title}
      </Text>

      {post.previewImage && (
        <Image src={post.previewImage} h={400} w="auto" mb={16} />
      )}

      <Text c="#374151" lineClamp={3} component="div">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </Text>

      <Flex align="center" justify="space-between" mt={8}>
        <Flex>
          <UnstyledButton variant="subtle" c="#4f46e5" p={0} fw={500}>
            Развернуть
          </UnstyledButton>
        </Flex>

        <Flex gap={8} align="center">
          <Heart
            color={!isLiked ? "#374151" : "#ed093f"}
            fill={!isLiked ? "none" : "#ed093f"}
            onClick={handleLike}
          />
          <Text c="#374151" fz={16}>
            {likes}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
