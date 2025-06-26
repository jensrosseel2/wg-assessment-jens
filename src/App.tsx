import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserOverview from "./pages/UserOverview";

const queryClient = new QueryClient();

const App = () => {
  return (
    <div className="container">
      <QueryClientProvider client={queryClient}>
        <UserOverview />
      </QueryClientProvider>
    </div>
  );
};

export default App;
