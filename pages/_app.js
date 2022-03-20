import ProgressBar from "@badrap/bar-of-progress";
import "../styles/globals.css";
import Router from "next/router";
import 'mapbox-gl/dist/mapbox-gl.css';

function MyApp({ Component, pageProps }) {
  const progress = new ProgressBar({
    size: 3,
    color: "#FE595E",
    className: "z-50",
    delay: 100,
  });

  Router.events.on("routeChangeStart", progress.start);
  Router.events.on("routeChangeComplete", progress.finish);
  Router.events.on("routeChangeError", progress.finish);

  return <Component {...pageProps} />;
}

export default MyApp;
