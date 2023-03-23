import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { ResponsiveContainer } from "recharts";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// Generate Sales Data

export default function Chart() {
  const theme = useTheme();

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
        </Typography>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
