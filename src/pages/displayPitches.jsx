import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DisplayPitches() {
  const [pitches, setPitches] = useState([]);
  const navigate = useNavigate();

  const demoPitches = [
    {
      title: "Green Energy Startup",
      targetAmount: "500000",
      endDate: "2025-12-31",
      tags: ["Sustainability", "Tech"],
    },
    {
      title: "AI-Powered Tutoring Platform",
      targetAmount: "250000",
      endDate: "2025-10-30",
      tags: ["AI", "Education"],
    },
  ];

  useEffect(() => {
    const storedPitches = JSON.parse(localStorage.getItem("pitches")) || [];
    setPitches([...demoPitches, ...storedPitches]);
  }, []);

  return (
    <div className="login-container">
      <div className="login-box" style={{ width: "600px", textAlign: "left" }}>
        <h1>Display Pitches</h1>

        {/* ✅ Button to create a new pitch */}
        <button
          className="login-button"
          style={{ marginBottom: "1rem" }}
          onClick={() => navigate("/create-pitch")}
        >
          + Create New Pitch
        </button>

        {pitches.length === 0 ? (
          <p>No pitches available</p>
        ) : (
          pitches.map((pitch, index) => (
            <div
              key={index}
              style={{
                borderBottom: "1px solid #ddd",
                padding: "1rem 0",
                marginBottom: "1rem",
              }}
            >
              <h2>{pitch.title}</h2>
              {pitch.tags && pitch.tags.length > 0 && (
                <p>
                  <strong>Tags:</strong> {pitch.tags.join(", ")}
                </p>
              )}
              <p>
                <strong>Target Investment:</strong> £{pitch.targetAmount}
              </p>
              <p>
                <strong>Investment Window Ends:</strong> {pitch.endDate}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
