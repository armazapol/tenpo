// components/Layout.js
import { Box, Flex, Heading, Button, Spacer } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box>
      <Flex p={4} bg="teal" color="white">
        <Heading size="md">Bienvenido, Tenpo</Heading>
        <Spacer />
        <Button
          variant="outline"
          color="white"
          borderColor="white"
          _hover={{ bg: "teal.600" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Flex>
      <Box p={4}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
