import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RepositoryDetails from "./components/RepositoryDetails";
import TopRepositories from "./components/TopRepositories";
import Landing from "./components/Landing";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path=":search" element={<TopRepositories />} />
            <Route path=":search/:id" element={<RepositoryDetails />} />
            <Route path="*" element={<p>404</p>} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
