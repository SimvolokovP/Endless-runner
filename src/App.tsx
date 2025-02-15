import { useEffect, useState } from "react";
import MobileBar from "./components/MobileBar/MobileBar";
import GamePage from "./pages/GamePage/GamePage";
import { Route, Routes } from "react-router-dom";
import useUserStore from "./store/useUserStore";
import ShopPage from "./pages/ShopPage/ShopPage";
import { useTg } from "./hooks/useTg";

function App() {
  const [isStart, setIsStart] = useState<boolean>(false);
  const { user } = useTg();
  const { logIn } = useUserStore();

  useEffect(() => {
    const fetchUser = async () => {
      await logIn(user?.id || 227072);
    };

    fetchUser();
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<GamePage isStart={isStart} setIsStart={setIsStart} />}
        ></Route>
        <Route path="/store" element={<ShopPage />}></Route>
      </Routes>
      <MobileBar isStart={isStart} />
    </>
  );
}

export default App;
