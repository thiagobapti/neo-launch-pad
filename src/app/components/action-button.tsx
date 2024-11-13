import React from "react";

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className="bg-[#dc5301] rounded-md px-3 py-0.5 mt-2.5"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ActionButton;
