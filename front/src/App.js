import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ImagePage from "./pages/ImagePage";
import VideoPage from "./pages/VideoPage";
import NoPage from "./pages/VideoPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
          <Route index element={<Home/>} />
          <Route path="/page2" element={<ImagePage/>} />
          <Route path="/page3/:slug" element={<VideoPage />} />
          <Route path="*" element={<NoPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
