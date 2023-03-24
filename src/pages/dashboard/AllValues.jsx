import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getValues } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "../Loading/Loading";

export default function Allvalues() {
  // Generate Order Data
  const values = useSelector((state) => state.values);
  const dispatch = useDispatch(); // add this line to get the dispatch function
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getValues()).then(() => setLoading(false)); // call dispatch as a function and set loading to false when done
  }, [dispatch]);

  return (
    <div id="centering">
      {loading ? ( // show loading component if still loading
        <Loading />
      ) : (
        <React.Fragment>
          <br />
          <h2>Valores Generales</h2>
          <div id="angost">
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell>Dolar Blue</TableCell>
                  <TableCell>Dolar OF</TableCell>
                  <TableCell>Packaging Premium</TableCell>
                  <TableCell>Packaging Simple</TableCell>
                  <TableCell>Costos</TableCell>
                  <TableCell>Flete</TableCell>
                  <TableCell align="right">Profit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={values._id}>
                  <TableCell>{values.dolarBlue}</TableCell>
                  <TableCell>{values.dolarOficial}</TableCell>
                  <TableCell>{values.packaginPremium}</TableCell>
                  <TableCell>{values.packagingSimple}</TableCell>
                  <TableCell>{values.costoGeneral}</TableCell>
                  <TableCell>{values.flete}</TableCell>
                  <TableCell align="right">{values.profit}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <br />
            <label id="centering">Editar valores</label>
            <Link id="centering" to="./values">
              <EditIcon />
            </Link>
          </div>
          <br />
          <Link to="/admin">Volver al Panel</Link>
        </React.Fragment>
      )}
    </div>
  );
}