// client-side
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

initMercadoPago("TEST-75248d8b-4de4-4e93-9b7a-da01ee6d1347");

export default function Checkout() {
  const onSubmit = async (formData) => {
    const preferenceData = {
      items: [
        {
          id: "202809963",
          title: "Dummy title",
          description: "Dummy description",
          quantity: 1,
          unit_price: 10,
        },
      ],
      purpose: "wallet_purchase",
    };

    try {
      const response = await fetch("http://localhost:3001/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferenceData),
      });
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

  const customization = {
    texts: {
      action: "Comprar",
      valueProp: "Compra segura con Mercado Pago",
    },
  };

  return (
    <div id="centering">
      <Wallet
        onSubmit={onSubmit}
        onError={onError}
        onReady={onReady}
        customization={customization}
      />
    </div>
  );
}
