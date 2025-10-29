"use client";

import { useEffect, useState } from "react";

export default function MemePage() {
  const [meme, setMeme] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMeme = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://meme-api.com/gimme/wholesomememes");
      const data = await res.json();
      setMeme(data);
    } catch (error) {
      console.error("Failed to fetch meme:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeme();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center text-gray-800 px-4 pb-24">
      {/* Main meme section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-white p-6 rounded-2xl w-full max-w-5xl min-h-[400px] mt-auto mb-auto">
        {/* Left side - Meme image */}
        <div className="w-full md:w-1/2 flex justify-center">
          {loading ? (
            <div className="text-gray-400 italic">Loading meme...</div>
          ) : (
            <img
              src={meme?.url}
              alt={meme?.title}
              className="max-h-[350px] object-contain"
            />
          )}
        </div>

        {/* Right side - Text content */}
        <div className="w-full md:w-1/2 flex flex-col text-center md:text-left">
          <h1 className="text-5xl font-extrabold mb-2 text-black">
            This page is waiting to be developed...
          </h1>
          <p className="font-bold text-2xl text-neutral-700 mb-10">
            Just take a rest, and enjoy the meme :]{" "}
          </p>
          {!loading && (
            <p className="text-lg font-medium">
              <span className="font-bold">meme title: </span> {meme?.title}
            </p>
          )}
        </div>
      </div>

      {/* Fixed button at bottom */}
      <button
        onClick={fetchMeme}
        className="fixed bottom-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-all"
      >
        🔄 Refresh Meme
      </button>
    </div>
  );
}
