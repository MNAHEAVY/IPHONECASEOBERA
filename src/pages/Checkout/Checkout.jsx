import { useState } from "react";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import EmptyCart from "../empty/emptyCart";
import RemoveCircleTwoToneIcon from "@mui/icons-material/RemoveCircleTwoTone";
import { useDispatch, useSelector } from "react-redux";
import "./Checkout.css";
import { deleteCartItemAction } from "../../redux/actions";

initMercadoPago("APP_USR-8c926d78-0d84-43b8-a918-9da21227b3a9", {
  locale: "es-AR",
});

export default function Checkout() {
  const dispatch = useDispatch();
  const buyer = useSelector((state) => state.checkUser);
  const products = useSelector((state) => state.cart);

  const getTotalPrice = () => {
    let totalPrice = 0;
    products.forEach((item) => {
      totalPrice += item.price;
    });
    return totalPrice.toFixed(2);
  };
  const [price, setPrice] = useState(getTotalPrice());

  const onSubmit = async (formData) => {
    const preferenceData = {
      items: products,
      purpose: "wallet_purchase",
    };

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
    <div className='checkout-container'>
      {products && products.length <= 0 ? (
        <EmptyCart />
      ) : (
        <>
          <div className='checkout-header'>
            <h1>Concreta tu Compra!</h1>
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
                    <h4 className='product-price'>${item.price}</h4>
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

          <div className='checkout-total'>
            <h4>Precio total: ${price}</h4>
          </div>
          <br />
          <br />
        </>
      )}
    </div>
  );
}
