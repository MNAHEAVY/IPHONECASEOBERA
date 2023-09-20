import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateUserAction } from "../../redux/actions"; // Import your Redux Toolkit action
import { ToastContainer } from "react-toastify";

export default function EditUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.checkUser);

  // Create local state to manage form data
  const [formData, setFormData] = useState({
    email: user?.email,
    family_name: user?.family_name,
    given_name: user?.given_name,
    phone: user?.phone,
    identification: {
      verify: user?.identification?.verify,
      type: user?.identification.type,
      number: user?.identification.number,
    },
    address: {
      verify: user?.address?.verify,
      country: user?.address.country,
      state: user?.address.state,
      city: user?.address.city,
      street_name: user?.address.street_name,
      street_number: user?.address.street_number,
      codigo_postal: user?.address.codigo_postal,
    },
    terms: user?.terms,
    id: user?._id,
  });

  console.log(formData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => {
      // Split the name by '.' to handle nested properties
      const nameParts = name.split(".");
      if (type === "checkbox") {
        if (nameParts.length === 2) {
          // Handle nested properties for checkboxes
          const [parentName, childName] = nameParts;
          return {
            ...prevData,
            [parentName]: {
              ...prevData[parentName],
              [childName]: checked,
            },
          };
        } else {
          return {
            ...prevData,
            [name]: checked,
          };
        }
      } else if (nameParts.length === 2) {
        // Handle nested properties
        const [parentName, childName] = nameParts;
        return {
          ...prevData,
          [parentName]: {
            ...prevData[parentName],
            [childName]: value,
          },
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the updateUser action to update the user? data in Redux store
    dispatch(updateUserAction(formData));
  };

  return (
    <div className='container'>
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        Editar mis datos
      </h2>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-md-6'>
            <div className='mb-3'>
              <label className='form-label'>Nombre/s:</label>
              <input
                type='text'
                className='form-control'
                name='given_name'
                value={formData.given_name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='mb-3'>
              <label className='form-label'>Apellido:</label>
              <input
                type='text'
                className='form-control'
                name='family_name'
                value={formData.family_name}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Email:</label>
          <input
            type='text'
            className='form-control'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Celular:</label>
          <input
            type='number'
            className='form-control'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <h3
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          Datos de Identidad
        </h3>
        <div className='row'>
          <div className='col-md-6'>
            <div className='mb-3'>
              <label className='form-label'>Tipo de identificación:</label>
              <select
                className='form-select'
                name='identification.type'
                value={formData.identification.type}
                onChange={handleChange}
              >
                <option value='DNI'>DNI</option>
                <option value='CUIL'>CUIL/CUIT</option>
              </select>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='mb-3'>
              <label className='form-label'>Número:</label>
              <input
                type='number'
                className='form-control'
                name='identification.number'
                value={formData.identification.number}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div
          className='mb-3'
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label className='form-check-label'>Debe validar estos datos:</label>
          <input
            style={{
              height: "1.5em",
              width: "1.5em",
              margin: "1rem",
            }}
            type='checkbox'
            name='identification.verify'
            className='form-check-input'
            checked={formData.identification.verify}
            onChange={handleChange}
            required
          />
        </div>
        <h3
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          Datos de Direccion
        </h3>
        <div className='row'>
          <div className='col-md-6'>
            <div className='mb-3'>
              <label className='form-label'>País:</label>
              <input
                type='text'
                className='form-control'
                name='address.country'
                value={formData.address.country}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='mb-3'>
              <label className='form-label'>Provincia:</label>
              <input
                type='text'
                className='form-control'
                name='address.state'
                value={formData.address.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='mb-3'>
              <label className='form-label'>Ciudad:</label>
              <input
                type='text'
                name='address.city'
                className='form-control'
                value={formData.address.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='mb-3'>
              <label className='form-label'>Codigo Postal:</label>
              <input
                type='text'
                className='form-control'
                name='address.codigo_postal'
                value={formData.address.codigo_postal}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='mb-3'>
              <label className='form-label'>Nombre de la calle:</label>
              <input
                type='text'
                className='form-control'
                name='address.street_name'
                value={formData.address.street_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='mb-3'>
              <label className='form-label'>Número de la calle:</label>
              <input
                type='number'
                className='form-control'
                name='address.street_number'
                value={formData.address.street_number}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div
          className='mb-3'
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label className='form-check-label'>Verifica los datos de dirección:</label>
          <input
            style={{
              height: "1.5em",
              width: "1.5em",
              margin: "1rem",
            }}
            type='checkbox'
            className='form-check-input'
            name='address.verify'
            checked={formData.address.verify}
            onChange={handleChange}
            required
          />
        </div>
        <h3
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          Para finalizar, debes aceptar los
          <Link to='/terms'> términos y condiciones </Link> y guardar tus datos
        </h3>
        <div
          className='mb-3'
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label className='form-check-label'>Aceptar Términos y Condiciones:</label>
          <input
            style={{
              height: "1.5em",
              width: "1.5em",
              margin: "1rem",
            }}
            type='checkbox'
            className='form-check-input'
            name='terms'
            checked={formData.terms}
            onChange={handleChange}
            required
          />
        </div>
        <div
          className='mb-3'
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <button type='submit' className='btn btn-primary'>
            Guardar
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
