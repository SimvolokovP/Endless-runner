import { FC, useEffect, useState } from "react";

import "./Ground.scss";

interface GroundProps {
  speed: number;
  isStart: boolean;
}

const Ground: FC<GroundProps> = ({ speed, isStart }) => {
  const groundHeight = 645;
  const initialGrounds = [0, groundHeight];
  const [grounds, setGrounds] = useState(initialGrounds);

  useEffect(() => {
    if (isStart) {
      const interval = setInterval(() => {
        updateGrounds();
      }, 1000 / 60);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isStart]);

  const updateGrounds = () => {
    setGrounds((prevGrounds) => {
      return prevGrounds.map((ground) => {
        let newPosition = ground + speed * 10;
        if (newPosition >= groundHeight) {
          newPosition = -groundHeight;
        }
        return newPosition;
      });
    });
  };

  return (
    <>
      {grounds.map((position, index) => (
        <div
          className="ground"
          key={index}
          style={{
            bottom: `${position}px`,
          }}
        />
      ))}
    </>
  );
};

export default Ground;
