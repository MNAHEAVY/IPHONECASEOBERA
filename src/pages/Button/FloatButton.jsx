import React, { useState } from "react";
import "./styles.css";

const Icon = ({ children }) => (
  <span className="material-symbols-outlined">{children}</span>
);

export default function FloatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`fab ${isOpen ? "open" : ""}`}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <Icon>+</Icon>
      </button>
      <div className="menu">
        <button>
          <h6>chat</h6>
        </button>
        <button>
          <Icon>sell</Icon>
        </button>
        <button>
          <Icon>settings</Icon>
        </button>
      </div>
    </div>
  );
}
