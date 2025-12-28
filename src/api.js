import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const fetchAgents = () => axios.get(`${API_BASE_URL}/agents`);

export const processSale = (data) =>
  axios.post(`${API_BASE_URL}/commissions/process`, data);
