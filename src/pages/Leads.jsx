import { useEffect, useState } from "react";
import { leadService } from "../services/leadService";
import { agentService } from "../services/agentService";
import { UserPlus, Mail, Phone, Trash2, UserCheck } from "lucide-react";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [agents, setAgents] = useState([]);
  const [newLead, setNewLead] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    assignedAgentId: "",
  });

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const [leadsRes, agentsRes] = await Promise.all([
          leadService.getAll(),
          agentService.getAll(),
        ]);
        if (isMounted) {
          setLeads(leadsRes.data);
          setAgents(agentsRes.data.filter((a) => a.isRealtor));
        }
      } catch (err) {
        console.error("Failed to fetch CRM data", err);
      }
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await leadService.create(newLead);
      setNewLead({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        assignedAgentId: "",
      });
      // Refresh list
      const res = await leadService.getAll();
      setLeads(res.data);
    } catch (err) {
      console.log(err);
      alert("Error creating lead.");
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">Lead Management</h1>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <UserPlus size={20} /> Add New Buyer Lead
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          <input
            className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="First Name"
            value={newLead.firstName}
            onChange={(e) =>
              setNewLead({ ...newLead, firstName: e.target.value })
            }
            required
          />
          <input
            className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Last Name"
            value={newLead.lastName}
            onChange={(e) =>
              setNewLead({ ...newLead, lastName: e.target.value })
            }
            required
          />
          <input
            className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            type="email"
            value={newLead.email}
            onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
            required
          />
          <input
            className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Phone"
            value={newLead.phone}
            onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
            required
          />
          <select
            className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={newLead.assignedAgentId}
            onChange={(e) =>
              setNewLead({ ...newLead, assignedAgentId: e.target.value })
            }
          >
            <option value="">Assign Agent</option>
            {agents.map((a) => (
              <option key={a.id} value={a.id}>
                {a.firstName} {a.lastName}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Lead
          </button>
        </form>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="bg-white p-5 rounded-xl shadow-sm border border-slate-200"
          >
            <h3 className="font-bold text-lg text-slate-800">
              {lead.firstName} {lead.lastName}
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 uppercase">
              {lead.status}
            </span>
            <div className="mt-4 space-y-2 text-sm text-slate-500">
              <p className="flex items-center gap-2">
                <Mail size={14} /> {lead.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} /> {lead.phone}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leads;
