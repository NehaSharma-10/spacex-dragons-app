import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDragons } from "../services/api";
import { Dragon } from "../utils/types";
import { Container, Loader, Center, Title, Text, TextInput, Button, Select, Flex } from "@mantine/core";
import { debounce } from "lodash";
import DragonList from "../components/DragonList";

const DragonPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSort, setSelectedSort] = useState("name");
  const [dragonType, setDragonType] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");

  const { data: dragons, isLoading, error } = useQuery<Dragon[]>({
    queryKey: ["dragons"],
    queryFn: fetchDragons,
  });

  const debouncedSearch = useMemo(() => debounce((term: string) => setSearchTerm(term), 500), []);

  const filteredDragons = useMemo(() => {
    return dragons?.filter((dragon) => {
      const matchesSearchTerm = dragon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesActiveStatus =
        activeStatus === "all" ? true :
        activeStatus === "active" ? dragon.active :
        !dragon.active;
      const matchesDragonType = dragonType ? dragon.type.toLowerCase().includes(dragonType.toLowerCase()) : true;
      return matchesSearchTerm && matchesActiveStatus && matchesDragonType;
    });
  }, [dragons, searchTerm, activeStatus, dragonType]);

  const sortedDragons = useMemo(() => {
    if (!filteredDragons) return [];
    switch (selectedSort) {
      case "name":
        return filteredDragons.sort((a, b) => a.name.localeCompare(b.name));
      case "first_flight":
        return filteredDragons.sort((a, b) => {
          if (!a.first_flight || !b.first_flight) return 0;
          return new Date(a.first_flight).getTime() - new Date(b.first_flight).getTime();
        });
      case "active":
        return filteredDragons.sort((a, b) => Number(b.active) - Number(a.active));
      default:
        return filteredDragons;
    }
  }, [filteredDragons, selectedSort]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setDragonType("");
    setSelectedSort("name");
    setActiveStatus("all");
  };

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red">Error loading dragons.</Text>
      </Center>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Title order={4} align="center" mb="xl" fw="semibold">
        All Dragons Overview
      </Title>

      <Flex
        direction={{ base: "column", sm: "column", md: "row" }} 
        wrap="wrap"
        gap="md"
        mb="xl"
        justify="flex-start" 
        align="center"
      >
        <TextInput
          label="Search Dragons"
          placeholder="Search by dragon name"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ flex: 1, minWidth: "200px" }}
        />

        <Select
          label="Active Status"
          value={activeStatus}
          onChange={(value) => setActiveStatus(value!)}
          data={[
            { value: "all", label: "All" },
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
          style={{ flex: 1, minWidth: "150px" }}
        />

        <TextInput
          label="Dragon Type"
          placeholder="Filter by dragon type"
          value={dragonType}
          onChange={(event) => setDragonType(event.target.value)}
          style={{ flex: 1, minWidth: "200px" }}
        />

        <Select
          label="Sort By"
          value={selectedSort}
          onChange={(value) => setSelectedSort(value!)}
          data={[
            { value: "name", label: "Name" },
            { value: "first_flight", label: "First Flight" },
            { value: "active", label: "Active Status" },
          ]}
          style={{ flex: 1, minWidth: "150px" }}
        />

        <Button
          variant="outline"
          onClick={resetFilters}
          color="gray"
          style={{ minWidth: "150px", marginTop: "10px" }}
        >
          Reset Filters
        </Button>
      </Flex>

      {sortedDragons && sortedDragons.length > 0 ? (
        <DragonList dragons={sortedDragons} />
      ) : (
        <Center mt="md">
          <Text>No dragons found.</Text>
        </Center>
      )}
    </Container>
  );
};

export default DragonPage;
