import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, putProd } from "../../redux/actions";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ProdEdit() {
  const dispatch = useDispatch();
  const prodEd = useSelector((state) => state.products);
  const { id } = useParams();
  const thisProd = prodEd.find((e) => e._id === id);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const [input, setInput] = useState({
    linea: thisProd.linea,
    categorias: thisProd.categorias,
    nombre: thisProd.nombre,
    color: thisProd.color,
    pickColor: pickColor,
    marca: thisProd.marca,
    precio: thisProd.precio,
    imagen: thisProd.imagen,
    modelo: thisProd.modelo,
    stock: thisProd.stock,
    descripcion: thisProd.descripcion,
    almacenamiento: thisProd.almacenamiento,
    estado: thisProd.estado,
    disponible: thisProd.disponible,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(putProd(id, input));
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleChangeImg(e) {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "imagen") {
      newValue = value.split(",").map((img) => img.trim()); // divide el valor en un array y elimina los espacios en blanco alrededor de cada imagen
    }
    setInputForm((prev) => ({ ...prev, [name]: newValue }));
  }

  function handleChangeCol(e) {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "color") {
      newValue = value.split(",").map((col) => col.trim()); // divide el valor en un array y elimina los espacios en blanco alrededor de cada imagen
    }
    setInputForm((prev) => ({ ...prev, [name]: newValue }));
  }

  function handleChangePick(e) {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "pickColor") {
      newValue = value.split(",").map((pik) => pik.trim()); // divide el valor en un array y elimina los espacios en blanco alrededor de cada imagen
    }
    setInputForm((prev) => ({ ...prev, [name]: newValue }));
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">SUPER ADMIN PRODUCTS EDITION V-3.1</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h3 className="text-center">Editor de Productos</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <label>Linea</label>
              <select
                className="form-control"
                value={input.linea}
                name="linea"
                onChange={(e) => handleChange(e)}
              >
                <option value={"Smartphone"}>Smartphone</option>
                <option value={"Fundas"}>Fundas</option>
                <option value={"Watch"}>Watch</option>
                <option value={"Glass"}>Glass</option>
                <option value={"Energia y Cables"}>Energia y Cables</option>
                <option value={"Airpods"}>Airpods</option>
                <option value={"Servicio Tecnico"}>Servicio Tecnico</option>
              </select>
            </div>
            <div className="form-group">
              <label>Categorias</label>
              <select
                className="form-control"
                value={input.categorias}
                name="categorias"
                onChange={(e) => handleChange(e)}
              >
                <option value={"Iphone"}>Iphone</option>
                <option value={"Accesorios"}>Accesorios</option>
                <option value={"Watch"}>Watch</option>
                <option value={"Airpods"}>Airpods</option>
                <option value={"Baterias"}>Baterias</option>
                <option value={"Modulos"}>Modulos</option>
                <option value={"Tapa trasera"}>Tapa trasera</option>
                <option value={"Camara"}>Camara</option>
                <option value={"Pin de carga"}>Pin de carga</option>
              </select>
            </div>
            <div className="form-group">
              <label>Nombre</label>
              <input
                className="form-control"
                type="text"
                value={input.nombre}
                name="nombre"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>

            <div className="form-group">
              <label>Color</label>
              <input
                className="form-control"
                type="text"
                value={input.color}
                name="color"
                onChange={(e) => handleChangeCol(e)}
              ></input>
            </div>

            <div className="form-group">
              <label>Imagen Color</label>
              <textarea
                className="form-control"
                type="text"
                value={input.pickColor}
                name="pickColor"
                onChange={(e) => handleChangePick(e)}
              ></textarea>
            </div>

            <div className="form-group">
              <label>Marca</label>
              <input
                className="form-control"
                type="text"
                value={input.marca}
                name="marca"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>

            <div className="form-group">
              <label>Precio</label>
              <input
                className="form-control"
                type="number"
                value={input.precio}
                name="precio"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>

            <div className="form-group">
              <label>Imagen</label>
              <textarea
                className="form-control"
                type="text"
                value={input.imagen}
                name="imagen"
                onChange={(e) => handleChangeImg(e)}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Modelo</label>
              <input
                className="form-control"
                value={input.modelo}
                name="modelo"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className="form-group">
              <label>Stock</label>
              <input
                className="form-control"
                type="number"
                value={input.stock}
                name="stock"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className="form-group">
              <label>Descripcion</label>
              <textarea
                className="form-control"
                type="text"
                value={input.descripcion}
                name="descripcion"
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Almacenamiento</label>
              <select
                className="form-control"
                value={input.almacenamiento}
                name="almacenamiento"
                onChange={(e) => handleChange(e)}
              >
                <option value={"64 GB"}>64GB</option>
                <option value={"128 GB"}>128GB</option>
                <option value={"256 GB"}>256GB</option>
                <option value={"512 GB"}>512GB</option>
                <option value={"1024 GB"}>1024GB</option>
              </select>
            </div>

            <div className="form-group">
              <label>Estado</label>
              <select
                className="form-control"
                value={input.estado}
                name="estado"
                onChange={(e) => handleChange(e)}
              >
                <option value={"Nuevo"}>Nuevo</option>
                <option value={"Swap"}>Swap</option>
              </select>
            </div>
            <div className="form-group">
              <label>Disponible</label>
              <select
                className="form-control"
                value={input.disponible}
                name="disponible"
                onChange={(e) => handleChange(e)}
              >
                <option value={true}>Si</option>
                <option value={false}>No</option>
              </select>
            </div>
            <br />
            <div id="centeringSideB">
              <button
                className="btn btn-outline-success me-2"
                type="submit"
                onClick={handleSubmit}
              >
                Modificar
              </button>
              <button className="btn btn-outline-success me-2">
                <Link to={"/admin"}>Cancelar</Link>
              </button>
            </div>
          </form>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
