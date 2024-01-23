import { appWithTranslation } from "next-i18next";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SWRConfig } from "swr";
import { wrapper } from "redux/configStore";

import "antd/dist/antd.css";
import "../styles/_app.scss";
import { getToken } from "services/api";
import { GoogleOAuthProvider } from "@react-oauth/google";
import WrapConponent from "@components//WrapComponent";

const onBeforeLift = (store: any) => () => {
  const currentState = store.getState();
  const { accessToken } = currentState?.AuthenticationSlice || {};
  if (accessToken) {
    getToken(accessToken);
  }
};

const MyApp = ({ Component, pageProps }: any) => {
  const store = useStore();
  const isClient = typeof window !== "undefined";

  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <SWRConfig>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID as string}
      >
        {isClient ? (
          <PersistGate
            persistor={(store as any).__persistor}
            loading={null}
            onBeforeLift={onBeforeLift(store)}
          >
            <WrapConponent>
              {getLayout(<Component {...pageProps} />)}
            </WrapConponent>
          </PersistGate>
        ) : (
          <Component {...pageProps} />
        )}
      </GoogleOAuthProvider>
    </SWRConfig>
  );
};

export default wrapper.withRedux(appWithTranslation(MyApp));
