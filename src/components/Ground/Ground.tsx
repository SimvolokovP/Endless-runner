import { FC, useEffect, useState } from "react";

import "./Ground.scss";

interface GroundProps {
  speed: number;
}

const Ground: FC<GroundProps> = ({ speed }) => {
  const groundHeight = 645;
  const initialGrounds = [0, groundHeight];
  const [grounds, setGrounds] = useState(initialGrounds);

  useEffect(() => {
    const interval = setInterval(() => {
      updateGrounds();
    }, 1000 / 60);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
