import axios from 'axios';
import { getAuthenticatedHeader, getHostUrl } from './utils';

export type Store = {
  id: string
  name: string
  address: string
  city: string
  phone: string
  email: string
  chain: string
  chainClassName: string
  chainId: string
  lat: number
  lng: number
  organizationNumber: string
}

export type UpdateOrCreateStore = Omit<Store, 'id'>

type PaginatedStores = {
  stores: Store[]
  total: number
}

const baseUrl = getHostUrl() + '/api/v1/admin/stores';

console.log(baseUrl);

export const getStores = async (token: string) : Promise<PaginatedStores> => {
  const response = await axios.get(baseUrl, getAuthenticatedHeader(token));
  return response.data;
}

export const getStoreById = async (id: string, token: string) : Promise<Store> => {
  const response = await axios.get(`${baseUrl}/${id}`, getAuthenticatedHeader(token));
  return response.data;
}

export const createStore = async (store: UpdateOrCreateStore, token: string) : Promise<Store> => {
  const response = await axios.post(baseUrl, store, getAuthenticatedHeader(token));

  return response.data;
}

export const patchStore = async (id: string, store: UpdateOrCreateStore, token: string) : Promise<Store> => {
  const response = await axios.patch(`${baseUrl}/${id}`, store, getAuthenticatedHeader(token));

  return response.data;
}

export const deleteStore = async (id: string, token: string) : Promise<Store> => {
  const response = await axios.delete(`${baseUrl}/${id}`, getAuthenticatedHeader(token));
  return response.data;
}