import { useEffect } from "react";
import { Board } from "./pages";
import { apiService } from "./services/api";
import { useBoardStore } from "./store/boardStore";

function App() {
  const { setBoardState } = useBoardStore();

  const fetchColumns = async () => {
    try {
      const columns = await apiService.getColumns();
      setBoardState({ columns });
    } catch (error) {
      console.error("Failed to fetch columns:", error);
    }
  };

  useEffect(() => {
    fetchColumns();
  }, []);

  return (
    <div className="container">
      <Board />
    </div>
  );
}

export default App;
