import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RepositoryDetails from "./components/RepositoryDetails";
import TopRepositories from "./components/TopRepositories";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<p>landing</p>} />
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
