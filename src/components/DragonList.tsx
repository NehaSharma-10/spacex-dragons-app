import { Link } from "react-router-dom";
import { Dragon } from "../utils/types";
import {
  Table,
  Button,
  Center,
  Text,
  Card,
  Group,
  Badge,
  Stack,
  Image,
  ScrollArea,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

type DragonListProps = {
  dragons: Dragon[];
};

const DragonList = ({ dragons }: DragonListProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (dragons.length === 0) {
    return (
      <Center mt="md">
        <Text>No dragons found.</Text>
      </Center>
    );
  }

  if (isMobile) {

    return (
      <Stack spacing="md" mt="md" bg='transparent'>
        {dragons.map((dragon) => (
          <Card key={dragon.id} withBorder shadow="sm">
            {dragon.flickr_images && dragon.flickr_images.length > 0 && (
              <Card.Section>
                <Image
                  src={dragon.flickr_images[0]}
                  alt={dragon.name}
                  height={160}
                  withPlaceholder
                />
              </Card.Section>
            )}

            <Group position="apart" mt="sm">
              <Text weight={500}>{dragon.name}</Text>
              <Badge color={dragon.active ? "green" : "red"}>
                {dragon.active ? "Active" : "Inactive"}
              </Badge>
            </Group>

            <Text size="sm" mt="xs">First Flight: {dragon.first_flight}</Text>
            <Text size="sm">Crew Capacity: {dragon.crew_capacity}</Text>

            <Button
              component={Link}
              to={`/dragon/${dragon.id}`}
              size="xs"
              mt="sm"
              variant="light"
              fullWidth
            >
              Know More
            </Button>
          </Card>
        ))}
      </Stack>
    );
  }


  return (
    <ScrollArea>
      <Table  highlightOnHover withBorder mt="50px" miw={700}>
        <thead>
          <tr >
            <th>Image</th> 
            <th>Name</th>
            <th>First Flight</th>
            <th>Crew Capacity</th>
            <th>Status</th>
            <th>Links</th>
          </tr>
        </thead>
        <tbody>
          {dragons.map((dragon) => (
            <tr key={dragon.id}>
              <td>
                {dragon.flickr_images && dragon.flickr_images.length > 0 ? (
                  <Image
                    src={dragon.flickr_images[0]}
                    alt={dragon.name}
                    height={60}
                    width={80}
                    radius="sm"
                    fit="cover"
                    withPlaceholder
                  />
                ) : (
                  <Text size="xs" color="dimmed">
                    No image
                  </Text>
                )}
              </td>
              <td>{dragon.name}</td>
              <td>{dragon.first_flight}</td>
              <td>{dragon.crew_capacity}</td>
              <td style={{ color: dragon.active ? "green" : "red" }}>
                {dragon.active ? "Active" : "Inactive"}
              </td>
              <td>
                <Button
                  component={Link}
                  to={`/dragon/${dragon.id}`}
                  size="xs"
                  variant="light"
                >
                  Know More
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  );
};

export default DragonList;
