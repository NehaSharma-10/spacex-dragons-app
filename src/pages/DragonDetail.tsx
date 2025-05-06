import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchDragonById } from "../services/api";
import { Dragon } from "../utils/types";
import {
  Container,
  Title,
  Text,
  Image,
  SimpleGrid,
  Grid,
  Card,
  Badge,
  Group,
  List,
  Divider,
  Button,
  Center,
  Loader,
} from "@mantine/core";
import { Carousel } from '@mantine/carousel';

const DragonDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: dragon, isLoading, error } = useQuery<Dragon>({
    queryKey: ["dragon", id],
    queryFn: () => fetchDragonById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );
  }

  if (error || !dragon) {
    return (
      <Center h="100vh">
        <Text color="red">Error loading dragon details.</Text>
      </Center>
    );
  }

  return (
    <Container size="lg" py="xl">
        
        <Button component={Link} to="/dragons" variant="outline">
          Back to Dragons
        </Button>
     
      <Title align="center" mb="md">{dragon.name}</Title>

      <Center mb="md">
        <Badge color={dragon.active ? "green" : "red"}>{dragon.active ? "Active" : "Inactive"}</Badge>
      </Center>
      {/* <Carousel withIndicators height={200}>
        {dragon.flickr_images.map((url, index) => (
          <Carousel.Slide key={index}>
            <Image src={url} alt={`${dragon.name} image ${index + 1}`} radius="md" />
          </Carousel.Slide>
        ))}
      </Carousel> */}
      <Carousel withIndicators height={300} slideSize="50%" slideGap="md" loop>
  {dragon.flickr_images.map((url, index) => (
    <Carousel.Slide key={index}>
      <Image src={url} alt={`${dragon.name} image ${index + 1}`} radius="md" />
    </Carousel.Slide>
  ))}
</Carousel>
         {/* <SimpleGrid cols={2} spacing="sm">
        {dragon.flickr_images.map((url, index) => (
          <Image key={index} src={url} alt={`${dragon.name} image ${index + 1}`} radius="md" />
        ))}
      </SimpleGrid> */}
      <Card shadow="md" padding="lg" mt="xl">
        <Title order={3}>Description</Title>
        <Text>{dragon.description}</Text>
        <Text mt="sm">
          First flight: <b>{dragon.first_flight}</b>
        </Text>
        <Text>
          Wikipedia:{" "}
          <a href={dragon.wikipedia} target="_blank" rel="noopener noreferrer">
            {dragon.wikipedia}
          </a>
        </Text>
      </Card>

      <Divider my="xl" />

      <Grid>
        <Grid.Col span={6}>
          <Card shadow="sm" padding="md">
            <Title order={4}>Heat Shield</Title>
            <List spacing="xs">
              <List.Item>Material: {dragon.heat_shield.material}</List.Item>
              <List.Item>Size: {dragon.heat_shield.size_meters} meters</List.Item>
              <List.Item>Max Temp: {dragon.heat_shield.temp_degrees}°C</List.Item>
              <List.Item>Partner: {dragon.heat_shield.dev_partner}</List.Item>
            </List>
          </Card>
        </Grid.Col>

        <Grid.Col span={6}>
          <Card shadow="sm" padding="md">
            <Title order={4}>Dimensions</Title>
            <List spacing="xs">
              <List.Item>Height (with trunk): {dragon.height_w_trunk.meters} m</List.Item>
              <List.Item>Diameter: {dragon.diameter.meters} m</List.Item>
              <List.Item>Sidewall Angle: {dragon.sidewall_angle_deg}°</List.Item>
              <List.Item>Orbit Duration: {dragon.orbit_duration_yr} years</List.Item>
              <List.Item>Dry Mass: {dragon.dry_mass_kg} kg</List.Item>
            </List>
          </Card>
        </Grid.Col>

        <Grid.Col span={6}>
          <Card shadow="sm" padding="md">
            <Title order={4}>Launch Payload</Title>
            <List spacing="xs">
              <List.Item>Mass: {dragon.launch_payload_mass.kg} kg</List.Item>
              <List.Item>Volume: {dragon.launch_payload_vol.cubic_meters} m³</List.Item>
            </List>
            
            <Title order={4} mt="md">Return Payload</Title>
            <List spacing="xs">
              <List.Item>Mass: {dragon.return_payload_mass.kg} kg</List.Item>
              <List.Item>Volume: {dragon.return_payload_vol.cubic_meters} m³</List.Item>
            </List>
          </Card>
        </Grid.Col>

        <Grid.Col span={6}>
          <Card shadow="sm" padding="md">
            <Title order={4}>Trunk</Title>
            <List spacing="xs">
              <List.Item>Volume: {dragon.trunk.trunk_volume.cubic_meters} m³</List.Item>
              <List.Item>Solar Arrays: {dragon.trunk.cargo.solar_array}</List.Item>
              <List.Item>Unpressurized Cargo: {dragon.trunk.cargo.unpressurized_cargo ? "Yes" : "No"}</List.Item>
            </List>
          </Card>
        </Grid.Col>

        <Grid.Col span={12}>
          <Card shadow="sm" padding="md">
            <Title order={4}>Thrusters</Title>
            <List spacing="xs">
              {dragon.thrusters.map((thruster, idx) => (
                <List.Item key={idx}>
                  <b>{thruster.type}</b> - Amount: {thruster.amount}, Pods: {thruster.pods}, ISP: {thruster.isp}, Thrust: {thruster.thrust.kN} kN
                </List.Item>
              ))}
            </List>
          </Card>
        </Grid.Col>
      </Grid>

      
    </Container>
  );
};

export default DragonDetailPage;
