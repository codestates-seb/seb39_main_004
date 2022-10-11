import { userSession } from "../../redux/slices/userSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/dispatchHook";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Redirect = () => {
  //const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { sessionStatus } = useAppSelector((state) => state.user);
  // const { sessionStatus, userInfo } = useAppSelector((state) => state.user);

  const { url } = location.state as { url: string };
  if (url) window.location.href = url;

  //navigate("/");

  useEffect(() => {
    if (sessionStatus) dispatch(userSession());
    // console.log("세션 체크: ", sessionStatus, userInfo.new);
  }, [sessionStatus]);

  return null; // TODO: 추후 로딩 컴포넌트 추가
};

export default Redirect;
