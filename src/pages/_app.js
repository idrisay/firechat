import Layout from "@/components/layout";
import "@/styles/globals.css";
import { AppWrapper } from "../utils/context";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AppWrapper>
        <Layout>
        <Component {...pageProps} />
        </Layout>
      </AppWrapper>
    </>
  );
}
