import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads"; // <-- Import Leads
import Listings from "./pages/Listings"; // <-- Import Listings

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Default to Dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<Dashboard />} />

          {/* Add these new routes so the Links work! */}
          <Route path="/leads" element={<Leads />} />
          <Route path="/listings" element={<Listings />} />

          {/* Fallback for 404s */}
          <Route
            path="*"
            element={
              <h1 className="text-center mt-10">404 - Page Not Found</h1>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
