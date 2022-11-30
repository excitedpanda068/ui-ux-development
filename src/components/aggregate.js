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
    {/**
     * If the library should be displayed, show the cummalative market cap, average daily percent change
     */}
      {props.displayLib ? (
        <Stack>
          <Typography variant="subtitle" fontFamily={FontFamily[3]}>
            {`Cummulative Market Cap: ${CalculateTotalMarketCap()}B`}
          </Typography>
          <Typography variant="subtitle" fontFamily={FontFamily[3]}>
            {`Average Daily Change: ${CalculateAveragePercentChange()}%`}
          </Typography>
        </Stack>
      ) : (
        <></>
      )}
      {/**
       * If the library should be displayed, use the stocks in the users library, otherwise should all stocks
       * using the filters and sorting method
       */}
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
          // Sort the stock data by name
          props.StockData.sort(compare)
            .filter(
              (stock) =>
              // Filter the stocks by the market cap and employees
                stock.results.market_cap / 1000000000 <=
                  props.filterMarketCap &&
                stock.results.total_employees / 1000 <= props.filterEmployees
            )
            .map((stock, index) => (
              <MediaCard
                key={index}
                name={stock.name}
                ticker={stock.results.ticker}
                percentChange={stock.change}
                description={stock.results.description}
                // Convert market cap to billions
                marketcap={stock.results.market_cap / 1000000000}
                // Convert employees to thousands
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
