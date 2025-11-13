import { apiRequest } from "@/utils/api";

export const getAllQuizzes = async () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return apiRequest(`/quizzes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addQuiz = async (subSlug, topSlug, data) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return await apiRequest(`/subjects/${subSlug}/topics/${topSlug}/quizzes`, {
    method: "POST",
    body: data,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateQuiz = async (subSlug, topSlug, uuid, data) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return await apiRequest(`/subjects/${subSlug}/topics/${topSlug}/quizzes/${uuid}`, {
    method: "PUT",
    body: data,
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteQuiz = async (subSlug, topSlug, uuid) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return await apiRequest(`/subjects/${subSlug}/topics/${topSlug}/quizzes/${uuid}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getQuizzesByTopic = async (subSlug, topSlug) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return apiRequest(`/subjects/${subSlug}/topics/${topSlug}/quizzes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
