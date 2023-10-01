import { type ReportHandler } from "web-vitals";

const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
  if (onPerfEntry !== undefined && onPerfEntry instanceof Function) {
    import("web-vitals")
      .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log("failed to load web vitals");
      });
  }
};

export default reportWebVitals;
