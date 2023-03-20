import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import recipeReducer from "../slices/recipeSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const reducers = combineReducers({
  user: userReducer,
  recipe: recipeReducer,
});

const persistConfig = {
  key: "root", // localStorage에 userReducer 저장
  storage,
  whitelist: ["user"], // 생략 시 모든 리듀서 저장
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,

  // A non-serializable value 에러 방지
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

// 스토어 자체에서 RootState 및 AppDispatch 유형을 추론
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
