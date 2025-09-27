import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

export default function CreatePitch() {
  const [title, setTitle] = useState("");
  const [elevatorPitch, setElevatorPitch] = useState("");
  const [detailedPitch, setDetailedPitch] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [endDate, setEndDate] = useState("");
  const [profitShare, setProfitShare] = useState("");
  const [tiers, setTiers] = useState([
    { name: "", min: "", max: "", multiplier: "" },
    { name: "", min: "", max: "", multiplier: "" },
    { name: "", min: "", max: "", multiplier: "" },
  ]);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleTierChange = (index, field, value) => {
    const updatedTiers = [...tiers];
    updatedTiers[index][field] = value;
    setTiers(updatedTiers);
  };

  const [tags, setTags] = useState([]);

  const availableTags = ["Tech", "Healthcare", "Finance", "Sustainability", "AI", "Education"];

  const handleTagChange = (tag) => {
    if (tags.includes(tag)) {
      // remove tag if already selected
      setTags(tags.filter(t => t !== tag));
    } else if (tags.length < 3) {
      // add tag if less than 3 selected
      setTags([...tags, tag]);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic pitch validation
    if (!title || !elevatorPitch || !detailedPitch || !targetAmount || !endDate || !profitShare) {
      setError("All fields are required");
      return;
    }

    // Tier validation
    for (let i = 0; i < tiers.length; i++) {
      const { name, min, max, multiplier } = tiers[i];
      if (!name || !min || !max || !multiplier) {
        setError(`Please complete all fields for Tier ${i + 1}`);
        return;
      }
      if (Number(min) >= Number(max)) {
        setError(`In Tier ${i + 1}, Min must be less than Max`);
        return;
      }
    }

    // Check for overlapping ranges
    const sortedTiers = [...tiers].sort((a, b) => Number(a.min) - Number(b.min));
    for (let i = 0; i < sortedTiers.length - 1; i++) {
      if (Number(sortedTiers[i].max) > Number(sortedTiers[i + 1].min)) {
        setError("Investment ranges must not overlap between tiers");
        return;
      }
    }

    setError("");

    const pitchData = {
      title,
      elevatorPitch,
      detailedPitch,
      tags,
      targetAmount,
      endDate,
      profitShare,
      tiers,
    };

    // Save to localStorage
    const existingPitches = JSON.parse(localStorage.getItem("pitches")) || [];
    localStorage.setItem("pitches", JSON.stringify([...existingPitches, pitchData]));

    navigate("/display-pitches"); 

    // Reset form
    setTitle("");
    setElevatorPitch("");
    setDetailedPitch("");
    setTargetAmount("");
    setEndDate("");
    setProfitShare("");
    setTiers([
      { name: "", min: "", max: "", multiplier: "" },
      { name: "", min: "", max: "", multiplier: "" },
      { name: "", min: "", max: "", multiplier: "" },
    ]);
  };

  return (
    <div className="login-container">
      <div className="login-box" style={{ width: "600px", textAlign: "left" }}>
        <h1>Create Pitch</h1>
        <p>Fill in the details below to create your pitch</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Elevator Pitch</label>
            <input
              type="text"
              value={elevatorPitch}
              onChange={(e) => setElevatorPitch(e.target.value)}
              placeholder="One-sentence summary"
              required
            />
          </div>

          <div className="form-group">
            <label>Detailed Pitch</label>
            <textarea
              value={detailedPitch}
              onChange={(e) => setDetailedPitch(e.target.value)}
              rows={5}
              required
              style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>

          <div className="form-group">
            <label>Tags (choose up to 3)</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagChange(tag)}
                  style={{
                    padding: "0.4rem 0.8rem",
                    borderRadius: "4px",
                    border: tags.includes(tag) ? "2px solid #007bff" : "1px solid #ccc",
                    backgroundColor: tags.includes(tag) ? "#007bff" : "white",
                    color: tags.includes(tag) ? "white" : "black",
                    cursor: "pointer"
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
            {tags.length > 0 && (
              <p style={{ marginTop: "0.5rem" }}>Selected: {tags.join(", ")}</p>
            )}
          </div>

          <div className="form-group">
            <label>Target Investment Amount (£)</label>
            <input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Investment Window End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Investor Profit Share (%)</label>
            <input
              type="number"
              value={profitShare}
              onChange={(e) => setProfitShare(e.target.value)}
              min="1"
              max="100"
              required
            />
          </div>

          <h3 style={{ marginTop: "1rem" }}>Investment Tiers</h3>
          {tiers.map((tier, index) => (
            <div key={index} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "6px", marginBottom: "1rem" }}>
              <div className="form-group">
                <label>Tier {index + 1} Name</label>
                <input
                  type="text"
                  value={tier.name}
                  onChange={(e) => handleTierChange(index, "name", e.target.value)}
                  placeholder=""
                  required
                />
              </div>

              <div className="form-group">
                <label>Investment Range (£)</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="number"
                    value={tier.min}
                    onChange={(e) => handleTierChange(index, "min", e.target.value)}
                    placeholder="Min"
                    required
                    style={{ flex: 1 }}
                  />
                  <input
                    type="number"
                    value={tier.max}
                    onChange={(e) => handleTierChange(index, "max", e.target.value)}
                    placeholder="Max"
                    required
                    style={{ flex: 1 }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Multiplier</label>
                <input
                  type="number"
                  step="0.1"
                  value={tier.multiplier}
                  onChange={(e) => handleTierChange(index, "multiplier", e.target.value)}
                  placeholder=""
                  required
                />
              </div>
            </div>
          ))}

          <button type="submit" className="login-button">Create Pitch</button>
        </form>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
