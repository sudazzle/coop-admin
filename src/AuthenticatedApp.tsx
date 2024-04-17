import { Outlet, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Navbar } from './Navbar';
import { Box } from '@chakra-ui/react';

export const AuthenticatedApp = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return (
    <>
      <Navbar />
      <Box p="3">
        <Outlet />
      </Box>
    </>
  );
}
