export const getBathroomStats = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // localhost was not working for me on windows...So I use localhost. Is that cool?
      const res = await fetch("http://localhost/reports/bathroom-stats/", {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
      const json = await res.json();
      resolve(json);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};

export const getExtraFridgeReport = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch("http://localhost/reports/extra-fridge/", {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
      const json = await res.json();
      resolve(json);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};

export const getHouseholdAvgs = (postalCode, distance) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(
        `http://localhost/reports/household-averages-by-radius/?postal_code=${postalCode}&search_radius=${distance}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      const json = await res.json();
      if (res.ok) {
        resolve(json);
      } else {
        reject(json);
      }
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};

export const getTop25 = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`http://localhost/report/top25-manufacturers/`, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
      const json = await res.json();
      if (res.ok) {
        resolve(json);
      } else {
        reject(json);
      }
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};

export const getTop25Drilldown = (manufacturerName) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(
        `http://localhost/report/manufacturer-drill-down/?manufacturer_name=${manufacturerName}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      const json = await res.json();
      if (res.ok) {
        resolve(json);
      } else {
        reject(json);
      }
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};

export const getManufacturerModelSearch = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(
        `http://localhost/report/manufacturer-model-search/?search_query=${query}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      const json = await res.json();
      if (res.ok) {
        resolve(json);
      } else {
        reject(json);
      }
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};

export const getAverageTvDisplaySize = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(
        `http://localhost/report/average-tv-display-by-state/`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      const json = await res.json();
      if (res.ok) {
        resolve(json);
      } else {
        reject(json);
      }
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};

export const getAverageTvDisplaySizeDrilldown = (state) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(
        `http://localhost/report/tv-state-drill-down/?state=${state}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      const json = await res.json();
      if (res.ok) {
        resolve(json);
      } else {
        reject(json);
      }
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};

export const getLaundry = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`http://localhost/reports/laundry/`, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
      const json = await res.json();
      if (res.ok) {
        resolve(json);
      } else {
        reject(json);
      }
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
};
