import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Main from "./pages/Main/Main";
import Login from "./pages/Auth/Login";
import AddPost from "./pages/Recipe/AddPost";
import SignUp from "./pages/Auth/SignUp";
import SNSInfo from "./pages/Auth/SNSInfo";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/write" element={<AddPost />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/snsinfo" element={<SNSInfo />}></Route>
      </Routes>
      {/* <AddPost></AddPost> */}
    </BrowserRouter>
  );
};

export default App;
