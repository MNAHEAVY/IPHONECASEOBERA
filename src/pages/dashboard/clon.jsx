import React, { useState } from "react";

function Form() {
  const [inputForm, setInputForm] = useState({
    categorias: "",
    subCategoria: "",
    nombre: "",
    marca: "",
    descripcion: "",
    imagenGeneral: [],
    stockGeneral: 0,
    estado: "",
    precioBase: 0,
    disponible: false,
    tipo: "",
    color: [{ nombre: "", imageColor: "", stockColor: 0, estado: "" }],
    almacenamiento: [],
    modelo: [],
  });

  /*manejadores de color*/
  const handleColorChange = (index, event) => {
    const newColor = [...inputForm.color];
    newColor[index][event.target.name] = event.target.value;
    setInputForm({ ...inputForm, color: newColor });
  };

  const addColor = () => {
    setInputForm({
      ...inputForm,
      color: [
        ...inputForm.color,
        { nombre: "", imageColor: "", stockColor: 0, estado: "" },
      ],
    });
  };

  const removeColor = (index) => {
    const newColor = [...inputForm.color];
    newColor.splice(index, 1);
    setInputForm({ ...inputForm, color: newColor });
  };

  /*manejadores de color*/

  /*manejadores de modelo*/
  const handleModelChange = (index, event) => {
    const newModel = [...inputForm.modelo];
    newModel[index][event.target.name] = event.target.value;
    setInputForm({ ...inputForm, modelo: newModel });
  };
  const addModel = () => {
    setInputForm({
      ...inputForm,
      modelo: [
        ...inputForm.modelo,
        {
          nombre: "",
          precio: 0,
          stockModel: 0,
          disponible: false,
          imageModel: "",
        },
      ],
    });
  };

  const removeModel = (index) => {
    const newModel = [...inputForm.modelo];
    newModel.splice(index, 1);
    setInputForm({ ...inputForm, modelo: newModel });
  };

  /*manejadores de modelo*/
  /*manejadores de alamcenamiento*/
  const handleStorageChange = (index, event) => {
    const newStorage = [...inputForm.almacenamiento];
    newStorage[index][event.target.name] = event.target.value;
    setInputForm({ ...inputForm, almacenamiento: newStorage });
  };
  const addStorage = () => {
    setInputForm({
      ...inputForm,
      almacenamiento: [
        ...inputForm.almacenamiento,
        {
          capacidad: "",
          precio: 0,
          stockStorage: 0,
          disponible: false,
          estado: "",
        },
      ],
    });
  };

  const removeStorage = (index) => {
    const newStorage = [...inputForm.almacenamiento];
    newStorage.splice(index, 1);
    setInputForm({ ...inputForm, almacenamiento: newStorage });
  };

  /*manejadores de alamcenamiento*/

  return (
    <form>
      {/* Aquí irían los demás campos de entrada */}

      <button type="button" onClick={addColor}>
        Añadir color
      </button>

      {inputForm.color.map((color, index) => (
        <div key={index}>
          <input
            type="text"
            name="nombre"
            value={color.nombre}
            onChange={(event) => handleColorChange(index, event)}
          />
          <input
            type="text"
            name="imageColor"
            value={color.imageColor}
            onChange={(event) => handleColorChange(index, event)}
          />
          <input
            type="number"
            name="stockColor"
            value={color.stockColor}
            onChange={(event) => handleColorChange(index, event)}
          />
          <input
            type="text"
            name="estado"
            value={color.estado}
            onChange={(event) => handleColorChange(index, event)}
          />

          <button type="button" onClick={() => removeColor(index)}>
            Eliminar color
          </button>
        </div>
      ))}

      {/* Aquí irían los demás botones y elementos del formulario */}
      <button type="button" onClick={addModel}>
        Añadir modelo
      </button>

      {inputForm.modelo.map((model, index) => (
        <div key={index}>
          <label> Modelo </label>
          <select
            value={model.nombre}
            name="nombre"
            onChange={(event) => handleModelChange(index, event)}
          >
            <option>Seleccione</option>
            <option value="Generico">Generico</option>
            <option value="14 Pro Max">14 Pro Max</option>
            <option value="14 Pro">14 Pro</option>
            <option value="14 Plus">14 Plus</option>
            <option value="14">14</option>
            <option value="13 Pro Max">13 Pro Max</option>
            <option value="13 Pro">13 Pro</option>
            <option value="13 Mini">13 Mini</option>
            <option value="13">13</option>
            <option value="12 Pro Max">12 Pro Max</option>
            <option value="12 Pro">12 Pro</option>
            <option value="12 Mini">12 Mini</option>
            <option value="12">12</option>
            <option value="11 Pro Max">11 Pro Max</option>
            <option value="11 Pro">11 Pro</option>
            <option value="11">11</option>
            <option value="SE(3rd)">SE(3rd)</option>
            <option value="SE(2rd)">SE(2rd)</option>
            <option value="iPhone XS">iPhone-XS</option>
            <option value="iPhone XS Max">iPhone-XS Max</option>
            <option value="iPhone XR">iPhone-XR</option>
            <option value="iPhone X">iPhone-X</option>
            <option value="iPhone 8 Plus">iPhone-8-Plus</option>
            <option value="iPhone 8">iPhone-8</option>
            <option value="iPhone 7 Plus">iPhone-7-Plus</option>
            <option value="iPhone 7">iPhone-7</option>
          </select>

          <input
            type="number"
            name="precio"
            value={model.precio}
            onChange={(event) => handleModelChange(index, event)}
          />
          <input
            type="number"
            name="stockModel"
            value={model.stockModel}
            onChange={(event) => handleModelChange(index, event)}
          />
          <input
            type="checkbox"
            name="disponible"
            checked={model.disponible}
            onChange={(event) => handleModelChange(index, event)}
          />
          <input
            type="text"
            name="imageModel"
            value={model.imageModel}
            onChange={(event) => handleModelChange(index, event)}
          />

          <button type="button" onClick={() => removeModel(index)}>
            Eliminar modelo
          </button>
        </div>
      ))}
      <button type="button" onClick={addStorage}>
        Añadir almacenamiento
      </button>

      {inputForm.almacenamiento.map((storage, index) => (
        <div key={index}>
          <select
            type="text"
            name="capacidad"
            value={storage.capacidad}
            onChange={(event) => handleStorageChange(index, event)}
          >
            <option>Seleccione</option>
            <option value="64 GB">64GB</option>
            <option value="128 GB">128GB</option>
            <option value="256 GB">256GB</option>
            <option value="512 GB">512GB</option>
            <option value="1024 GB">1024GB</option>
          </select>
          <input
            type="number"
            name="precio"
            value={storage.precio}
            onChange={(event) => handleStorageChange(index, event)}
          />
          <input
            type="number"
            name="stockStorage"
            value={storage.stockStorage}
            onChange={(event) => handleStorageChange(index, event)}
          />
          <input
            type="checkbox"
            name="disponible"
            checked={storage.disponible}
            onChange={(event) => handleStorageChange(index, event)}
          />
          <input
            type="text"
            name="estado"
            value={storage.estado}
            onChange={(event) => handleStorageChange(index, event)}
          />

          <button type="button" onClick={() => removeStorage(index)}>
            Eliminar almacenamiento
          </button>
        </div>
      ))}
    </form>
  );
}

export default Form;
