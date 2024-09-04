import DisplayWeather from "./Components/DisplayWeather";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <DisplayWeather />
      </div>
    </QueryClientProvider>
  );
}

export default App;
