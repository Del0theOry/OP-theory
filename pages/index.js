import { useState } from "react";

export default function Home() {
  const [theories, setTheories] = useState([
    {
      id: 1,
      title: "Crocodile is Luffy's Mom",
      believers: 12,
      nonBelievers: 5,
    },
    {
      id: 2,
      title: "Shanks is a Celestial Dragon",
      believers: 30,
      nonBelievers: 20,
    },
  ]);

  const [newTheory, setNewTheory] = useState("");

  const handlePostTheory = () => {
    if (!newTheory.trim()) return;
    const newId = theories.length + 1;
    const newEntry = {
      id: newId,
      title: newTheory,
      believers: 0,
      nonBelievers: 0,
    };
    setTheories([newEntry, ...theories]);
    setNewTheory("");
  };

  const handleVote = (id, type) => {
    setTheories((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              believers: type === "believer" ? t.believers + 1 : t.believers,
              nonBelievers:
                type === "nonBeliever" ? t.nonBelievers + 1 : t.nonBelievers,
            }
          : t
      )
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">One Piece Theory Hub</h1>

      <div className="mb-6">
        <input
          className="border rounded px-3 py-2 w-full"
          placeholder="Post a new theory..."
          value={newTheory}
          onChange={(e) => setNewTheory(e.target.value)}
        />
        <button
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handlePostTheory}
        >
          Post Theory
        </button>
      </div>

      <div className="space-y-4">
        {theories.map((theory) => (
          <div
            key={theory.id}
            className="border p-4 rounded-xl shadow flex flex-col"
          >
            <h2 className="text-xl font-semibold">{theory.title}</h2>
            <div className="flex items-center gap-4 mt-2">
              <button
                onClick={() => handleVote(theory.id, "believer")}
                className="border px-3 py-1 rounded hover:bg-green-200"
              >
                👍 Believers ({theory.believers})
              </button>
              <button
                onClick={() => handleVote(theory.id, "nonBeliever")}
                className="border px-3 py-1 rounded hover:bg-red-200"
              >
                👎 Non-Believers ({theory.nonBelievers})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
