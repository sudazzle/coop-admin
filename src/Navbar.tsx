import {
  Box,
  Flex,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import { ChevronDownIcon } from '@chakra-ui/icons';
import { useAuth0 } from '@auth0/auth0-react';

export const Navbar = () => {
  const { logout } = useAuth0();

  return (
    <Flex bg="blue.500" p={4} alignItems="center" justifyContent="space-between">
      <Text color="white" fontSize="lg" fontWeight="bold">Coop Admin</Text>
      <Box>
        <ColorModeSwitcher />
        <Menu>
          <MenuButton variant="ghost" ml="2" as={IconButton} icon={<Avatar size="sm" />}>
            <ChevronDownIcon />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
}
