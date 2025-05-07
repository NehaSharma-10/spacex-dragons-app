import { FC } from "react";
import { Container, Title, Text, Box } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import LoginPage from "../../components/LoginForm";

const Landing: FC = () => {
  const navigate = useNavigate();

  return (
    <Box
    className="landing-page-div"
      mih="100vh"
      sx={(theme) => ({
        display: "flex",
        flexDirection: "row",
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
          flexDirection: "column",
        },
      })}
    >
      {/* Left Side */}
      <Box
        sx={(theme) => ({
          flex: 1,
          background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            width: "100%",
          },
        })}
      >
        <Container size="md">
          <Title
            order={1}
            variant="gradient"
            gradient={{ from: "teal", to: "lime", deg: 45 }}
          >
            Welcome to the SpaceX Dragons Explorer 🚀
          </Title>
          <Text align="left" size="lg" color="gray.3" mt="md" maw={500}>
            Dive into the fascinating world of SpaceX Dragon spacecrafts. Explore detailed information, mission history, and more using live data from the SpaceX API.
          </Text>
        </Container>
      </Box>

      {/* Right Side */}
      <Box
        sx={(theme) => ({
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            width: "100%",
          },
        })}
      >
        <LoginPage />
      </Box>
    </Box>
  );
};

export default Landing;
