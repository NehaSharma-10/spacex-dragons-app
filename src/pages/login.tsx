import { users } from "../utils/users";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/app.store";
import { Button, TextInput, PasswordInput, Box, Paper, Title } from "@mantine/core";
import { useForm } from "@mantine/form";

const LoginPage = () => {
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
      login({name:values?.username});
      navigate("/dragons");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Box  display="flex" py={20} style={{justifyContent:"center"}}>
    <Paper shadow="md" p="xl" radius="md" withBorder maw={400} w="100%">
      <Title order={2} mb="lg" ta="center">
        Login
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Username"
          placeholder="your username"
          {...form.getInputProps('username')}
          radius="md"
          styles={{
            input: { borderRadius: "4px !important" },
          }}
          mb="md"
        />

        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="Your password"
          {...form.getInputProps('password')}
          radius="sm"
          mb="md"
        />

        <Button type="submit" variant="filled" fullWidth mt="sm" radius="sm">
          Login
        </Button>
      </form>
    </Paper>
  </Box>
  );
};

export default LoginPage;
