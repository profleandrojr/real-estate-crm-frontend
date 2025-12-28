import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
// Placeholder components for now
const Listings = () => (
  <h1 className="text-2xl font-bold">Listings Module (Public/Private)</h1>
);
const Leads = () => <h1 className="text-2xl font-bold">Leads Module (CRM)</h1>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="listings" element={<Listings />} />
          <Route path="leads" element={<Leads />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
