// MUI imports
import { Stack, Typography } from "@mui/material";

// Constants
import { FontFamily } from "../Constants";

// Components
import MediaCard from "./card";
import { Bars } from "react-loading-icons";

// Styling
import "../App.css";

// Aggregate component
export default function Aggregate(props) {

    // Sorting function
  function compare(a, b) {
    if (a.results.name < b.results.name) {
      return -1;
    }
    if (a.results.name > b.results.name) {
      return 1;
    }
    return 0;
  }

  // Calculate the total market cap of stocks in library
  function CalculateTotalMarketCap() {
    let totalMarketCap = 0;

    props.library.forEach((stock) => {
      totalMarketCap += stock.marketcap;
    });

    return totalMarketCap.toFixed(2);
  }

  // Calculate the average percent change of the stocks in library
  function CalculateAveragePercentChange() {
    let totalPercentChange = 0;

    props.library.forEach((stock) => {
      totalPercentChange += stock.percentChange;
    });

    let result = 0;
    if (props.library.length != 0) {
      result = (totalPercentChange / props.library.length).toFixed(2);
    }
    return result;
  }

  return (
    <>
      {props.displayLib ? (
        <Stack>
          <Typography variant="h4" fontFamily={FontFamily[3]}>
            {`Cummulative Market Cap: ${CalculateTotalMarketCap()}B`}
          </Typography>
          <Typography variant="h4" fontFamily={FontFamily[3]}>
            {`Average Daily Change: ${CalculateAveragePercentChange()}%`}
          </Typography>
        </Stack>
      ) : (
        <></>
      )}

      <div id="stocks-container">
        {props.displayLib ? (
          props.library
            .filter(
              (stock) =>
                stock.marketcap <= props.filterMarketCap &&
                stock.employees <= props.filterEmployees
            )
            .map((stock, index) => (
              <MediaCard
                key={index}
                name={stock.name}
                ticker={stock.ticker}
                description={stock.description}
                marketcap={stock.marketcap}
                employees={stock.employees}
                percentChange={stock.percentChange}
                displayLib={props.displayLib}
                library={props.library}
                setLibrary={props.setLibrary}
                img={stock.img}
              />
            ))
        ) : props.StockData.length === 0 ? (
          <Bars />
        ) : (
          props.StockData.sort(compare)
            .filter(
              (stock) =>
                stock.results.market_cap / 1000000000 <=
                  props.filterMarketCap &&
                stock.results.total_employees / 1000 <= props.filterEmployees
            )
            .map((stock, index) => (
              <MediaCard
                key={index}
                logo={
                  stock.results.branding ? stock.results.branding.logo_url : ""
                }
                name={stock.name}
                ticker={stock.results.ticker}
                percentChange={stock.change}
                description={stock.results.description}
                marketcap={stock.results.market_cap / 1000000000}
                employees={(stock.results.total_employees / 1000).toFixed(0)}
                setLibrary={props.setLibrary}
                displayLib={props.displayLib}
                img={stock.img}
              />
            ))
        )}
      </div>
    </>
  );
}
