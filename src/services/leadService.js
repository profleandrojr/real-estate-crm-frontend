import api from "../api/axiosConfig";

export const leadService = {
  getAll: () => api.get("/leads"),
  create: (leadData) => api.post("/leads", leadData),
};
