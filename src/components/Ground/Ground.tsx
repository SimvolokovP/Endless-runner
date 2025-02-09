import { FC } from "react";

import "./Ground.scss";

interface GroundProps {
  position: number;
}

const Ground: FC<GroundProps> = ({ position }) => (
  <div
    className="ground"
    style={{
      bottom: `${position}px`,
    }}
  ></div>
);

export default Ground;
