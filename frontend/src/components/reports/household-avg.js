import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Container } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getHouseholdAvgs } from "../../api/api";

const distances = [0, 5, 10, 25, 50, 100, 250];

const HouseholdAvgs = () => {
  const [inputData, setInputData] = useState({ postal: "", distance: 0 });
  const [outputData, setOutputData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeValue = (event) => {
    const d = { ...inputData };
    if (event.target.name === "postal") {
      if (event.target.value.length <= 5) {
        d[event.target.name] = event.target.value;
      }
    } else {
      d[event.target.name] = event.target.value;
    }

    setInputData(d);
    setError(null);
  };

  const onSearch = () => {
    setIsLoading(true);
    getHouseholdAvgs(inputData.postal, inputData.distance)
      .then((data) => {
        setOutputData(data);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const isSubmitEnabled =
    inputData.postal.trim() !== "" && inputData.postal.trim().length === 5;

  return (
    <Container sx={{ marginBottom: "100px" }}>
      <Link to={"/view-reports"}>Back to Reports</Link>
      <Typography
        variant="h2"
        align="center"
        sx={{ fontWeight: 700, color: blue[700] }}
        gutterBottom
      >
        Household Averages by Radius
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          width: "200px",
        }}
      >
        <TextField
          onChange={onChangeValue}
          value={inputData.postal}
          id="outlined-basic"
          label="Postal Code"
          name="postal"
          variant="outlined"
        />
        {error && (
          <div style={{ color: "red" }}>
            ERROR: {error.detail || "An error occurred"}
          </div>
        )}

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="distance-label">Distance</InputLabel>
          <Select
            labelId="distance-label"
            id="distances"
            label="Distance"
            name="distance"
            defaultValue={0}
            onChange={onChangeValue}
          >
            {distances.map((d) => {
              return <MenuItem value={d}>{d}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <Button
          disabled={!isSubmitEnabled}
          onClick={onSearch}
          variant="outlined"
        >
          Search
        </Button>
        {isLoading && <CircularProgress />}
      </div>
      {outputData && (
        <div style={{ marginTop: "30px" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: blue[700] }}
            gutterBottom
          >
            Results:
          </Typography>
          {Object.keys(outputData[0]).map((key) => {
            return (
              <div>
                {key}: {outputData[0][key] || 0}
              </div>
            );
          })}
        </div>
      )}
    </Container>
  );
};

export default HouseholdAvgs;
