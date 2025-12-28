import { useEffect, useState } from "react";
import { fetchAgents, processSale } from "./api";

function App() {
  const [agents, setAgents] = useState([]);

  const [saleData, setSaleData] = useState({
    listingId: "",
    leadId: "",
    salePrice: "",
  });

  useEffect(() => {
    fetchAgents()
      .then((response) => setAgents(response.data))
      .catch((error) => console.error("Error fetching agents: ", error));
  }, []);

  const handleSaleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await processSale(saleData);
      alert(`Success! Office Cut: $${response.data.officeCut}`);
      // Refresh data if needed
    } catch (error) {
      console.error("Sale processing failed", error);
      alert("Check validation: Price must be positive!");
    }
  };

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

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
        <h2 className="text-xl font-bold mb-4 text-slate-800">
          Process New Sale
        </h2>
        <form
          onSubmit={handleSaleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Listing ID
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. 1"
              value={saleData.listingId}
              onChange={(e) =>
                setSaleData({ ...saleData, listingId: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Lead ID
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. 1"
              value={saleData.leadId}
              onChange={(e) =>
                setSaleData({ ...saleData, leadId: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Final Sale Price
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. 500000"
              value={saleData.salePrice}
              onChange={(e) =>
                setSaleData({ ...saleData, salePrice: e.target.value })
              }
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Calculate Commission
          </button>
        </form>
      </section>
    </div>
  );
}

export default App;
