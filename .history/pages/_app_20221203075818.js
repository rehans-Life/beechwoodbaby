import Applayout from "../Layouts/Applayout";
import { store } from "../redux/store";
import "../styles/globals.css";
import { Provider } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const loadingRef = useRef(null);
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    router.events.on("routeChangeComplete", () => setProgress(100));
  });
  return (
    <Provider store={store}>
      <LoadingBar
        color="#f11946"
        ref={loadingRef}
        progress={progress}
        waitingTime={500}
        onLoaderFinished={() => setProgress(0)}
      />
      <Applayout>
        <Component {...pageProps} />
      </Applayout>
    </Provider>
  );
}

export default MyApp;