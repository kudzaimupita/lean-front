import React, { useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";
import Theme from "components/template/Theme";
import Layout from "components/layout";
import { setResources } from "./store/theme/themeSlice";
import history from "./history";
import mockServer from "./mock";
import appConfig from "configs/app.config";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { getNewFluidResources } from "./services/Fluid.resourceService";
import "./locales";

const environment = process.env.NODE_ENV;

// if (appConfig.enableMock) {
// 	mockServer({ environment })
// }
const stripePromise = loadStripe(
  "pk_test_51HRQu6C881dTL9o4agsuRGi2tLTVoQancReouVVlz3rq1Ljl6nWcLoil3oLKufSeJouBWP3EkWdS2H375ViNK60e00NlnXjZDW"
);
function App() {
  // const dispatch=useDispatch()
  useEffect(() => {
    (async () => {
      const routes = await getNewFluidResources();
      store.dispatch(setResources(routes.data.results));
    })();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter history={history}>
          <Theme>
            <Elements stripe={stripePromise}>
              <Layout />
            </Elements>
          </Theme>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
