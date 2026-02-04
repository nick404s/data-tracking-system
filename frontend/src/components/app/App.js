import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "../layout/layout";
import Home from "../home/home";
import AddHousehold from "../household/add-household";

import "./App.scss";
import ViewReports from "../reports/view-reports";
import Top25Manufacturers from "../reports/top-25";
import ManufacturerSearch from "../reports/manufacturer-search";
import AverageTVSize from "../reports/average-tv-size";
import ExtraFridge from "../reports/extra-fridge";
import LaundryCenter from "../reports/laundry-center";
import BathroomStats from "../reports/bathroom-stats";
import HouseholdAvgs from "../reports/household-avg";
import Success from "../household/success";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/success" element={<Success />} />
          <Route path="/add-household" element={<AddHousehold />} />
          <Route path="/view-reports" element={<ViewReports />} />
          <Route path="/top-25" element={<Top25Manufacturers />} />
          <Route path="/manu-search" element={<ManufacturerSearch />} />
          <Route path="/tv-display" element={<AverageTVSize />} />
          <Route path="/extra-fridge" element={<ExtraFridge />} />
          <Route path="/laundry-center" element={<LaundryCenter />} />
          <Route path="/bathroom-stats" element={<BathroomStats />} />
          <Route path="/household-avg" element={<HouseholdAvgs />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
