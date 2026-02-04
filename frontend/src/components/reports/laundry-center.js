import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLaundry } from "../../api/api";

const LaundryCenter = () => {
  const [data, setData] = useState();

  useEffect(() => {
    getLaundry().then((d) => {
      setData(d);
    });
  }, []);
  return (
    <Container sx={{ marginBottom: "100px" }}>
      <Link to={"/view-reports"}>Back to Reports</Link>

      <Typography
        variant="h2"
        align="center"
        sx={{ fontWeight: 700, color: blue[700] }}
        gutterBottom
      >
        Laundry Center Report
      </Typography>

      <Typography
        variant="h5"
        sx={{ fontWeight: 700, color: blue[700], margin: "30px 0px" }}
        gutterBottom
      >
        Most Common Washer Type and Dryer Heat Source by State
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>State</TableCell>
            <TableCell>Washer Type</TableCell>
            <TableCell>Heat Source</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.MostCommonWasherDryerByState.map((row) => {
              return (
                <TableRow key={`A-${row.astate}`}>
                  <TableCell>{row.astate}</TableCell>
                  <TableCell>{row.loadingtype}</TableCell>
                  <TableCell>{row.heatsource}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, color: blue[700], margin: "30px 0px" }}
        gutterBottom
      >
        Households With Washing Machines and No Dryers by State
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>State</TableCell>
            <TableCell>Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.HouseholdsWithWasherNoDryerByState.map((row) => {
              return (
                <TableRow key={`B-${row.State}`}>
                  <TableCell>{row.State}</TableCell>
                  <TableCell>{row.Count}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </Container>
  );
};

export default LaundryCenter;
