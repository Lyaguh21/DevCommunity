import { useState } from "react";
import { NavLink, useParams } from "react-router";
import { Avatar, Box, Flex, Image, Text } from "@mantine/core";
import { ArrowLeft, Heart, Point } from "tabler-icons-react";
import classes from "./classes/Home.module.css";
import { Roles } from "../../interfaces/Role";
import TypeAndDirection from "./components/TypeAndDirection";
import { IconEdit, IconShare3, IconTrash } from "@tabler/icons-react";
import { Post } from "../../interfaces/Post.interface";
import ReactMarkdown from "react-markdown";

export default function ViewPost() {
  const { id } = useParams();
  const [post, setPost] = useState<Post>({
    id: "1",
    title: "Test",
    content:
      "# React Hooks Tips\n\n- **useState**: Split state logically\n- **useEffect**: Cleanup subscriptions\n- **useMemo**: Optimize calculations\n- **Custom Hooks**: Reuse logic (`useFetch`, `useLocalStorage`)\n\n> Pro tip: Follow Rules of Hooks!",
    author: "223",
    type: "Content",
    direction: "Frontend",
    likes: 0,
    isLikedByUser: false,
    previewImage:
      "https://avatars.mds.yandex.net/get-mpic/12476287/2a0000018da9d80e0e03876d95283b129253/orig",
  });

  //по id автора из post получаю автора
  const author = {
    id: "3",
    firstName: "Иdгорь",
    lastName: "Малышев",
    nickname: "Lgorek2280",
    role: "Frontend",
    description:
      " В zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид  В zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид Работаю в zuzu, главный тех лид",
    workplace: 'OOO "ZUZU"',
    portfolio: [],
  };

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

  const handleCopy = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Ссылка скопирована в буфер обмена!");
      })
      .catch((err) => {
        console.error("Ошибка копирования: ", err);
        // Альтернативный способ для старых браузеров
        const textArea = document.createElement("textarea");
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("Ссылка скопирована!");
      });
  };

  return (
    <Box pt={16} mih="94vh">
      <Box w={"100%"} bg="white" className={classes.shadow} p={24}>
        <Flex justify="space-between" wrap={{ base: "wrap" }} gap={8}>
          <Flex gap={6}>
            <Avatar
              src={author.avatar}
              alt={author.nickname}
              color="#4f46e5"
              h={40}
              w={40}
            >
              {author.nickname[0]}
            </Avatar>
            <Box>
              <Text lh="20px" fz={16} fw={600}>
                {author.firstName} {author.lastName}
              </Text>
              <Text c="#6B7280" fz={14} lh="20px" component="div" fw={600}>
                <Flex align="center">
                  <NavLink
                    to={`/profile/${author.id}`}
                    style={{ textDecoration: "none" }}
                    color="#4f46e5"
                  >
                    @{author.nickname}
                  </NavLink>
                  <Point fill="#6B7280" stroke="#6B7280" size={16} />
                  {Roles.find((role) => author.role == role.value)?.label}
                </Flex>
              </Text>
            </Box>
          </Flex>

          <Flex gap={8} align="center">
            <TypeAndDirection type={post.type} direction={post.direction} />
            <IconEdit size={20} style={{ cursor: "pointer" }} />
            <IconTrash size={20} style={{ cursor: "pointer" }} />
          </Flex>
        </Flex>

        <Text fz={30} fw={700} my={16}>
          {post.title}
        </Text>

        {post.previewImage && (
          <Image
            src={post.previewImage}
            h={{ base: 190, sm: 300 }}
            w={{ base: "100%", sm: "auto" }}
            mb={16}
          />
        )}

        <Text c="#374151" component="div">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </Text>

        <Flex justify="space-between" align="center">
          <Flex align="center" gap={16} mt={8}>
            <Flex gap={8} align="center">
              <Heart
                style={{ cursor: "pointer" }}
                color={!isLiked ? "#374151" : "#ed093f"}
                fill={!isLiked ? "none" : "#ed093f"}
                onClick={handleLike}
              />
              <Text c="#374151" fz={16} fw={600}>
                {likes}
              </Text>
            </Flex>
            <IconShare3
              color="#374151"
              style={{ cursor: "pointer" }}
              onClick={handleCopy}
            />
          </Flex>
          <NavLink to="/" color="black" style={{ textDecoration: "none" }}>
            <Flex align="center">
              <ArrowLeft color="black" />
              <Text fw={600} c="black">
                Назад к ленте
              </Text>
            </Flex>
          </NavLink>
        </Flex>
      </Box>
    </Box>
  );
}
