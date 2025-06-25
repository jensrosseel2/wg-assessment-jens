import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserOverview from "./pages/UserOverview";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserOverview />
    </QueryClientProvider>
  );
};

export default App;
