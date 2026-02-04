import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Container } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getManufacturerModelSearch } from "../../api/api";

const ManufacturerSearch = () => {
  const [query, setQuery] = useState("");
  const [currentSearch, setCurrentSearch] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeQuery = (event) => {
    setQuery(event.target.value);
    setError(null);
  };

  const onSearch = () => {
    const searchQuery = query.trim();
    if (searchQuery !== "") {
      setData(null);
      setIsLoading(true);
      getManufacturerModelSearch(query)
        .then((d) => {
          setData(d);
          setCurrentSearch(query);
        })
        .catch((e) => {})
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setError("Invalid input");
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
        Manufacturer/Model Search
      </Typography>
      <TextField
        onChange={onChangeQuery}
        id="outlined-basic"
        label="Search Query"
        variant="outlined"
      />
      <Button
        disabled={query.length === 0}
        onClick={onSearch}
        variant="outlined"
      >
        Search
      </Button>
      {error && <div style={{ color: "red" }}>ERROR: {error}</div>}
      {isLoading && <CircularProgress />}
      {data && data.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Manufacturer Name</TableCell>
              <TableCell>Model Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((manu) => {
                const manufacturerStyle = manu.manufacturername
                  .toLowerCase()
                  .includes(currentSearch.toLocaleLowerCase())
                  ? { backgroundColor: "#90EE90" }
                  : {};
                const modelStyle =
                  manu.modelname &&
                  manu.modelname
                    .toLowerCase()
                    .includes(currentSearch.toLocaleLowerCase())
                    ? { backgroundColor: "#90EE90" }
                    : {};
                return (
                  <TableRow>
                    <TableCell sx={manufacturerStyle}>
                      {manu.manufacturername}
                    </TableCell>
                    <TableCell sx={modelStyle}>{manu.modelname}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      ) : (
        <div>NO RESULTS</div>
      )}
    </Container>
  );
};

export default ManufacturerSearch;
