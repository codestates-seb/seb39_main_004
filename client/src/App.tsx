import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Main from "./pages/Main/Main";
import Login from "./pages/Auth/Login";
import AddPost from "./pages/Recipe/AddPost";
import SignUp from "./pages/Auth/SignUp";
import SNSInfo from "./pages/Auth/SNSInfo";
import Layout from "./components/Layout";
import Search from "./pages/Search/Search";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/write" element={<AddPost />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/snsinfo" element={<SNSInfo />}></Route>
          <Route path="/mypage" element={<Main />}></Route>
          {/** 마이페이지 완성 후 컴포넌트 변경해주세요 */}
          <Route path="/search" element={<Search />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
