import "./App.css";

import { useEffect, useState } from "react";

//Mui components
import { Button, Typography, Stack } from "@mui/material";

//Components
import Filter from "./components/filter";
import Aggregate from "./components/aggregate";

//Constants
import { Green, Names, FontFamily, Tickers } from "./Constants";

function App() {

  // Hooks
  const [StockData, setStockData] = useState([]);
  const [library, setLibrary] = useState([]);
  const [displayLib, setDisplayLib] = useState(false);

  

  const [filterMarketCap, setFilterMarketCap] = useState(2500);

  const [filterEmployees, setFilterEmployees] = useState(2000);

  async function GetGainers() {
    console.log("TOP OF GET GAINERs");
    let temp = [];
    try {
      await fetch(
        `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?tickers=${Tickers}&apiKey=oZVA9C_2q6pU0s5b8LL88Soh8i99GmBm`
      )
        .then((response) => {
          return response.json();
        })
        .then(async function (data) {
          data.tickers.forEach(async function (stock) {
            await fetch(
              "https://api.polygon.io/v3/reference/tickers/" +
                stock.ticker +
                "?apiKey=oZVA9C_2q6pU0s5b8LL88Soh8i99GmBm"
            )
              .then((response) => {
                return response.json();
              })
              .then((details) => {
                details["change"] = stock["todaysChangePerc"];
                details["img"] = `imgs/${stock["ticker"]}.png`;
                details["name"] = Names[stock["ticker"]];
                setStockData((prevState) => [...prevState, details]);
              });
          });
        });
    } catch (error) {
      alert("There was an error fetching stock data :(");
    }
  }

  useEffect(() => {
    if (StockData) {
      GetGainers();
    }
  }, []);
  return (
    <div className="App">
      <main className="App-header">
        <div className="Header">
          <Stack alignItems={"flex-start"} marginTop={5}>
            <Typography
              variant="h4"
              sx={{ marginBottom: 1 }}
              fontFamily={FontFamily[3]}
            >
              TECH STOCKS
            </Typography>

            <Typography
              variant="body2"
              color={"gray"}
              fontFamily={FontFamily[3]}
            >
              {"Keep track of the biggest tech stocks on the market"}
            </Typography>

            <Typography variant="body2" color="gray" fontFamily={FontFamily[3]}>
              {"Add them to your library to compare them!"}
            </Typography>
          </Stack>

          <div className="Filter">
            <Filter
              setFilterEmployees={setFilterEmployees}
              setFilterMarketCap={setFilterMarketCap}
              filterEmployees={filterEmployees}
              filterMarketCap={filterMarketCap}
            />
          </div>
        </div>

        <section className="options">
          <Button
            onClick={() => setDisplayLib(false)}
            sx={{
              color: displayLib ? Green : "black",
              bgcolor: displayLib ? "black" : Green,
              "&:hover": {
                backgroundColor: displayLib ? Green : "black",
                color: displayLib ? "black" : Green,
                justifyContent: "center",
              },
            }}
          >
            <Typography variant="body2" fontFamily={FontFamily[3]}>
              Stocks
            </Typography>
          </Button>

          <Button
            onClick={() => setDisplayLib(true)}
            sx={{
              color: displayLib ? "black" : Green,
              bgcolor: displayLib ? Green : "black",
              "&:hover": {
                backgroundColor: Green,
                color: "black",
                justifyContent: "center",
              },
            }}
          >
            <Typography variant="body2" fontFamily={FontFamily[3]}>
              Library
            </Typography>
          </Button>
        </section>

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
