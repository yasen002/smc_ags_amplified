import { Amplify } from "aws-amplify";
import "../styles/globals.css";
import awsExports from "../src/aws-exports.js";

awsExports.oauth.redirectSignIn = `${process.env.NEXT_PUBLIC_REDIRECT_URL}`;
awsExports.oauth.redirectSignOut = `${process.env.NEXT_PUBLIC_REDIRECT_URL}`;

Amplify.configure({ ...awsExports, ssr: true });
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
