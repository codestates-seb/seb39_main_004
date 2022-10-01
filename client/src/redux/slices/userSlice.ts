/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import axios from "axios";
import qs from "qs";
import Swal from "sweetalert2";

interface UserInfos {
  name: string;
  email: string;
  image: string;
  bio?: string;
}

interface UserState {
  userInfo: any | UserInfos | null;
  signUpInfo: any | null;
  loading: boolean;
  //error: any;
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
  //error: null,
  success: false,
};

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
        console.log("로그인 액션 생성자: ", response);
        // localStorage.clear();
        // localStorage.setItem("userToken", data.headers.authorization);
      }
      return response;
    } catch (error: any) {
      if (error.response.data.status === 500) {
        console.log(error);
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
          title: "이메일 또는 비밀번호를 확인해주세요.",
        });
      }
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
        console.log(response);
        //localStorage.clear();
      }
      return response;
    } catch (error: any) {
      if (error.response.data.status === 500) {
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
      }
    }
  }
);

// 로그아웃 액션 생성자
export const userLogout = createAsyncThunk(
  "userSlice/userLogout ",
  async () => {
    try {
      const response = await axios.post("/api/v1/logout");
      if (response.status === 200) {
        localStorage.clear();
      }
    } catch (error) {
      // if (error.response && error.response.data.message) {
      //   return error.response.data.message;
      // } else {
      //   return error.message;
      // }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        //state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        console.log("페이로드 ", payload);
        //state.success = true;
      })
      .addCase(userLogin.rejected, (state) => {
        state.loading = false;
        //state.error = payload;
      })
      .addCase(userSignUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.signUpInfo = payload;
        //console.log(payload);
        //state.error = payload;
      });
  },
});

export const userActions = userSlice.actions;
export const selectUserInfo = (state: RootState) => state.user;
export default userSlice.reducer;
