import { useEffect, useState } from "react";
import { fetchAgents } from "./api";

function App() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetchAgents()
      .then((response) => setAgents(response.data))
      .catch((error) => console.error("Error fetching agents: ", error));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Agent Directory</h1>
        <p className="text-slate-500">Managed via Modular Monolith Backend</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
          >
            <h3 className="text-xl font-bold text-slate-800">{agent.name}</h3>
            <p className="text-slate-500 text-sm mb-4">
              License: {agent.licenseNumber}
            </p>
            <div className="border-t pt-4">
              <span className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                Commission
              </span>
              <p className="text-2xl font-bold text-blue-600">
                {agent.baseCommissionRate}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
