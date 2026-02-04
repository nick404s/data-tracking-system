import { Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { getExtraFridgeReport } from "../../api/api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";

const ExtraFridge = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!data) {
      getExtraFridgeReport().then((d) => {
        setData(d);
      });
    }
  }, [data]);

  return (
    <Container sx={{ marginBottom: "100px" }}>
      <Link to={"/view-reports"}>Back to Reports</Link>

      <Typography
        variant="h2"
        align="center"
        sx={{ fontWeight: 700, color: blue[700] }}
        gutterBottom
      >
        Extra Fridge/Freezer Report
      </Typography>
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, color: blue[700] }}
        gutterBottom
      >
        Households With More Than One Fridge or Freezer
      </Typography>
      <div>Total Count: {data?.extra_fridge_count}</div>
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, color: blue[700], marginTop: "30px" }}
        gutterBottom
      >
        Top 10 States
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>State</TableCell>
            <TableCell>Total Household Count </TableCell>
            <TableCell>Percentage With Chest Freezers </TableCell>
            <TableCell>Percentage With Upright Freezers </TableCell>
            <TableCell>Percentage With Other </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.top_10.map((row) => {
            return (
              <TableRow key={row.state}>
                <TableCell>{row.state}</TableCell>
                <TableCell>{row.homewithmorethanonefridge}</TableCell>
                <TableCell>{Math.trunc(row.chestfreezerpct * 100)}%</TableCell>
                <TableCell>
                  {Math.trunc(row.uprightfreezerpct * 100)}%
                </TableCell>
                <TableCell>{Math.trunc(row.otherfreezerpct * 100)}%</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Container>
  );
};

export default ExtraFridge;
