import api from "../api/api";

export const submitFeedback = async ({ name, email, message }) => {
  const response = await api.post("/feedback", { name, email, message });
  return response.data;
};
