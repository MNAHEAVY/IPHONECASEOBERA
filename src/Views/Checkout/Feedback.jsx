"use client";

import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  CheckIcon,
  ExclamationTriangleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function Feedback() {
  const [open, setOpen] = useState(true);
  const [searchParams] = useSearchParams();

  const status = searchParams.get("status");

  let icon;
  let iconColor;
  let title;
  let message;

  if (!status || status === "null") {
    icon = ExclamationTriangleIcon;
    iconColor = "text-gray-600";
    title = "Pago no completado";
    message =
      "No realizaste ninguna compra. Por favor, intenta nuevamente si deseas realizar una.";
  } else {
    switch (status) {
      case "approved":
        icon = CheckIcon;
        iconColor = "text-green-600";
        title = "¡Pago exitoso!";
        message =
          "Gracias por tu compra. En breve un asesor de ventas se pondrá en contacto contigo.";
        break;
      case "pending":
        icon = ClockIcon;
        iconColor = "text-yellow-600";
        title = "Pago pendiente";
        message = "Tu pago está pendiente. Te notificaremos cuando se complete.";
        break;
      case "failure":
        icon = ExclamationTriangleIcon;
        iconColor = "text-red-600";
        title = "Error en el pago";
        message = "Hubo un problema con tu pago. Por favor, intenta nuevamente.";
        break;
      default:
        icon = ExclamationTriangleIcon;
        iconColor = "text-gray-600";
        title = "Estado desconocido";
        message = "El estado del pago no es claro. Por favor, contacta al soporte.";
        break;
    }
  }

  return (
    <Dialog open={open} onClose={setOpen} className='relative z-10'>
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-gray-700  transition-opacity'
      />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <DialogPanel
            transition
            className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'
          >
            <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
              <div className='sm:flex sm:items-start'>
                <div
                  className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10 ${iconColor}`}
                >
                  {React.createElement(icon, { className: "h-6 w-6" })}
                </div>
                <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                  <DialogTitle
                    as='h3'
                    className='text-base font-semibold leading-6 text-gray-900'
                  >
                    {title}
                  </DialogTitle>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>{message}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
              <button
                type='button'
                onClick={() => setOpen(false)}
                className='inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-300 sm:ml-3 sm:w-auto'
              >
                <a href='/'> Volver al Inicio</a>
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
