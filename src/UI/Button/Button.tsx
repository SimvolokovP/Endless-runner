import { FC, ReactElement } from "react";

import "./Button.scss";

interface ButtonProps {
  children?: ReactElement | string;
  handleClick?: () => void;
  fs?: number;
  isLineAnimation?: boolean;
  width?: number;
}

const Button: FC<ButtonProps> = ({
  children = "",
  handleClick,
  fs = 16,
  isLineAnimation = false,
  width = 320,
}) => {
  return (
    <button className="btn" onClick={handleClick}>
      <span
        style={{
          fontSize: `${fs}px`,
          animation: isLineAnimation ? "line-text 3s linear 1s infinite" : "",
          whiteSpace: isLineAnimation ? "nowrap" : "wrap",
          width: `${width}px`,
        }}
      >
        {children}
      </span>
    </button>
  );
};

export default Button;
