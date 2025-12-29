import { useEffect, useState } from "react";
import { listingService } from "../services/listingService";
import { agentService } from "../services/agentService"; // Needed for dropdown
import { MapPin, Bed, Bath, Maximize, Plus } from "lucide-react";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [agents, setAgents] = useState([]);
  const [newListing, setNewListing] = useState({
    title: "",
    price: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    areaSquareMeters: "",
    listingAgentId: "",
    latitude: -23.55,
    longitude: -46.63,
  });

  const loadData = async () => {
    try {
      const [listRes, agentRes] = await Promise.all([
        listingService.getAll(),
        agentService.getAll(),
      ]);
      setListings(listRes.data);
      setAgents(agentRes.data.filter((a) => a.isRealtor));
    } catch (err) {
      console.error("Failed to load data", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await listingService.create({
        ...newListing,
        price: parseFloat(newListing.price),
        bedrooms: parseInt(newListing.bedrooms),
        bathrooms: parseInt(newListing.bathrooms),
        areaSquareMeters: parseFloat(newListing.areaSquareMeters),
      });
      setNewListing({
        title: "",
        price: "",
        address: "",
        bedrooms: "",
        bathrooms: "",
        areaSquareMeters: "",
        listingAgentId: "",
        latitude: -23.55,
        longitude: -46.63,
      });
      loadData();
    } catch (err) {
      alert("Error creating listing.");
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">Property Inventory</h1>

      {/* CREATE FORM */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Plus size={20} /> New Listing
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <input
            className="p-2 border rounded-lg md:col-span-2"
            placeholder="Title"
            value={newListing.title}
            onChange={(e) =>
              setNewListing({ ...newListing, title: e.target.value })
            }
            required
          />
          <input
            className="p-2 border rounded-lg"
            placeholder="Price"
            type="number"
            value={newListing.price}
            onChange={(e) =>
              setNewListing({ ...newListing, price: e.target.value })
            }
            required
          />
          <input
            className="p-2 border rounded-lg"
            placeholder="Address"
            value={newListing.address}
            onChange={(e) =>
              setNewListing({ ...newListing, address: e.target.value })
            }
            required
          />
          <input
            className="p-2 border rounded-lg"
            placeholder="Beds"
            type="number"
            value={newListing.bedrooms}
            onChange={(e) =>
              setNewListing({ ...newListing, bedrooms: e.target.value })
            }
          />
          <input
            className="p-2 border rounded-lg"
            placeholder="Baths"
            type="number"
            value={newListing.bathrooms}
            onChange={(e) =>
              setNewListing({ ...newListing, bathrooms: e.target.value })
            }
          />
          <input
            className="p-2 border rounded-lg"
            placeholder="Area (m²)"
            type="number"
            value={newListing.areaSquareMeters}
            onChange={(e) =>
              setNewListing({ ...newListing, areaSquareMeters: e.target.value })
            }
          />
          <select
            className="p-2 border rounded-lg"
            value={newListing.listingAgentId}
            onChange={(e) =>
              setNewListing({ ...newListing, listingAgentId: e.target.value })
            }
            required
          >
            <option value="">Select Agent</option>
            {agents.map((a) => (
              <option key={a.id} value={a.id}>
                {a.firstName} {a.lastName}
              </option>
            ))}
          </select>
          <button className="bg-slate-900 text-white font-bold py-2 rounded-lg hover:bg-slate-800 md:col-span-4 mt-2">
            Add Property
          </button>
        </form>
      </section>

      {/* LISTINGS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((l) => (
          <div
            key={l.id}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition"
          >
            <div className="h-48 bg-slate-200 flex items-center justify-center text-slate-400 italic">
              Property Image
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-xl text-slate-800">{l.title}</h3>
                <span className="text-blue-600 font-bold">
                  ${l.price?.toLocaleString()}
                </span>
              </div>
              <p className="text-slate-500 text-sm flex items-center gap-1 mb-4">
                <MapPin size={14} /> {l.address}
              </p>
              <div className="flex justify-between border-t border-slate-50 pt-4 text-slate-600">
                <span className="flex items-center gap-1 text-sm">
                  <Bed size={16} /> {l.bedrooms} Beds
                </span>
                <span className="flex items-center gap-1 text-sm">
                  <Bath size={16} /> {l.bathrooms} Baths
                </span>
                <span className="flex items-center gap-1 text-sm">
                  <Maximize size={16} /> {l.areaSquareMeters}m²
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;
