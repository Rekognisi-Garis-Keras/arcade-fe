import { apiRequest } from "@/utils/api"

const token = localStorage.getItem("token");

export const getTopics = async (query = {}) => {
  return apiRequest("/topics", {
    query,
    headers: { Authorization: `Bearer ${token}` }
  });
}

export const addTopic = async (subSlug, data) => {
  return await apiRequest(`/subjects/${subSlug}/topics`, {
    method: "POST",
    body: data,
    headers: { Authorization: `Bearer ${token}` },
    isFormData: true,
  });
};

export const deleteTopic = async (subSlug, topSlug) => {
  return await apiRequest(`/subjects/${subSlug}/topics/${topSlug}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
}

export const updateTopic = async (subSlug, topSlug, body) => {
  return await apiRequest(`/subjects/${subSlug}/topics/${topSlug}`, {
    method: "PUT",
    body,
    isFormData: true,
    headers: { Authorization: `Bearer ${token}` }
  });
}