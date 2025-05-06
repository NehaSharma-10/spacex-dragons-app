import { FC } from "react";
import { Container } from "@mantine/core";
import LoginPage from "../Login";

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
      </Container>
    </>
  );
};

export default Landing;
