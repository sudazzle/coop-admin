import React from 'react';
import { useFormik } from 'formik';
import { Input, Button, Box, Heading, Center, Spinner, FormControl, FormLabel, Flex, Select, useToast } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

import { UpdateOrCreateStore, createStore, getStoreById, patchStore } from '../api-client/stores';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const ManageStore: React.FC = () => {
  const params = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading: isLoadingStore } = useQuery({
    queryKey: ['store', params.id],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return getStoreById(params.id!, token);
    },
    enabled: !!params.id,
  })

  const createMutation = useMutation({
    mutationFn: async (data: UpdateOrCreateStore) => {
      return createStore(data, await getAccessTokenSilently())
    },
    onSuccess: async () => {
      toast({
        title: 'Store created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      await queryClient.invalidateQueries({
        queryKey: ['stores'],
      });

      navigate('/stores');
    },

    onError: (error) => {
      toast({
        title: 'An error occurred',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (config: { id: string, data: UpdateOrCreateStore }) => {
      return patchStore(config.id, config.data, await getAccessTokenSilently())
    },
    onSuccess: async () => {
      toast({
        title: 'Store updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      await queryClient.invalidateQueries({
        queryKey: ['stores'],
      });

      navigate('/stores');
    },

    onError: (error) => {
      toast({
        title: 'An error occurred',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      id: '',
      name: '',
      city: '',
      email: '',
      phone: '',
      address: '',
      chain: '',
      chainClassName: '',
      chainId: uuidv4(),
      lat: 0,
      lng: 0,
      organizationNumber: '',
    },

    onSubmit: ({ id, ...values }) => {
      values.chainClassName = values.chain.toLowerCase();
      values.lat = parseFloat(values.lat as unknown as string);
      values.lng = parseFloat(values.lng as unknown as string);

      if (params.id) {
        updateMutation.mutate({ id: params.id, data: values });
      } else {
        createMutation.mutate(values);
      }
    },
  })

  if (data && params.id && formik.values.id !== data.id) {
    formik.setValues(data);
  }

  if (isLoadingStore) {
    return <Center><Spinner /></Center>
  }

  return (
    <Box p="5" key={data?.id}>
      <Flex justifyContent="space-between">
        <Heading mb="4" fontSize="x-large">Create Store</Heading>
        <Button variant="outline" colorScheme="blue" onClick={() => navigate('/stores')}>List Stores</Button>
      </Flex>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="name">Store Name</FormLabel>
          <Input id="name" {...formik.getFieldProps('name')} />
        </FormControl>
        <FormControl mt="5">
          <FormLabel htmlFor="lastName">City</FormLabel>
          <Input id="city" {...formik.getFieldProps('city')} />
        </FormControl>
        <FormControl mt="5">
          <FormLabel htmlFor="phone">Phone</FormLabel>
          <Input {...formik.getFieldProps('phone')} id="phone" />
        </FormControl>
        <FormControl mt="5">
          <FormLabel htmlFor="address">Address</FormLabel>
          <Input {...formik.getFieldProps('address')} id="address" />
        </FormControl>
        <FormControl mt="5">
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input {...formik.getFieldProps('email')} id="email" type="email" />
        </FormControl>
        <FormControl mt="5">
          <FormLabel htmlFor="organizationNumber">Organization Number</FormLabel>
          <Input {...formik.getFieldProps('organizationNumber')} id="organizationNumber" />
        </FormControl>
        <FormControl mt="5">
          <FormLabel htmlFor="chain">Chain</FormLabel>
          <Select id="chain" {...formik.getFieldProps('chain')} placeholder="Select chain">
            <option value="Coop">Coop</option>
            <option value="Obs">Obs</option>
            <option value="ObsBygg">ObsBygg</option>
            <option value="Extra">Extra</option>
          </Select>
        </FormControl>
        <FormControl mt="5">
          <Heading mb="2" fontSize="md">Coordinates</Heading>
          <Flex gap="5">
            <Box>
              <FormLabel htmlFor="lat">Latitude</FormLabel>
              <Input {...formik.getFieldProps('lat')} id="lat" />
            </Box>
            <Box>
              <FormLabel htmlFor="lng">Longitude</FormLabel>
              <Input {...formik.getFieldProps('lng')} id="lng" />
            </Box>
          </Flex>
        </FormControl>
        <Flex justifyContent="right">
          <Button isLoading={updateMutation.isPending || createMutation.isPending} colorScheme="blue" mt="7" type='submit'>Save</Button>
        </Flex>
      </form>
    </Box>
  );
};
