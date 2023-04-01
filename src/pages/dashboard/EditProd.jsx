import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, putProd } from "../../redux/actions";
//import "./Prod.css";

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

  return (
    <div className="ProdEditContainer">
      <div className="ProdEditMargin">
        <h1>SUPER ADMIN PRODUCTS EDITION V-3.1</h1>
      </div>
      <div className="ProdEditMargin">
        <h3>Prod edit</h3>
      </div>
      <div className="ProdEditMargin">
        <form onSubmit={(e) => handleSubmit(e)}>
          <br />

          <label>Linea</label>
          <select
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
          </select>

          <br />
          <label>Categorias</label>
          <select
            value={input.categorias}
            name="categorias"
            onChange={(e) => handleChange(e)}
          >
            <option value={"Iphone"}>Iphone</option>
            <option value={"Accesorios"}>Accesorios</option>
            <option value={"Watch"}>Watch</option>
            <option value={"Airpods"}>Airpods</option>
          </select>
          <br />
          <label>Nombre</label>
          <input
            type="text"
            value={input.nombre}
            name="nombre"
            onChange={(e) => handleChange(e)}
          ></input>
          <br />
          <label>Color</label>
          <input
            type="text"
            value={input.color}
            name="color"
            onChange={(e) => handleChange(e)}
          ></input>
          <br />
          <label>Marca</label>
          <input
            type="text"
            value={input.marca}
            name="marca"
            onChange={(e) => handleChange(e)}
          ></input>
          <br />
          <label>Precio</label>
          <input
            type="number"
            value={input.precio}
            name="precio"
            onChange={(e) => handleChange(e)}
          ></input>
          <br />
          <label>Imagen</label>
          <input
            type="text"
            value={input.imagen}
            name="imagen"
            onChange={(e) => handleChange(e)}
          ></input>
          <br />
          <label>Modelo</label>
          <input
            value={input.modelo}
            name="modelo"
            onChange={(e) => handleChange(e)}
          ></input>
          <br />
          <label>Stock</label>
          <input
            type="number"
            value={input.stock}
            name="stock"
            onChange={(e) => handleChange(e)}
          ></input>
          <br />
          <label>Descripcion</label>
          <input
            type="text"
            value={input.descripcion}
            name="descripcion"
            onChange={(e) => handleChange(e)}
          ></input>
          <br />
          <label>Almacenamiento</label>
          <select
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
          <br />
          <label>Estado</label>
          <input
            value={input.estado}
            name="estado"
            onChange={(e) => handleChange(e)}
          ></input>
          <br />
          <label>Disponible</label>
          <select
            value={input.disponible}
            name="disponible"
            onChange={(e) => handleChange(e)}
          >
            <option value={true}>Si</option>
            <option value={false}>No</option>
          </select>
          <div className="ProdEditMargin">
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
      </div>
    </div>
  );
}
