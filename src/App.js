import "./App.css";

import { useEffect, useState } from "react";

//Components
import Aggregate from "./components/aggregate";
import Header from "./components/header";

//Constants
import { Names, Tickers } from "./Constants";
import Options from "./components/options";

function App() {
  // Data for all stocks, library
  const [StockData, setStockData] = useState([]);
  const [library, setLibrary] = useState([]);

  // Whether to display library or not
  const [displayLib, setDisplayLib] = useState(false);

  // Hooks to keep track of filter values
  const [filterMarketCap, setFilterMarketCap] = useState(2500);
  const [filterEmployees, setFilterEmployees] = useState(2000);

  // Fetches the stock data from the api
  async function GetGainers() {
    try {
      // Fetch daily snapshot of stock data
      await fetch(
        `${process.env.REACT_APP_API_URL_SNAPSHOT}${Tickers}&apiKey=${process.env.REACT_APP_API_KEY}`
      )
        // Convert response to json
        .then((response) => {
          return response.json();
        })
        .then(async function (data) {
          // Then for each stock returned in the initial response fetch more information about the stock (market cap, description, etc..)
          data.tickers.forEach(async function (stock) {
            await fetch(

              `${process.env.REACT_APP_API_URL}${stock.ticker}?apiKey=${process.env.REACT_APP_API_KEY}`
            )
              // Convert response to json
              .then((response) => {
                return response.json();
              })

              // Update the stock data state
              .then((details) => {
                details["change"] = stock["todaysChangePerc"];
                details["img"] = `imgs/${stock["ticker"]}.png`;
                details["name"] = Names[stock["ticker"]];

                setStockData((prevState) => [...prevState, details]);
              });
          });
        });
    } catch (error) {
      // If an error occurs notify the user
      alert("There was an error fetching stock data :(");
    }
  }

  // Fetch the stock data when the application mounts
  useEffect(() => {
    // Make sure data is only fetched if the stock data hook is empty

    if (StockData) {
      GetGainers();
    }
  }, []);

  return (
    <div className="App">
      <main>
        <Header
          setFilterEmployees={setFilterEmployees}
          setFilterMarketCap={setFilterMarketCap}
          filterEmployees={filterEmployees}
          filterMarketCap={filterMarketCap}
        />

        {/**
         * Button for user to toggle between all stocks and library
         */}
        <Options setDisplayLib={setDisplayLib} />

        {/**
         * Aggregate section, displays the list of stocks or the users library
         */}
        <Aggregate
          library={library}
          StockData={StockData}
          displayLib={displayLib}
          filterEmployees={filterEmployees}
          filterMarketCap={filterMarketCap}
          setLibrary={setLibrary}
        />
      </main>
    </div>
  );
}

export default App;
