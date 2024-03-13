import { NativePanel, ReactHookFormPanel } from "../panels";

import styles from "./app.module.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.container}>
        <ReactHookFormPanel />
        {/* <NativePanel /> */}
      </div>
    </QueryClientProvider>
  );
};
