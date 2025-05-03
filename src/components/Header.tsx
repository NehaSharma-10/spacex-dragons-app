import { Box, Container, Grid, Title, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/app.store"; 

const Header = () => {
  const { isAuthenticated, logout } = useAuthStore(); 
  
  return (
    <Box
      py={10}
      bg="#1B2541"
      style={{
        flex: 1,
        backgroundColor: "#eeeee",
      }}
      className="main-page-div"
    >
      <Container>
        <Grid my="auto">
          <Grid.Col span={4}>
            <Title order={5} weight={600} color="white">
              Assignment
            </Title>
          </Grid.Col>
          <Grid.Col span={8}>
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", height: "100%" }}>
              {isAuthenticated ? (
                <Button variant="outline" color="white" onClick={logout}>
                  Logout
                </Button>
              ) : (
                <Link to="/login">
                  <Button variant="outline" color="white">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

export default Header;
