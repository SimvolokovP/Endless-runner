import { NavLink } from "react-router-dom";
import "./MobileBar.scss";
import { FC } from "react";
import { navLinks } from "../../navLinks";

interface MobileBarProps {
  isStart: boolean;
}

const MobileBar: FC<MobileBarProps> = ({ isStart }) => {
  return (
    <div className={isStart ? "mobile-bar mobile-bar--hide" : "mobile-bar"}>
      <ul className="list-reset mobile-bar__list">
        {navLinks.map((link) => (
          <li key={link.to}>
            <NavLink
              className={(e) =>
                e.isActive ? "mobile-bar__link active" : "mobile-bar__link"
              }
              to={link.to}
            >
              {<link.icon />}
              <span>{link.text}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileBar;
