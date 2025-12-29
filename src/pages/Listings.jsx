import { useEffect, useState } from "react";
import { listingService } from "../services/listingService";
import { MapPin, Bed, Bath, Maximize } from "lucide-react";

const Listings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const loadListings = async () => {
      try {
        const res = await listingService.getAll();
        if (isMounted) setListings(res.data);
      } catch (err) {
        console.error("Failed to load listings", err);
      }
    };
    loadListings();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">Property Inventory</h1>
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
