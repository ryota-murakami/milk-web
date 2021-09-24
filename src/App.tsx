import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  QueryFunctionContext,
  QueryKey,
} from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./components/Home";
import { apiBaseUrl } from "./constants";

export const defaultQueryFn = async <
  T extends any = any,
  TQueryKey extends QueryKey = QueryKey
>(
  key: QueryFunctionContext<TQueryKey>
): Promise<T> => {
  console.log(`${apiBaseUrl}${key.queryKey[0]}`);
  const r = await fetch(`${apiBaseUrl}${key.queryKey[0]}`, {
    credentials: "include",
  });
  if (r.status !== 200) {
    throw new Error(await r.text());
  }
  return await r.json();
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { queryFn: defaultQueryFn } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
