export async function apiRequest(endpoint, { method = "GET", query = {}, body = null } = {}) {
   const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api-arcade.vercel.app";
   const queryString = Object.keys(query).length ? "?" + new URLSearchParams(query).toString() : "";
   const url = `${baseUrl}${endpoint}${queryString}`;

   const headers = {
      "Content-Type": "application/json",
   };

   const options = {
      method,
      headers,
   };

   if (body) options.body = JSON.stringify(body);

   try {
      const res = await fetch(url, options);
      const data = await res.json();

      if (!res.ok) {
         throw new Error(data.message || "Request failed");
      }

      return data;
   } catch (err) {
      console.error("API Request Error:", err);
      throw err;
   }
}
