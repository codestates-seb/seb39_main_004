import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loading } from "./components/CommonUI";
import GlobalStyle from "./styles/GlobalStyle";

const Main = lazy(() => import("./pages/Main/Main"));
const Search = lazy(() => import("./pages/Search/Search"));
const Login = lazy(() => import("./pages/Auth/Login"));
const SignUp = lazy(() => import("./pages/Auth/SignUp"));
const SNSInfo = lazy(() => import("./pages/Auth/SNSInfo"));
const Layout = lazy(() => import("./components/Layout"));
const PostDetail = lazy(() => import("./pages/Recipe/PostDetail"));
const AddPost = lazy(() => import("./pages/Recipe/AddPost"));
const EditPost = lazy(() => import("./pages/Recipe/EditPost"));
const MyPage = lazy(() => import("./pages/Mypage/MyPage"));
const Redirect = lazy(() => import("./components/CommonUI/Redirect"));

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="recipe">
              <Route path="new" element={<AddPost />}></Route>
              <Route path=":recipeId" element={<EditPost />}></Route>
            </Route>
            <Route path="signup" element={<SignUp />}></Route>
            <Route path="snsinfo" element={<SNSInfo />}></Route>
            <Route path="mypage" element={<MyPage />}></Route>
            <Route path="search" element={<Search />}></Route>
            <Route path="rank" element={<Main />}></Route>
            <Route path="redirect" element={<Redirect />} />
            <Route path="api/v1/auth/login-success" element={<Main />} />
            {/** 랭킹페이지 완성 후 컴포넌트 변경해주세요 */}
            <Route path="post/:id" element={<PostDetail />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
