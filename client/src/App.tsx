import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";

import Main from "./pages/Main/Main";
import AddPost from "./pages/Recipe/AddPost";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/write" element={<AddPost />}></Route>
      </Routes>
      {/* <AddPost></AddPost> */}
    </BrowserRouter>
  );
};

export default App;
