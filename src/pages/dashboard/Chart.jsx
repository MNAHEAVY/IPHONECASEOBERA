import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../redux/actions";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
// Generate Sales Data

export default function Chart() {
  const theme = useTheme();
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch(); // add this line to get the dispatch function
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllUsers()).then(() => setLoading(false)); // call dispatch as a function and set loading to false when done
  }, [dispatch]);

  const lastFiveUser = users.slice(-5);
  return (
    <React.Fragment>
      <Title>IPHONECASEOBERA</Title>
      <ResponsiveContainer>
        <Typography
          angle={270}
          position="left"
          style={{
            textAnchor: "middle",
            fill: theme.palette.text.primary,
            ...theme.typography.body1,
          }}
        >
          Usuarios Recientes
          {loading ? ( // show loading component if still loading
            <Loading />
          ) : (
            <div>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Imagen</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Codigo</TableCell>
                    <TableCell>Baneado</TableCell>
                    <TableCell>Nickname</TableCell>
                    <TableCell align="right">Compras</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lastFiveUser.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell>
                        <img src={row.picture}></img>
                      </TableCell>
                      <TableCell>
                        {row.name}
                        {" | "}

                        <Link to="./edituser">
                          <EditIcon />
                        </Link>
                      </TableCell>
                      <TableCell>{row._id}</TableCell>
                      <TableCell>{row.isBanned ? "Si" : "No"}</TableCell>
                      <TableCell>{row.nickname}</TableCell>
                      <TableCell align="right">
                        {row.purchase_order.products.length}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Typography>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
