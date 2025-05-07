import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchDragonById } from "../services/api";
import { Dragon } from "../utils/types";
import {
  Container,
  Title,
  Text,
  Image,
  Card,
  Badge,
  List,
  Divider,
  Button,
  Center,
  Loader,
  Tabs,
  Flex,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";

const DragonDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: dragon,
    isLoading,
    error,
  } = useQuery<Dragon>({
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
    <Container size="md" px="md" py="xl">
      <Flex mb="md" justify="space-between" align="center">
        <Title align="center" mb="md" mt={10} color="white">
          {dragon.name}
        </Title>
        <Badge  color={dragon.active ? "green" : "red"} style={{padding:'4px'}} size="sm">
          {dragon.active ? "Active" : "Inactive"}
        </Badge>
      </Flex>

      <Carousel
        withIndicators
        height={300}
        slideSize="50%"
        slideGap="md"
        loop
        breakpoints={[
          { maxWidth: "md", slideSize: "70%" },
          { maxWidth: "sm", slideSize: "100%" },
        ]}
      >
        {dragon.flickr_images.map((url, index) => (
          <Carousel.Slide key={index}>
            <Image
              src={url}
              alt={`${dragon.name} image ${index + 1}`}
              radius="md"
              fit="contain"
              width="100%"
            />
          </Carousel.Slide>
        ))}
      </Carousel>

      <Card shadow="sm" padding="md" mt="xl" withBorder >
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

      <Tabs
        defaultValue="heat-shield"
        variant="pills"
        radius="xs"
        color="white"
        mt={30}
        styles={(theme) => ({
          list: {
            display: "flex",
            flexWrap: "wrap",

            gap: theme.spacing.xs,
          },
          tab: {
            flex: 1,
            minWidth: 120,
            textAlign: "center",
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: "#f2f2f2",

            [`@media (max-width: ${theme.breakpoints.sm})`]: {
              flex: "unset",
              minWidth: "auto",
              fontSize: theme.fontSizes.sm,
              paddingInline: theme.spacing.xs,
            },
          },
        })}
      >
        <Tabs.List >
          <Tabs.Tab  value="heat-shield">Heat Shield</Tabs.Tab>
          <Tabs.Tab value="dimensions">Dimensions</Tabs.Tab>
          <Tabs.Tab value="payload">Payload</Tabs.Tab>
          <Tabs.Tab value="trunk">Trunk</Tabs.Tab>
          <Tabs.Tab value="thrusters">Thrusters</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="heat-shield">
          <Title order={4} mt="md" color="white">
            Heat Shield
          </Title>
          <List spacing="xs" mt="sm" style={{color:'white'}}>
            <List.Item>Material: {dragon.heat_shield.material}</List.Item>
            <List.Item>Size: {dragon.heat_shield.size_meters} meters</List.Item>
            <List.Item>Max Temp: {dragon.heat_shield.temp_degrees}°C</List.Item>
            <List.Item>Partner: {dragon.heat_shield.dev_partner}</List.Item>
          </List>
        </Tabs.Panel>

        <Tabs.Panel value="dimensions">
          <Title order={4} mt="md" color="white">
            Dimensions
          </Title>
          <List spacing="xs" mt="sm" style={{color:'white'}}>
            <List.Item>Height: {dragon.height_w_trunk.meters} m</List.Item>
            <List.Item>Diameter: {dragon.diameter.meters} m</List.Item>
            <List.Item>Sidewall Angle: {dragon.sidewall_angle_deg}°</List.Item>
            <List.Item>
              Orbit Duration: {dragon.orbit_duration_yr} years
            </List.Item>
            <List.Item>Dry Mass: {dragon.dry_mass_kg} kg</List.Item>
          </List>
        </Tabs.Panel>

        <Tabs.Panel value="payload">
          <Title order={4} mt="md" color="white">
            Launch Payload
          </Title>
          <List spacing="xs" mt="sm" style={{color:'white'}}>
            <List.Item>Mass: {dragon.launch_payload_mass.kg} kg</List.Item>
            <List.Item>
              Volume: {dragon.launch_payload_vol.cubic_meters} m³
            </List.Item>
          </List>
          <Title order={4} mt="md" color="white">
            Return Payload
          </Title>
          <List spacing="xs" style={{color:'white'}}>
            <List.Item>Mass: {dragon.return_payload_mass.kg} kg</List.Item>
            <List.Item>
              Volume: {dragon.return_payload_vol.cubic_meters} m³
            </List.Item>
          </List>
        </Tabs.Panel>

        <Tabs.Panel value="trunk">
          <Title order={4} mt="md" color="white">
            Trunk
          </Title>
          <List spacing="xs" mt="sm" style={{color:'white'}}>
            <List.Item>
              Volume: {dragon.trunk.trunk_volume.cubic_meters} m³
            </List.Item>
            <List.Item>
              Solar Arrays: {dragon.trunk.cargo.solar_array}
            </List.Item>
            <List.Item>
              Unpressurized Cargo:{" "}
              {dragon.trunk.cargo.unpressurized_cargo ? "Yes" : "No"}
            </List.Item>
          </List>
        </Tabs.Panel>

        <Tabs.Panel value="thrusters">
          <Title order={4} mt="md" color="white">
            Thrusters
          </Title>
          <List spacing="xs" mt="sm" style={{color:'white'}}>
            {dragon.thrusters.map((thruster, idx) => (
              <List.Item key={idx}>
                <b>{thruster.type}</b> - Amount: {thruster.amount}, Pods:{" "}
                {thruster.pods}, ISP: {thruster.isp}, Thrust:{" "}
                {thruster.thrust.kN} kN
              </List.Item>
            ))}
          </List>
        </Tabs.Panel>
      </Tabs>
      <Button component={Link} to="/dragons" variant="outline" my={30}>
        All Dragons
      </Button>
    </Container>
  );
};

export default DragonDetailPage;
