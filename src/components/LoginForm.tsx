import { users } from "../utils/users";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/app.store";
import {
  Button,
  TextInput,
  PasswordInput,
  Box,
  Paper,
  Title,
  Container,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) =>
        value.trim().length > 0 ? null : "Username is required",
      password: (value) =>
        value.length >= 4 ? null : "Password must be at least 4 characters",
    },
  });

  const handleSubmit = (values: { username: string; password: string }) => {
    const user = users.find(
      (u) => u.username === values.username && u.password === values.password
    );

    if (user) {
      login({ name: values?.username });
      navigate("/dragons");
    } else {
      alert("Invalid credentials");
    }
  };

  return (

      <Paper
        shadow="lg"
        p="xl"
        radius="lg"
        withBorder
        sx={{
          width: "100%",
          maxWidth: 420,
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Title
          order={2}
          align="center"
          variant="gradient"
          gradient={{ from: "cyan", to: "lime", deg: 45 }}
          mb="sm"
        >
          Welcome Back 🚀
        </Title>
        <Text align="center" color="gray" mb="lg" size="sm">
          Please login to explore SpaceX Dragons
        </Text>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            withAsterisk
            label="Username"
            placeholder="your username"
            {...form.getInputProps("username")}
            radius="md"
            mb="md"
            labelProps={{ style: { color: "white" } }} 
          />

          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="Your password"
            {...form.getInputProps("password")}
            radius="md"
            mb="md"
          />

          <Button
            type="submit"
            variant="gradient"
            gradient={{ from: "teal", to: "lime", deg: 60 }}
            fullWidth
            radius="xl"
            mt="md"
            size="md"
          >
            Login
          </Button>
        </form>
      </Paper>
    
  );
};

export default Login;
