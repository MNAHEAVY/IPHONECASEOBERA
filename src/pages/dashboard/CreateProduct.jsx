import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { createProd } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function CreateProduct() {
  const dispatch = useDispatch();

  const [inputForm, setInputForm] = useState({
    linea: "",
    categorias: "",
    nombre: "",
    color: [],
    pickColor: [],
    marca: "",
    precio: 0,
    imagen: [],
    modelo: [],
    stock: 0,
    descripcion: "",
    almacenamiento: [],
    estado: [],
    disponible: false,
  });
  console.log(inputForm);

  function handleChange(e) {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(createProd(inputForm));
    setInputForm({
      linea: "",
      categorias: "",
      nombre: "",
      color: [],
      pickColor: [],
      marca: "",
      precio: 0,
      imagen: [],
      modelo: [],
      stock: 0,
      descripcion: "",
      almacenamiento: [],
      estado: [],
      disponible: false,
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
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={inputForm.nombre}
            name="nombre"
            onChange={(e) => {
              handleChange(e);
            }}
            placeholder="ej. iPhone 13"
          />
          <Form.Text className="text-muted">
            Nombre completo del producto.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Linea</Form.Label>
          <Form.Select name="linea" onChange={(e) => handleChange(e)}>
            <option>Seleccione</option>
            <option value={"Smartphone"}>Smartphone</option>
            <option value={"Fundas"}>Fundas</option>
            <option value={"Watch"}>Watch</option>
            <option value={"Glass"}>Glass</option>
            <option value={"Energia y Cables"}>Energia y Cables</option>
            <option value={"Airpods"}>Airpods</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Categorias</Form.Label>
          <Form.Select name="categorias" onChange={(e) => handleChange(e)}>
            <option>Seleccione</option>
            <option value={"Iphone"}>Iphone</option>
            <option value={"Accesorios"}>Accesorios</option>
            <option value={"Watch"}>Watch</option>
            <option value={"Airpods"}>Airpods</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            type="text"
            value={inputForm.imagen}
            name="imagen"
            onChange={(e) => handleChange(e)}
            placeholder="https://res.cloudinary.com/imagen.jpg"
          />
          <Form.Text className="text-muted">
            Si hay más de una imagen, sepárelas con una ",".
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Color</Form.Label>
          <Form.Control
            type="text"
            value={inputForm.color}
            name="color"
            onChange={(e) => handleChange(e)}
            placeholder="ej. Cyan"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Imagen Color</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            type="text"
            value={inputForm.pickColor}
            name="pickColor"
            onChange={(e) => handleChange(e)}
            placeholder="https://res.cloudinary.com/imagen.jpg"
          />
          <Form.Text className="text-muted">
            La imagen respectiva al color de arriba.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Marca</Form.Label>
          <Form.Control
            type="text"
            value={inputForm.marca}
            name="marca"
            onChange={(e) => handleChange(e)}
            placeholder="ej. Apple"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tipo Dolar</Form.Label>
          <Form.Select
            value={inputForm.dolar}
            name="dolar"
            onChange={(e) => handleChange(e)}
          >
            <option>Seleccione</option>
            <option value={"Smartphone"}>Blue</option>
            <option value={"Smartphone"}>Oficial</option>
            <option value={"Smartphone"}>Proveedor</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            value={inputForm.precio}
            name="precio"
            onChange={(e) => handleChange(e)}
            placeholder="45"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Modelo</Form.Label>
          <Form.Select
            value={inputForm.modelo}
            name="modelo"
            onChange={(e) => handleChange(e)}
          >
            <option>Seleccione</option>
            <option value={"Generico"}>Generico</option>
            <option value={"14 Pro Max"}>14 Pro Max</option>
            <option value={"14 Pro"}>14 Pro</option>
            <option value={"14 Plus"}>14 Plus</option>
            <option value={"14"}>14</option>
            <option value={"13 Pro Max"}>13 Pro Max</option>
            <option value={"13 Pro"}>13 Pro</option>
            <option value={"13 Mini"}>13 Mini</option>
            <option value={"13"}>13</option>
            <option value={"12 Pro Max"}>12 Pro Max</option>
            <option value={"12 Pro"}>12 Pro </option>
            <option value={"12 Mini"}>12 Mini</option>
            <option value={"12"}>12</option>
            <option value={"11 Pro Max"}>11 Pro Max</option>
            <option value={"11 Pro"}>11 Pro</option>
            <option value={"11"}>11</option>
            <option value={"SE(3rd)"}>SE(3rd)</option>
            <option value={"SE(2rd)"}>SE(2rd)</option>
            <option value={"iPhone XS"}>iPhone-XS</option>
            <option value={"iPhone XS Max"}>iPhone-XS Max</option>
            <option value={"iPhone XR"}>iPhone-XR</option>
            <option value={"iPhone X"}>iPhone-X</option>
            <option value={"iPhone 8 Plus"}>iPhone-8-Plus</option>
            <option value={"iPhone 8"}>iPhone-8</option>
            <option value={"iPhone 7 Plus"}>iPhone-7-Plus</option>
            <option value={"iPhone 7"}>iPhone-7</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            value={inputForm.stock}
            name="stock"
            onChange={(e) => handleChange(e)}
            type="number"
            placeholder="5"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={inputForm.descripcion}
            name="descripcion"
            onChange={(e) => handleChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Almacenamiento</Form.Label>
          <Form.Select
            value={inputForm.almacenamiento}
            name="almacenamiento"
            onChange={(e) => handleChange(e)}
          >
            <option>Seleccione</option>
            <option value={"64 GB"}>64GB</option>
            <option value={"128 GB"}>128GB</option>
            <option value={"256 GB"}>256GB</option>
            <option value={"512 GB"}>512GB</option>
            <option value={"1024 GB"}>1024GB</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Estado</Form.Label>
          <Form.Select
            value={inputForm.estado}
            name="estado"
            onChange={(e) => handleChange(e)}
          >
            <option>Seleccione</option>
            <option value={"Nuevo"}>Nuevo</option>
            <option value={"Swap"}>Swap</option>
            <option value={"Usado"}>Usado</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Disponible</Form.Label>
          <Form.Select
            value={inputForm.disponible}
            name="disponible"
            onChange={(e) => handleChange(e)}
          >
            <option>Seleccione</option>
            <option value={true}>Si</option>
            <option value={false}>No</option>
          </Form.Select>
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
