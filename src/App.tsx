import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VuePage from "./pages/VuePage";
import Layout from "./components/Layout";
import ReactPage from "./pages/ReactPage";
import AngularPage from "./pages/AngularPage";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<p>landing</p>} />
            <Route path="/react" element={<ReactPage />} />
            <Route path="/angular" element={<AngularPage />} />
            <Route path="/vue" element={<VuePage />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
