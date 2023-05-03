import { useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

interface DropdownProps {
  title: string;
  options: string[];
  initial: string;
  onSelect: (selected: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  options,
  initial,
  onSelect,
}) => {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState<string | undefined>(initial);

  const toggleDropdown = () => {
    setActive(!active);
  };

  const handleClick = (option: string) => {
    setSelected(option);
    onSelect(option);
  };

  const menuRef = useRef<HTMLDivElement>(null); // move inside component

  useOnClickOutside(menuRef, () => {
    setActive(false);
  });

  const renderOptions = () => {
    if (!options) return;

    return options.map((option, i) => (
      <li
        onClick={() => handleClick(option)}
        key={i}
        className={`dropdown__list-item ${
          option === selected ? "dropdown__list-item--active" : ""
        }`}
      >
        {option}
      </li>
    ));
  };

  return (
    <div ref={menuRef} className="dropdown">
      <div
        onClick={toggleDropdown}
        className="dropdown__toggle dropdown__list-item"
      >
        <div className="dropdown__top-section">
          <span> {`${title}  ${selected}`}</span>
          <span className="dropdown__arrow">{active ? "⇧" : "⇩"}</span>
        </div>
      </div>
      <ul
        className={`dropdown__list ${active ? "dropdown__list--active" : ""}`}
      >
        {renderOptions()}
      </ul>
    </div>
  );
};

export default Dropdown;
