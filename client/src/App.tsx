import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";

import Main from "./pages/Main/Main";
import ImgUploader from "./components/ImgUploader";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />}></Route>
      </Routes>
      <ImgUploader></ImgUploader>
    </BrowserRouter>
  );
};

export default App;
