import { apiRequest } from "@/utils/api";

export const getSubjects = async (query = {}) => {
  return apiRequest("/subjects", { query })
}