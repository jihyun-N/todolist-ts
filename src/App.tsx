import React from "react";
import Layout from "./component/Layout";
import TodoListPage from "./component/TodoListPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout id="">
        <TodoListPage />
      </Layout>
    </QueryClientProvider>
  );
};

export default App;
