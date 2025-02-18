import { useEffect, useState } from "react";
import MobileBar from "./components/MobileBar/MobileBar";
import GamePage from "./pages/GamePage/GamePage";
import { Route, Routes, useNavigate } from "react-router-dom";
import useUserStore from "./store/useUserStore";
import ShopPage from "./pages/ShopPage/ShopPage";
import { useTg } from "./hooks/useTg";
import LeaderboardPage from "./pages/LeaderboardPage/LeaderboardPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  const [isStart, setIsStart] = useState<boolean>(false);
  const { user, tg } = useTg();
  const { logIn } = useUserStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!tg.ready()) {
      navigate("/notFound");
    }
  }, [tg]);

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
        <Route path="/leaders" element={<LeaderboardPage />}></Route>
        <Route path="/notFound" element={<NotFoundPage />}></Route>
      </Routes>
      {tg.ready() && <MobileBar isStart={isStart} />}
      <MobileBar isStart={isStart} />
    </>
  );
}

export default App;
