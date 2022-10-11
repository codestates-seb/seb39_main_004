/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import axios from "axios";
import qs from "qs";
import Swal from "sweetalert2";
import { PURGE } from "redux-persist";

interface UserInfos {
  name: string;
  email: string;
  imageProfileUrl: string;
  bio: string;
  new: boolean;
}

interface UserState {
  userInfo: any | UserInfos | null;
  signUpInfo: any | null;
  loading: boolean;
  //error: any;
  sessionStatus: boolean;
  success: boolean;
}

interface LoginData {
  username: string;
  password: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

const initialUserState: UserState = {
  loading: false,
  userInfo: null,
  signUpInfo: null,
  sessionStatus: false,
  //error: null,
  success: false,
};

// 로그인 세션 확인 액션 생성자
export const userSession = createAsyncThunk(
  "userSlice/userSession ",
  async () => {
    try {
      const response = await axios.get("/api/v1/auth/session-status");
      if (response.status === 401) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: "권한이 없는 요청입니다.\n 로그인을 해주세요.",
        });
      }

      return response.data;
    } catch (error: any) {
      // console.log(error);
    }
  }
);

// 로그인 액션 생성자 (form data로 전송)
export const userLogin = createAsyncThunk(
  "userSlice/userLogin ",
  async (userData: LoginData) => {
    try {
      const response = await axios.post(
        "/api/v1/auth/login",
        qs.stringify(userData),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        // console.log("로그인 액션 생성자: ", response);
      }

      return response;
    } catch (error: any) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "로그인에 실패했습니다.\n 다시 시도해주세요.",
      });
    }
  }
);

// 회원가입 액션 생성자
export const userSignUp = createAsyncThunk(
  "userSlice/userSignUp ",
  async (signUpData: SignUpData) => {
    try {
      const response = await axios.post("/api/v1/auth/signup", signUpData);
      if (response.status === 200) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "회원가입에 성공했습니다.",
        });
      }

      return response;
    } catch (error: any) {
      if (error.response.data.status === 409) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: "이미 가입된 회원 정보입니다.",
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: "서버 에러입니다.\n 관리자에게 문의해주세요.",
        });
      }
    }
  }
);

// 로그아웃 액션 생성자
export const userLogout = createAsyncThunk(
  "userSlice/userLogout ",
  async () => {
    try {
      const response = await axios.post("/api/v1/auth/logout");
      // console.log("로그아웃 액션 생성자: ", response);
      if (response.status === 200) {
        localStorage.clear();

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "로그아웃 되었습니다.",
        });
      }
    } catch (error) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "로그아웃에 실패했습니다.",
      });
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //로그인
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(userLogin.rejected, (state) => {
        state.loading = false;
      })
      // 회원가입
      .addCase(userSignUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.signUpInfo = payload;
      })
      // 세션 체크
      .addCase(userSession.fulfilled, (state, { payload }) => {
        // console.log("session payload: ", payload);
        if (payload) {
          state.sessionStatus = true;
          state.userInfo = payload.data; // 현재 로그인 된 사용자의 정보 할당};
        } else state.sessionStatus = false;
      })
      // 로그아웃
      .addCase(userLogout.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.signUpInfo = payload;
        state.sessionStatus = false;
      })
      .addCase(PURGE, () => {
        initialUserState;
      });
  },
});

export const userActions = userSlice.actions;
export const selectUserInfo = (state: RootState) => state.user;
export default userSlice.reducer;
