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

export default function PostTemplate({ post }: { post: Post }) {
  const [likes, setLikes] = useState(post.likes);

  return (
    <Box w={"100%"} bg="white" className={classes.shadow} key={post.id} p={24}>
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
            <Text c="#6B7280" fz={14} lh="20px">
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

      <Text c="#374151" lineClamp={3}>
        {post.content}
      </Text>

      <Flex align="center" justify="space-between" mt={8}>
        <Flex>
          {post.content.length > 300 && (
            <UnstyledButton variant="subtle" c="#4f46e5" p={0} fw={500}>
              Развернуть
            </UnstyledButton>
          )}
        </Flex>

        <Flex gap={8} align="center">
          <Heart color="#374151" />
          <Text c="#374151" fz={16}>
            {likes}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
