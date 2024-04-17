import { Table, Thead, Tbody, Tr, Th, Td, Spinner, Center, Heading, Flex, Button, useToast } from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteStore, getStores } from '../api-client/stores';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const baseManageUrl = '/stores/manage';

export const StoreList = () => {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  
  const { data, isLoading } = useQuery({
    queryKey: ['stores'],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return getStores(token);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return deleteStore(id, await getAccessTokenSilently());
    },
    onSuccess: async () => {
      toast({
        title: 'Store deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      await queryClient.invalidateQueries({
        queryKey: ['stores'],
      });
    },

    onError: (error) => {
      toast({
        title: 'An error occurred',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  });

  if (isLoading) {
    return (
      <Center>
        <Spinner />;
      </Center>
    )
  }

  return (
    <>
      <Flex justifyContent="space-between" my="4">
        <Heading fontSize="xx-large">Stores</Heading>
        <Button colorScheme="blue" onClick={() => navigate(baseManageUrl)}>Create</Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Address</Th>
            <Th>Phone</Th>
            <Th>Email</Th>
            <Th>City</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.stores.map((store) => (
            <Tr
              _hover={{ bg: 'gray.50' }}
              transition="all ease-in-out .5s"
              cursor="pointer"
              onClick={() => navigate(`${baseManageUrl}/${store.id}`)}
              key={store.id}
            >
              <Td>{store.name}</Td>
              <Td>{store.address}</Td>
              <Td>{store.phone}</Td>
              <Td>{store.email}</Td>
              <Td>{store.city}</Td>
              <Td textAlign="right">
                <IconButton
                  colorScheme="red"
                  aria-label="delete store"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    deleteMutation.mutate(store.id)
                  }}
                  icon={<DeleteIcon />}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};
