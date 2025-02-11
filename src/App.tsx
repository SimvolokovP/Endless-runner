import { useState } from "react";
import MobileBar from "./components/MobileBar/MobileBar";
import GamePage from "./pages/GamePage/GamePage";
import { Route, Routes } from "react-router-dom";

function App() {
  const [isStart, setIsStart] = useState<boolean>(false);

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
