import { apiRequest } from "@/utils/api";

export const getTopics = async (query = {}) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return apiRequest("/topics", {
    query,
    headers: { Authorization: token ? `Bearer ${token}` : "" }
  });
};

export const addTopic = async (subSlug, data) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return await apiRequest(`/subjects/${subSlug}/topics`, {
    method: "POST",
    body: data,
    isFormData: true,
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  });
};

export const deleteTopic = async (subSlug, topSlug) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return await apiRequest(`/subjects/${subSlug}/topics/${topSlug}`, {
    method: "DELETE",
    headers: { Authorization: token ? `Bearer ${token}` : "" }
  });
};

export const updateTopic = async (subSlug, topSlug, body) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return await apiRequest(`/subjects/${subSlug}/topics/${topSlug}`, {
    method: "PUT",
    body,
    isFormData: true,
    headers: { Authorization: token ? `Bearer ${token}` : "" }
  });
};
