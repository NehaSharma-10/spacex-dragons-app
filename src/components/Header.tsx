import { Box, Container, Grid, Title, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/app.store";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <>
      {isAuthenticated ? (
        <Box py={10} className="main-page-div" style={{background:"white"}}>
          <Container>
            <Grid my="auto">
              <Grid.Col span={4}>
                <Link style={{ color:"#2c5364",fontWeight:'bold', textDecoration:'none', fontSize:'20px'}}  to="/">Hi, {user?.name.toLocaleUpperCase()}</Link>
              </Grid.Col>
              <Grid.Col span={8}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  {isAuthenticated ? (
                    <Button
                      variant="outline"
                     color="white"
                     style={{color:'white'}}
                      onClick={logout}
                     bg="linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
                    >
                      Logout
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </Grid.Col>
            </Grid>
          </Container>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
