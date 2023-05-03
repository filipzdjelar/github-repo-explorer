import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import RepositoryDetails from "./components/pages/RepositoryDetails";
import RepositorySearch from "./components/pages/RepositorySearch";
import Landing from "./components/pages/Landing";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path=":search" element={<RepositorySearch />} />
            <Route path=":search/:id" element={<RepositoryDetails />} />
            <Route path="*" element={<p>404</p>} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
