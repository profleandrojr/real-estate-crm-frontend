import { useEffect, useState } from "react";
import { fetchAgents } from "./api";
import { Users, BadgeCheck } from "lucide-react";

function App() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetchAgents()
      .then((response) => setAgents(response.data))
      .catch((error) => console.error("Error fetching agents: ", error));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <header>
        <h1>
          <Users size={32} /> Agent Directory
        </h1>
        <p>Managed via Modular Monolith Backend</p>
      </header>

      <div style={{ display: "grid", gap: "1rem", marginTop: "2rem" }}>
        {agents.map((agent) => (
          <div
            key={agent.id}
            style={{
              border: "1px solid #ddd",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <h3>
              {agent.name}{" "}
              {agent.isRealtor && <BadgeCheck color="blue" size={18} />}
            </h3>
            <p>License: {agent.licenseNumber}</p>
            <p>
              <strong>Commission Rate: {agent.baseCommissionRate}%</strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
