import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
//import { createContact } from '../../redux/actions'

export default function Tech() {
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
    <div id="background">
      <div id="centering">
        <br />
        <h2>Necesitas asistencia tecnica?</h2>
      </div>
      <div className="FormDiv">
        <form className="LogInForm">
          <label className="FormLabel">Contactate</label>
          <select
            className="FormInput"
            type="text"
            name="subject"
            value={input.subject}
            onChange={(e) => handleChange(e)}
          >
            <option>Asistencia en..</option>
            <option value="product" defaultValue>
              Baterias
            </option>
            <option value="service">Modulos</option>
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
            Enviar
          </button>
        </form>
        <Snackbar open={Edited} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={() => handleClose()}
            severity="success"
            sx={{ width: "100%" }}
          >
            <AlertTitle>Enviar</AlertTitle>
            <strong>
              Tu mensaje fue enviado, pronto te contactaremos para cordinar tu
              turno
            </strong>
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
