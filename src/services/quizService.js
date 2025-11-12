import { apiRequest } from "@/utils/api"

const token = localStorage.getItem("token");

export const getAllQuizzes = async () => {
  return apiRequest(`/quizzes`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export const addQuiz = async (subSlug, topSlug, data) => {
  return await apiRequest(`/subjects/${subSlug}/topics/${topSlug}/quizzes`, {
    method: "POST",
    body: data,
    headers: { Authorization: `Bearer ${token}` }
  });
}

export const updateQuiz = async (subSlug, topSlug, uuid, data) => {
  return await apiRequest(`/subjects/${subSlug}/topics/${topSlug}/quizzes/${uuid}`, {
    method: "PUT",
    body: data,
    headers: { Authorization: `Bearer ${token}` }
  });
}

export const deleteQuiz = async (subSlug, topSlug, uuid) => {
  return await apiRequest(`/subjects/${subSlug}/topics/${topSlug}/quizzes/${uuid}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
}


export const getQuizzesByTopic = async (subSlug, topSlug) => {
  return apiRequest(`/subjects/${subSlug}/topics/${topSlug}/quizzes`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}