import { useEffect, useState } from "react";
import MobileBar from "./components/MobileBar/MobileBar";
import GamePage from "./pages/GamePage/GamePage";
import { Route, Routes } from "react-router-dom";
import useUserStore from "./store/useUserStore";

function App() {
  const [isStart, setIsStart] = useState<boolean>(false);
  const { logIn } = useUserStore();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await logIn(227070);
      console.log(user);
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
      </Routes>
      <MobileBar isStart={isStart} />
    </>
  );
}

export default App;
