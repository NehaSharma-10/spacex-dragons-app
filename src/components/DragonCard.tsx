import { useQuery } from "@tanstack/react-query";
import {
  Card,
  Image,
  Text,
  Button,
  Group,    
  Badge,
  Loader,
  SimpleGrid,
  Center,
} from "@mantine/core";
import { Link } from "react-router-dom";

interface Thruster {
  type: string;
  amount: number;
  pods: number;
  fuel_1: string;
  fuel_2: string;
  isp: number;
  thrust: {
    kN: number;
    lbf: number;
  };
}

interface Dragon {
  id: string;
  name: string;
  description: string;
  active: boolean;
  flickr_images: string[];
  wikipedia: string;
  crew_capacity: number;
  first_flight: string;
  thrusters: Thruster[];
}

const fetchDragons = async (): Promise<Dragon[]> => {
  const response = await fetch("https://api.spacexdata.com/v4/dragons");
  if (!response.ok) {
    throw new Error("Failed to fetch dragons");
  }
  return response.json();
};

function DragonCards() {
  const {
    data: dragons,
    isLoading,
    isError,
  } = useQuery<Dragon[]>({
    queryKey: ["dragons"],
    queryFn: fetchDragons,
  });

  console.log(dragons);
  if (isLoading) {
    return (
      <Center>
        <Loader size="lg" />
      </Center>
    );
  }

  if (isError) {
    return <Text color="red">Error loading dragons.</Text>;
  }

  return (
    <SimpleGrid cols={2} spacing="lg">
      {dragons!.map((dragon) => (
        <Card shadow="sm" padding="lg" radius="md" withBorder key={dragon.id}>
          <Card.Section>
            <Image
              src={dragon.flickr_images[0]}
              height={160}
              alt={dragon.name}
            />
          </Card.Section>

          <Group position="apart" mt="md" mb="xs">
            <Text fw={500}>{dragon.name}</Text>
            <Badge color={dragon.active ? "green" : "red"}>
              {dragon.active ? "Active" : "Inactive"}
            </Badge>
          </Group>

          <Text size="sm" color="dimmed" lineClamp={3}>
            {dragon.description}
          </Text>

          <Button
            variant="light"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            component={Link}
            to={`/dragon/${dragon.id}`}
          >
            Learn More
          </Button>
        </Card>
      ))}
    </SimpleGrid>
  );
}

export default DragonCards;
