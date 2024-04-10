export function calcularPrecioFinal(user, item, values) {
  if (user.isAdmin === true) {
    return Math.round(item.precioBase * values.dolarBlue * values.profit).toLocaleString(
      "es-AR",
      { useGrouping: true }
    );
  } else {
    return Math.round(
      item.precioBase * values.dolarBlue * values.profit * values.mp
    ).toLocaleString("es-AR", { useGrouping: true });
  }
}
