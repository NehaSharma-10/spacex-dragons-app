import { FC } from "react";
import { Container } from "@mantine/core";
import LoginPage from "../login";
import Header from "../../components/Header";
import DragonCards from "../../components/DragonCard";

const Landing: FC = () => {
  const demoProps = {
    bg: "var(--mantine-color-blue-light)",
    h: 50,
    mt: "md",
  };
  return (
    <>
      <Container pt={50}>
        <LoginPage />
		{/* <DragonCards /> */}
      </Container>
    </>
  );
};

export default Landing;
