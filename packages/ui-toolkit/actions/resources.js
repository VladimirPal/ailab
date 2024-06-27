import { SET_RESOURCES, ADD_RESOURCE, DELETE_RESOURCE } from "./actionTypes";

export const setResources = (resourceName, payload) => ({
  type: SET_RESOURCES,
  resourceName,
  payload,
});

export const addResource = (resourceName, payload) => ({
  type: ADD_RESOURCE,
  resourceName,
  payload,
});

export const deleteResource = (resourceName, payload) => ({
  type: DELETE_RESOURCE,
  resourceName,
  payload,
});
