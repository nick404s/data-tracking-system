import { Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";

const textLinkStyle = {
  fontWeight: 500,
  color: blue[700],
  "&:hover": { color: blue[200] },
};

const links = [
  { label: "Top 25 Popular Manufacturers", path: "/top-25" },
  { label: "Manufacturer/Model Search", path: "/manu-search" },
  { label: "Average TV Display Size by State", path: "/tv-display" },
  { label: "Extra Fridge/Freezer Report", path: "/extra-fridge" },
  { label: "Laundry Center Report", path: "/laundry-center" },
  { label: "Bathroom Statistics", path: "/bathroom-stats" },
  { label: "Household Averages by Radius", path: "/household-avg" },
];

const ViewReports = () => {
  return (
    <div>
      <Typography
        variant="h2"
        align="center"
        sx={{ fontWeight: 700, color: blue[700] }}
        gutterBottom
      >
        Reports
      </Typography>
      <Container>
        {links.map((link) => {
          return (
            <Link key={link.path} to={link.path}>
              <Typography variant="h4" sx={textLinkStyle} gutterBottom>
                {link.label}
              </Typography>
            </Link>
          );
        })}
      </Container>
    </div>
  );
};

export default ViewReports;
