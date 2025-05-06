// components/DragonList.tsx
import { Link } from "react-router-dom";
import { Dragon } from "../utils/types";
import { Table, Button, Center, Text } from "@mantine/core";

type DragonListProps = {
  dragons: Dragon[];
};

const DragonList = ({ dragons }: DragonListProps) => {
  if (dragons.length === 0) {
    return (
      <Center mt="md">
        <Text>No dragons found.</Text>
      </Center>
    );
  }

  return (
    <Table striped highlightOnHover withBorder mt="50px">
      <thead>
        <tr>
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
                target="_blank"
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
  );
};

export default DragonList;
