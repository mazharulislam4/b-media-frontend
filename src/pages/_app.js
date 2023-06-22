
import "@/styles/globals.css";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";

import { ChatProvider } from "../../contextAPI/chatContext";
import { store } from "../redux/app/store";



export default function App({ Component, pageProps }) {
 
  return (
    <Provider store={store}>
      <ChatProvider>
        <Component {...pageProps} />
      </ChatProvider>
    </Provider>
  );
}
