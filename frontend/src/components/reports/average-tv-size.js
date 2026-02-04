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
import {
  getAverageTvDisplaySize,
  getAverageTvDisplaySizeDrilldown,
} from "../../api/api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const AverageTVSize = () => {
  const [data, setData] = useState();
  const [drilldownData, setDrilldownData] = useState({});
  useEffect(() => {
    getAverageTvDisplaySize().then((d) => {
      setData(d);
    });
  }, []);

  const onDrilldown = (state) => {
    if (!drilldownData[state]) {
      getAverageTvDisplaySizeDrilldown(state).then((d) => {
        const newData = { ...drilldownData };
        newData[state] = d;
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
        Average TV Display Size by State
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>State</TableCell>
            <TableCell>Average TV Size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((state) => {
              return (
                <TableRow>
                  <TableCell>{state.astate}</TableCell>
                  <TableCell>{state.avgtvsize}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, color: blue[700], margin: "30px 0px" }}
        gutterBottom
      >
        TV Info By State
      </Typography>
      {data &&
        data.map((state) => {
          const stateData = drilldownData[state.astate];
          return (
            <Accordion onChange={() => onDrilldown(state.astate)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{state.astate}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Screen Type</TableCell>
                      <TableCell>Maximum Resolution</TableCell>
                      <TableCell>Average Display Size</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stateData &&
                      stateData.map((row) => {
                        return (
                          <TableRow>
                            <TableCell>{row.displaytype}</TableCell>
                            <TableCell>{row.maxresolution}</TableCell>
                            <TableCell>{row.avgtvsize}</TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </Container>
  );
};

export default AverageTVSize;
