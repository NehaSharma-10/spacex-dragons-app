import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Image, Text, Title, Badge, List, Loader, Center, Button, Group, Container } from '@mantine/core';

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

const fetchDragonById = async (id: string): Promise<Dragon> => {
  const response = await fetch(`https://api.spacexdata.com/v4/dragons/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch dragon details');
  }
  return response.json();
};

function DragonDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: dragon, isLoading, isError } = useQuery<Dragon>({
    queryKey: ['dragon', id],
    queryFn: () => fetchDragonById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <Center><Loader size="lg" /></Center>;
  }

  if (isError || !dragon) {
    return <Text color="red">Error loading dragon details.</Text>;
  }

  return (
    <Container>
        <Card shadow="md" padding="lg" radius="md" withBorder>
      <Group position="apart" mb="md">
        <Title order={2}>{dragon.name}</Title>
        <Button variant="outline" color="gray" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Group>

      <Badge color={dragon.active ? 'green' : 'red'} mb="md">
        {dragon.active ? 'Active' : 'Inactive'}
      </Badge>

      <Image src={dragon.flickr_images[0]} height={300} alt={dragon.name} withPlaceholder />

      <Text mt="md">{dragon.description}</Text>

      <List spacing="xs" mt="lg">
        <List.Item><b>First Flight:</b> {dragon.first_flight}</List.Item>
        <List.Item><b>Crew Capacity:</b> {dragon.crew_capacity}</List.Item>
        <List.Item>
          <b>Thrusters:</b>
          <List spacing="xs" ml="md">
            {dragon.thrusters.map((thruster, idx) => (
              <List.Item key={idx}>
                <b>{thruster.type}</b> → {thruster.amount}x pods, Fuel: {thruster.fuel_1} + {thruster.fuel_2}, ISP: {thruster.isp}, Thrust: {thruster.thrust.kN} kN
              </List.Item>
            ))}
          </List>
        </List.Item>
      </List>

      <Button
        component="a"
        href={dragon.wikipedia}
        target="_blank"
        mt="xl"
        fullWidth
      >
        View on Wikipedia
      </Button>
    </Card>
    </Container>
  );
}

export default DragonDetail;
