
// Mui imports
import {
    Typography,
    Stack
} from '@mui/material'

// Components
import Filter from './filter'

// Constants
import { FontFamily } from '../Constants'

export default function Header(props) {
    return(
        <div className="Header">

          {/**
           * Header
           */}
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

           {/**
            * Filter options
            */}
          <div className="Filter">
            <Filter
              setFilterEmployees={props.setFilterEmployees}
              setFilterMarketCap={props.setFilterMarketCap}
              filterEmployees={props.filterEmployees}
              filterMarketCap={props.filterMarketCap}
            />
          </div>
        </div>
    )
}