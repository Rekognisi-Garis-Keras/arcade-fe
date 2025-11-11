import { apiRequest } from "@/utils/api"

const token = localStorage.getItem("token");

export const getAllQuizzes = async () => {
  return apiRequest(`/quizzes`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export const addQuiz = async (data) => {
  return await apiRequest(`/quizzes`, {
    method: "POST",
    body: data,
    headers: { Authorization: `Bearer ${token}` }
  });
}

export const getQuizzesByTopic = async (subSlug, topSlug) => {
  return apiRequest(`/subjects/${subSlug}/topics/${topSlug}/quizzes`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}