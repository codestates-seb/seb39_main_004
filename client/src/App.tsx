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
import ImgServerTest from "./components/NewRecipe/ImgServerTest";
import PostDetail from "./pages/Recipe/PostDetail";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/write" element={<AddPost />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/snsinfo" element={<SNSInfo />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/rank" element={<Main />}></Route>
          {/** 랭킹페이지 완성 후 컴포넌트 변경해주세요 */}
          <Route path="/post/:id" element={<PostDetail />}></Route>
          <Route path="/test" element={<ImgServerTest />}></Route>
          {/** 이미 관련 테스트용 path입니다. 레시피 조회 페이지 작성 후에 제거하겠습니다*/}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
