import React, { useState } from "react";
import { IoMdContacts } from "react-icons/io";
import { MdCompare } from "react-icons/md";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import "./styles.css";
import { AiOutlineQuestionCircle } from "react-icons/ai";

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
          <Icon>
            Contactanos
            <IoMdContacts />
          </Icon>
        </button>
        <button>
          <Icon>
            Comparativas
            <MdCompare />
          </Icon>
        </button>
        <button>
          <Icon>
            Servicio tecnico
            <HiOutlineWrenchScrewdriver />
          </Icon>
        </button>
        <button>
          <Icon>
            FAQ
            <AiOutlineQuestionCircle />
          </Icon>
        </button>
      </div>
    </div>
  );
}
