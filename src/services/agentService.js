import api from "../api/axiosConfig";

export const agentService = {
  getAll: () => api.get("/agents"),
  toggleStatus: (id) => api.post(`/agents/${id}/toggle-status`),
  checkIn: (id) => api.post(`/agents/${id}/check-in`),
};
