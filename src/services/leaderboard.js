import { apiRequest } from "@/utils/api";

const getToken = () => localStorage.getItem("token");

export const getLeaderboard = async () => {
  const token = getToken();
  return apiRequest("/leaderboard", {
    headers: { Authorization: `Bearer ${token}` },
  });
};