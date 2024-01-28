import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getAllProductsAction, putProdAction } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "../Loading/Loading";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function AllProducts() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProductDetails, setEditedProductDetails] = useState({
    nombre: "",
    disponible: true,
    tipo: "",
    stockGeneral: 0,
    precioBase: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllProductsAction()).then(() => setLoading(false));
  }, [dispatch]);

  const handleEdit = (productId) => {
    setEditingProductId(productId);
    const editedProduct = products.find((product) => product._id === productId);
    setEditedProductDetails({
      nombre: editedProduct.nombre,
      disponible: editedProduct.disponible,
      tipo: editedProduct.tipo,
      stockGeneral: editedProduct.stockGeneral,
      precioBase: editedProduct.precioBase,
    });
  };

  const saveChanges = async (productId) => {
    try {
      await dispatch(putProdAction(productId, editedProductDetails));
      setEditingProductId(null);

      // Actualizar el estado local con la información editada
      setEditedProductDetails({
        nombre: "",
        disponible: true,
        tipo: "",
        stockGeneral: 0,
        precioBase: 0,
      });

      // Volver a cargar los productos después de la edición
      dispatch(getAllProductsAction());
    } catch (error) {
      console.error("Error updating product", error);
    }
  };
  const filteredProducts = products.filter((product) =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <br />
      <span id='arrowBack'>
        <Link to='/admin'>
          <ArrowBackIosIcon />
        </Link>
      </span>
      <div id='centering'>
        {loading ? (
          <Loading />
        ) : (
          <React.Fragment>
            <br />
            <h2>Todos los productos</h2>
            <div id='search-bar'>
              <input
                type='text'
                placeholder='Buscar por nombre...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div id='angost'>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Imagen</TableCell>
                    <TableCell>Codigo</TableCell>
                    <TableCell>Disponible</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Precio</TableCell>
                    <TableCell align='right'>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <Link to={"/edit/" + product._id}>
                          <Tooltip title='Edicion personalizada'>
                            <img
                              src={product.imagenGeneral?.[0]}
                              style={{ height: "60px", width: "auto" }}
                            ></img>
                          </Tooltip>
                        </Link>
                      </TableCell>

                      <TableCell>
                        {editingProductId === product._id ? (
                          <input
                            type='text'
                            value={editedProductDetails.nombre}
                            onChange={(e) =>
                              setEditedProductDetails({
                                ...editedProductDetails,
                                nombre: e.target.value,
                              })
                            }
                          />
                        ) : (
                          product.nombre
                        )}
                      </TableCell>
                      {/* Resto de las celdas del cuerpo de la tabla */}
                      <TableCell>
                        {editingProductId === product._id ? (
                          <select
                            value={editedProductDetails.disponible}
                            onChange={(e) =>
                              setEditedProductDetails({
                                ...editedProductDetails,
                                disponible: e.target.value === "true",
                              })
                            }
                          >
                            <option value={true}>Si</option>
                            <option value={false}>No</option>
                          </select>
                        ) : product.disponible ? (
                          "Si"
                        ) : (
                          "No"
                        )}
                      </TableCell>
                      <TableCell>
                        {editingProductId === product._id ? (
                          <input
                            type='text'
                            value={editedProductDetails.tipo}
                            onChange={(e) =>
                              setEditedProductDetails({
                                ...editedProductDetails,
                                tipo: e.target.value,
                              })
                            }
                          />
                        ) : (
                          product.tipo
                        )}
                      </TableCell>
                      <TableCell>
                        {editingProductId === product._id ? (
                          <input
                            type='number'
                            value={editedProductDetails.stockGeneral}
                            onChange={(e) =>
                              setEditedProductDetails({
                                ...editedProductDetails,
                                stockGeneral: parseInt(e.target.value, 10),
                              })
                            }
                          />
                        ) : (
                          product.stockGeneral
                        )}
                      </TableCell>
                      <TableCell>
                        {editingProductId === product._id ? (
                          <input
                            type='number'
                            value={editedProductDetails.precioBase}
                            onChange={(e) =>
                              setEditedProductDetails({
                                ...editedProductDetails,
                                precioBase: parseFloat(e.target.value),
                              })
                            }
                          />
                        ) : (
                          `$${product.precioBase}`
                        )}
                      </TableCell>
                      <TableCell align='right'>
                        {editingProductId === product._id ? (
                          <button onClick={() => saveChanges(product._id)}>
                            Guardar
                          </button>
                        ) : (
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => handleEdit(product._id)}
                          >
                            <EditIcon />
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <br />
            <Link to='/admin'>Volver al Panel</Link>
          </React.Fragment>
        )}
      </div>
    </>
  );
}
