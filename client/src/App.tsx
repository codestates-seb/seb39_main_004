import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";

import Main from "./pages/Main/Main";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
