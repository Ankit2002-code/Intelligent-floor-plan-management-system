import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL 
  ? `${import.meta.env.VITE_BACKEND_URL}/api/floor-plan`
  : "http://localhost:8080/api/floor-plan";
  
export const getFloorPlans = (username, version) =>
  axios.get(`${API_URL}?username=${username}&version=${version}`);

export const updateFloorPlan = (payload) =>
  axios.post(`${API_URL}/update`, payload);

export const deleteFloorPlan = (username, version) =>
  axios.delete(`${API_URL}/delete`, { params: { username, version } });

export const getAllVersions = () =>
  axios.get(`${API_URL}/versions`); 