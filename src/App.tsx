import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
            <Route path=":search" element={<ReactPage />} />
            <Route path=":search/:id" element={<AngularPage />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
