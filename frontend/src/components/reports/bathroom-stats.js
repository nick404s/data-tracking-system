import { Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBathroomStats } from "../../api/api";

const BathroomStats = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!data) {
      getBathroomStats().then((d) => {
        console.log(d);
        setData(d);
      });
    }
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
        Bathroom Statistics
      </Typography>
      {data && (
        <div>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: blue[700] }}
            gutterBottom
          >
            All Bathrooms
          </Typography>
          <div>
            {Object.keys(data.TotalBathrooms[0]).map((key) => {
              return (
                <div>
                  <b>{key}: </b>
                  <span>{data.TotalBathrooms[0][key]}</span>
                </div>
              );
            })}
          </div>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: blue[700] }}
            gutterBottom
          >
            Half Bathrooms
          </Typography>
          <div>
            {Object.keys(data.HalfBathrooms[0]).map((key) => {
              return (
                <div>
                  <b>{key}: </b>
                  <span>{data.HalfBathrooms[0][key]}</span>
                </div>
              );
            })}
          </div>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: blue[700] }}
            gutterBottom
          >
            Full Bathrooms
          </Typography>
          <div>
            {Object.keys(data.FullBathrooms[0]).map((key) => {
              return (
                <div>
                  <b>{key}: </b>
                  <span>{data.FullBathrooms[0][key]}</span>
                </div>
              );
            })}
          </div>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: blue[700] }}
            gutterBottom
          >
            Commodes
          </Typography>
          <div>
            {Object.keys(data.Commodes[0]).map((key) => {
              return (
                <div>
                  <b>{key}: </b>
                  <span>{data.Commodes[0][key]}</span>
                </div>
              );
            })}
          </div>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: blue[700] }}
            gutterBottom
          >
            Sinks
          </Typography>
          {Object.keys(data.Sinks[0]).map((key) => {
            return (
              <div>
                <b>{key}: </b>
                <span>{data.Sinks[0][key]}</span>
              </div>
            );
          })}
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: blue[700] }}
            gutterBottom
          >
            Bidets
          </Typography>
          <div>
            {Object.keys(data.Bidets[0]).map((key) => {
              return (
                <div>
                  <b>{key}: </b>
                  <span>{data.Bidets[0][key]}</span>
                </div>
              );
            })}
          </div>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: blue[700] }}
            gutterBottom
          >
            Bathtubs
          </Typography>
          <div>
            {Object.keys(data.Bathtubs[0]).map((key) => {
              return (
                <div>
                  <b>{key}: </b>
                  <span>{data.Bathtubs[0][key]}</span>
                </div>
              );
            })}
          </div>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: blue[700] }}
            gutterBottom
          >
            Showers
          </Typography>
          <div>
            {Object.keys(data.Showers[0]).map((key) => {
              return (
                <div>
                  <b>{key}: </b>
                  <span>{data.Showers[0][key]}</span>
                </div>
              );
            })}
          </div>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: blue[700] }}
            gutterBottom
          >
            Tub/Showers
          </Typography>
          <div>
            {Object.keys(data.TubShowers[0]).map((key) => {
              return (
                <div>
                  <b>{key}: </b>
                  <span>{data.TubShowers[0][key]}</span>
                </div>
              );
            })}
          </div>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: blue[700] }}
            gutterBottom
          >
            State With Most Bidets
          </Typography>
          <div>
            <div>State Code: {data.StateBidets[0]["state"]}</div>
            <div>Total Count: {data.StateBidets[0]["Total Bidets"]}</div>
          </div>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: blue[700] }}
            gutterBottom
          >
            Postal Code With Most Bidets
          </Typography>
          <div>
            <div>Postal Code: {data.PostalCodeBidets[0]["Postal Code"]}</div>
            <div>Total Count: {data.PostalCodeBidets[0]["Total Bidets"]}</div>
          </div>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: blue[700] }}
            gutterBottom
          >
            How many households, have only a single, primary bathroom, and no
            other bathrooms
          </Typography>
          <div>
            <div>
              Total Count: {data.HouseholdWithOnePrimaryBathroom[0].count}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default BathroomStats;
