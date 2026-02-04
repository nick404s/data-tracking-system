import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import { getTop25, getTop25Drilldown } from "../../api/api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const Top25Manufacturers = () => {
  const [data, setData] = useState();
  const [drilldownData, setDrilldownData] = useState({});
  useEffect(() => {
    getTop25().then((d) => {
      setData(d);
    });
  }, []);

  const onDrilldown = (manufacturerName) => {
    if (!drilldownData[manufacturerName]) {
      getTop25Drilldown(manufacturerName).then((d) => {
        const newData = { ...drilldownData };
        newData[manufacturerName] = d[0];
        setDrilldownData(newData);
      });
    }
  };

  return (
    <Container sx={{ marginBottom: "100px" }}>
      <Link to={"/view-reports"}>Back to Reports</Link>

      <Typography
        variant="h2"
        align="center"
        sx={{ fontWeight: 700, color: blue[700] }}
        gutterBottom
      >
        Top 25 Popular Manufacturer
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Manufacturer Name</TableCell>
            <TableCell>Raw Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((manu) => {
              return (
                <TableRow>
                  <TableCell>{manu.manufacturername}</TableCell>
                  <TableCell>{manu.appliancecount}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, color: blue[700], margin: "40px 0px" }}
        gutterBottom
      >
        Reports by Manufacturer
      </Typography>
      {data &&
        data.map((manu) => {
          const drilldownManufacturerData =
            drilldownData[manu.manufacturername] || null;
          return (
            <Accordion onChange={() => onDrilldown(manu.manufacturername)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{manu.manufacturername}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {drilldownManufacturerData && (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Appliance Type</TableCell>
                        <TableCell>Raw Count</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>TV</TableCell>
                        <TableCell>
                          {drilldownManufacturerData.tvcount}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Cooker</TableCell>
                        <TableCell>
                          {drilldownManufacturerData.cookercount}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Dryer</TableCell>
                        <TableCell>
                          {drilldownManufacturerData.dryercount}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Washer</TableCell>
                        <TableCell>
                          {drilldownManufacturerData.washercount}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Refrigerator/Freezer</TableCell>
                        <TableCell>
                          {drilldownManufacturerData.refrigeratorfreezercount}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                )}
              </AccordionDetails>
            </Accordion>
          );
        })}
    </Container>
  );
};

export default Top25Manufacturers;
