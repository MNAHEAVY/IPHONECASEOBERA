import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
//import { createContact } from '../../redux/actions'

import "./ContactUs.css";

export default function ContactUs() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    subject: "",
    name: "",
    email: "",
    message: "",
  });

  const [Edited, setEdited] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setEdited(false);
  };
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createContact(input));
    setInput({
      subject: "",
      name: "",
      email: "",
      message: "",
    });
    setEdited(true);
  }

  return (
    <div>
      <br />
      <div id="centering">
        <h2>Si tiene dudas, infórmenos.</h2>
      </div>
      <div className="FormDiv">
        <form className="LogInForm">
          <label className="FormLabel">Asunto</label>
          <select
            className="FormInput"
            type="text"
            name="subject"
            value={input.subject}
            onChange={(e) => handleChange(e)}
          >
            <option>Aplique uno</option>
            <option value="product" defaultValue>
              Productos
            </option>
            <option value="service">Servicios</option>
            <option value="other">Otros</option>
          </select>
          <input
            className="FormInput"
            value={input.name}
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Tu nombre"
            name="name"
            required
          />
          <input
            className="FormInput"
            value={input.email}
            onChange={(e) => handleChange(e)}
            type="email"
            placeholder="Tu correo"
            name="email"
            required
          />
          <label className="FormLabel">Mensaje</label>
          <textarea
            className="FormInput FormTextArea"
            type="textarea"
            name="message"
            value={input.message}
            onChange={(e) => handleChange(e)}
            cols="30"
            rows="10"
          ></textarea>
          <button className="SubmitBtn" type="submit" onClick={handleSubmit}>
            enviar
          </button>
        </form>
        <Snackbar open={Edited} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={() => handleClose()}
            severity="success"
            sx={{ width: "100%" }}
          >
            <AlertTitle>Enviar</AlertTitle>
            <strong>Tu mensaje fue enviado, pronto te contactaremos</strong>
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
