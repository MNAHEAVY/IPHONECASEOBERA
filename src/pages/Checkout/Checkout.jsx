import { useState, useEffect } from "react";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import EmptyCart from "../empty/emptyCart";
import RemoveCircleTwoToneIcon from "@mui/icons-material/RemoveCircleTwoTone";
import { useDispatch, useSelector } from "react-redux";
import "./Checkout.css";
import { deleteCartItemAction } from "../../redux/actions";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import { Link } from "react-router-dom";
import VerifiedTwoToneIcon from "@mui/icons-material/VerifiedTwoTone";

initMercadoPago("APP_USR-8c926d78-0d84-43b8-a918-9da21227b3a9", {
  locale: "es-AR",
});

export default function Checkout() {
  const dispatch = useDispatch();
  const buyer = useSelector((state) => state.checkUser);
  const products = useSelector((state) => state.cart);
  const flete = useSelector((state) => state.values);
  const [value, setValue] = React.useState("retiro");
  const [send, setSend] = React.useState(0);
  const [price, setPrice] = useState(0);

  const handleValue = (event) => {
    setSend(event.target.value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    // Función para calcular el precio total
    const calculateTotalPrice = () => {
      let totalPrice = 0;
      products.forEach((item) => {
        totalPrice += item.price;
      });

      // Añadir el valor de envío si el valor es "envio"
      if (value === "envio") {
        totalPrice += parseFloat(send);
      }

      return totalPrice.toFixed(2);
    };

    // Actualizar el precio cuando cambien value o send
    setPrice(calculateTotalPrice());
  }, [value, send, products]);

  const onSubmit = async (formData) => {
    const preferenceData = {
      items: products,
      purpose: "wallet_purchase",
      envio: send,
      payer: buyer,
    };
    console.log("aca la posta", preferenceData);
    try {
      const response = await fetch(
        "https://iphonecaseoberab-production.up.railway.app/create_preference",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(preferenceData),
        }
      );
      console.log(preferenceData);
      const preference = await response.json();
      return preference.preferenceId;
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear la preferencia de pago");
    }
  };

  const onError = async (error) => {
    console.error(error);
  };

  const onReady = async () => {
    // Este callback se ejecuta cuando el botón de pago está listo para usarse.
    // Aquí podrías ocultar cualquier mensaje de carga.
  };

  const handleDeleteCartItem = (itemId) => {
    const userId = buyer._id;
    dispatch(deleteCartItemAction(userId, itemId));
  };

  return (
    <>
      {products && products.length <= 0 ? (
        <EmptyCart />
      ) : !(buyer.identification.verify && buyer.address.verify) ? (
        <div className='modal-contain'>
          <Link to='/edit'>
            <div className='modal-con'>
              <h3 className='modalhead'>Antes de continuar...</h3>
              <h4 className='modalbody'>Debes completar tus datos</h4>
              <VerifiedTwoToneIcon sx={{ fontSize: "3rem", color: "white" }} />
              <p className='modalgo'>Presiona para ir</p>
              <p className='modalcont'>
                Esto es por tu seguridad, queremos que tu compra sea exitosa
              </p>
            </div>
          </Link>
        </div>
      ) : (
        <div className='checkout-container'>
          <div className='checkout-header'>
            <h1>Concreta tu Compra!</h1>
          </div>
          <div>
            <FormControl>
              <FormLabel id='demo-controlled-radio-buttons-group'>
                Como te acercamos tu producto
              </FormLabel>
              <RadioGroup
                aria-labelledby='demo-controlled-radio-buttons-group'
                name='controlled-radio-buttons-group'
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value='retiro'
                  control={<Radio />}
                  label='Retiro en Local'
                />
                <FormControlLabel value='envio' control={<Radio />} label='Con Envio' />
              </RadioGroup>
            </FormControl>
          </div>
          {value === "envio" ? (
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel variant='standard' htmlFor='uncontrolled-native'>
                  Seleccione donde..
                </InputLabel>

                <NativeSelect
                  defaultValue={0}
                  onChange={handleValue}
                  inputProps={{
                    name: "Seleccione donde...",
                    id: "uncontrolled-native",
                  }}
                >
                  {flete?.costosDeEnvio.map((opcion, index) => (
                    <option key={index} value={opcion.costo}>
                      {opcion.lugar}
                    </option>
                  ))}
                  <option value={flete.flete}>Oberá</option>
                  <option value={0}>Selecione</option>
                </NativeSelect>
              </FormControl>
            </Box>
          ) : (
            <></>
          )}

          <div className='checkout-product-list'>
            <h3>Listado de Producto/s</h3>
            <br />

            {products?.map((item) => (
              <div key={item.product} className='product-item'>
                <div className='product-image'>
                  <img src={item.image} alt={item.name} loading='lazy' />
                </div>

                <div className='product-details'>
                  <div className='product-info'>
                    <h4 className='product-name'>{item.name}</h4>
                    <h4 className='product-price'>
                      ${item.price.toLocaleString("es-AR", { useGrouping: true })}
                    </h4>
                    <h4 className='product-brand'>{item.color}</h4>
                  </div>
                  <div className='product-quantity'>
                    <span>Cantidad: {item.quantity}</span>
                    <button onClick={() => handleDeleteCartItem(item._id)}>
                      <RemoveCircleTwoToneIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='checkout'>
            <div className='checkout-total'>
              <h6>Subtotal</h6>
              <hr />
              <ul>
                {products.map((item) => (
                  <div className='list'>
                    <li key={item.id}>{item.name}</li>
                    <h3>${item.price.toLocaleString("es-AR", { useGrouping: true })}</h3>
                  </div>
                ))}
                {value === "envio" ? (
                  <div className='list'>
                    {" "}
                    <li style={{ fontWeight: "bold" }}>Envío</li>
                    <h3>${send}</h3>{" "}
                  </div>
                ) : null}
              </ul>
              <hr />
              <div className='total'>
                <h5>Precio total:</h5>
                <h4> ${price.toLocaleString("es-AR", { useGrouping: true })}</h4>
              </div>
            </div>
          </div>
          <div className='checkout-payment'>
            <h2>Alternativas de Pago</h2>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "calc(100% - 315px)",
              height: "120px",
              position: "sticky",
            }}
          >
            <Wallet onSubmit={onSubmit} onReady={onReady} onError={onError} />
          </div>
          <br />
          <br />
        </div>
      )}
    </>
  );
}
