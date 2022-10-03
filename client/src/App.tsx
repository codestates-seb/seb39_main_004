import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import Main from "./pages/Main/Main";
import Login from "./pages/Auth/Login";
import AddPost from "./pages/Recipe/AddPost";
import SignUp from "./pages/Auth/SignUp";
import SNSInfo from "./pages/Auth/SNSInfo";
import MyPage from "./pages/Mypage/MyPage";
import Layout from "./components/Layout";
import Search from "./pages/Search/Search";
import PostDetail from "./pages/Recipe/PostDetail";
import Redirect from "./components/CommonUI/Redirect";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/write" element={<AddPost />}></Route>
          <Route path="/edit/:recipeId" element={<AddPost />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/snsinfo" element={<SNSInfo />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/rank" element={<Main />}></Route>
          <Route path="/redirect" element={<Redirect />} />
          <Route path="/api/v1/auth/login-success" element={<Main />} />
          {/** 랭킹페이지 완성 후 컴포넌트 변경해주세요 */}
          <Route
            path="/www.mmz.today/post/:id"
            element={<PostDetail />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
