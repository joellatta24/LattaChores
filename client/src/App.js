import Header from "./components/Header";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./views/Main";
import DetailView from "./views/DetailView";
import CreateView from "./views/CreateView";
import IndexView from "./views/IndexView";
import EditView from "./views/EditView";
import Footer from "./components/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <BrowserRouter>
        <div>
          <Header isLoggedIn={isLoggedIn} />
          <Routes>
            <Route path="/" element={<Main setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/dashboard" element={<IndexView />} />
            <Route path="/new" element={<CreateView />} />
            <Route path="/view/:id" element={<DetailView />} />
            <Route path="/edit/:id" element={<EditView />} />
          </Routes>
        </div>
      </BrowserRouter>
      <br />
      {/* <Footer  */}
    </div>
  );
}

export default App;
