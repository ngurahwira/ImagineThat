import { configureStore } from "@reduxjs/toolkit";
import chat from "../features/chat/chatSlice";

const store = configureStore({
  reducer: {
    chat,
  },
});

export default store;
