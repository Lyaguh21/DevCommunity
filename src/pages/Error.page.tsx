import { Button, Center, Flex, Text } from "@mantine/core";
import { Link } from "react-router";

export default function Error() {
  return (
    <Center h="100vh">
      <Flex direction="column">
        <Text
          style={{ fontSize: "80px" }}
          fw={900}
          variant="gradient"
          gradient={{ from: "cyan", to: "red", deg: 77 }}
        >
          ERROR 404
        </Text>
        <Center>
          <Link to="/">
            <Button variant="outline" color="white">
              Вернуться на главную
            </Button>
          </Link>
        </Center>
      </Flex>
    </Center>
  );
}
