import api from "../api/axiosConfig";

export const listingService = {
  getAll: () => api.get("/listings"),
  getById: (id) => api.get(`/listings/${id}`),
  create: (listingData) => api.post("/listings", listingData),
};
