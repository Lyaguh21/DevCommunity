import { Box, Button, Flex, Select, Text } from "@mantine/core";
import classes from "../classes/Home.module.css";
import { Plus } from "tabler-icons-react";

export default function FilterSection({
  filters,
  setFilters,
}: {
  filters: { type: string; direction: string };
  setFilters: (updatedFilters: { type: string; direction: string }) => void;
}) {
  const TypePost = [
    { value: "All", label: "Все типы" },
    { value: "Content", label: "Контент" },
    { value: "Event", label: "Событие" },
    { value: "Vacancy", label: "Вакансия" },
  ];

  const Roles = [
    { value: "All", label: "Все направления" },
    { value: "Frontend", label: "Frontend Developer" },
    { value: "Backend", label: "Backend Developer" },
    { value: "QA", label: "QA Engineer" },
    { value: "Designer", label: "Designer" },
    { value: "Manager", label: "Manager" },
    { value: "HR", label: "HR" },
  ];

  const handleTypeChange = (value: string | null) => {
    if (value !== null) {
      setFilters({ ...filters, type: value });
    }
  };

  const handleDirectionChange = (value: string | null) => {
    if (value !== null) {
      setFilters({ ...filters, direction: value });
    }
  };

  return (
    <Flex
      w="100%"
      bg="white"
      mb={32}
      p={24}
      justify="space-between"
      align="center"
      className={classes.shadow}
    >
      <Flex gap={16} wrap={{ base: "wrap", md: "nowrap" }}>
        <Flex align="center" gap={8}>
          <Text fw={500} fz={14} c={"#374151"} visibleFrom="md">
            Тип поста:
          </Text>
          <Select
            allowDeselect={false}
            data={TypePost}
            value={filters.type}
            onChange={handleTypeChange}
          />
        </Flex>

        <Flex align="center" gap={8}>
          <Text fw={500} fz={14} c={"#374151"} visibleFrom="md">
            Направление:
          </Text>
          <Select
            allowDeselect={false}
            data={Roles}
            value={filters.direction}
            onChange={handleDirectionChange}
          />
        </Flex>
      </Flex>

      <Button bg="#4f46e5" visibleFrom="sm">
        <Flex align="center" gap={4}>
          <Plus size={16} />
          <Text>Создать</Text>
        </Flex>
      </Button>

      <Box size={36} w={36} style={{ alignSelf: "flex-start" }} hiddenFrom="sm">
        <Button bg="#4f46e5" px={6}>
          <Plus />
        </Button>
      </Box>
    </Flex>
  );
}
