import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { createProd } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function CreateProduct() {
  const dispatch = useDispatch();

  const [inputForm, setInputForm] = useState({
    precio: 0,
  });
  console.log(inputForm);

  function handleChange(e) {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value,
    });
  }

  const uploadPrice = async (e) => {
    const price = e.target.value;
    const dolar = e.target.value;

    const aux = price * dolar;
    setInputForm({
      ...inputForm,
      precio: aux,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(createProd(inputForm));
    setInputForm({
      precio: 0,
    });
  }

  return (
    <div id="centering">
      <br />
      <h2>Agregar producto Nuevo</h2>

      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>Tipo Dolar</Form.Label>
          <Form.Select
            value={inputForm.dolar}
            name="dolar"
            onChange={(e) => uploadPrice(e)}
          >
            <option>Seleccione</option>
            <option value={400}>Blue</option>
            <option value={210}>Oficial</option>
            <option value={410}>Proveedor</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name="precio"
            onChange={(e) => uploadPrice(e)}
            placeholder="45"
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Cargar
        </Button>
      </Form>
      <br />
      <br />
    </div>
  );
}
