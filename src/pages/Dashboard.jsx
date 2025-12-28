import { useEffect, useState } from "react";
import { agentService } from "../services/agentService";

const Dashboard = () => {
  const [agents, setAgents] = useState([]);

  const loadAgents = async () => {
    try {
      const res = await agentService.getAll();
      setAgents(res.data);
    } catch (err) {
      console.error("Failed to load agents", err);
    }
  };

  useEffect(() => {
    let isMounted = true; // Prevents updating state if component unmounts

    const fetchData = async () => {
      try {
        const res = await agentService.getAll();
        if (isMounted) {
          setAgents(res.data);
        }
      } catch (err) {
        console.error("Failed to load agents", err);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup function
    };
  }, []);

  const handleToggleStatus = async (agent) => {
    if (!agent.isRealtor) {
      alert("Access Denied: Only Licensed Realtors can check in/out.");
      return;
    }

    try {
      await agentService.toggleStatus(agent.id);
      loadAgents();
    } catch (err) {
      console.error("Status update failed:", err);
      alert("Error updating status.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Operations Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">{agent.name}</h3>
              <span
                className={`px-2 py-1 rounded text-xs font-bold ${
                  agent.active
                    ? "bg-green-100 text-green-700"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {agent.active ? "ON SITE" : "OFFLINE"}
              </span>
            </div>
            <p className="text-slate-500 text-sm mt-1">
              {agent.isRealtor ? "REALTOR" : "STAFF"}
            </p>

            <button
              onClick={() => handleToggleStatus(agent)}
              className={`mt-4 w-full py-2 rounded-lg font-bold transition ${
                !agent.isRealtor
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : agent.active
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {agent.active ? "Check Out" : "Check In"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
