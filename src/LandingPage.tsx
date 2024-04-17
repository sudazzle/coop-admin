import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';

export const LandingPage = () => {
  const { isAuthenticated, loginWithPopup } = useAuth0();

  if (isAuthenticated) {
    return <Navigate to="/stores" />;
  }

  return (
    <Flex bg="teal" height="100vh" alignItems="center" justifyContent="center">
      <Box
        p={8}
        rounded="md"
        shadow="xl"
        bg="white"
        minWidth="sm">
        <VStack spacing={4}>
          <Text fontSize="2xl" fontWeight="bold">Coop Admin</Text>
          <Text>Welcome to the store management portal!</Text>
          <Button colorScheme="blue" onClick={() => loginWithPopup()}>Login</Button>
        </VStack>
      </Box>
    </Flex>
  )
}
