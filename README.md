# Development

### Link to Deployed Website

https://excitedpanda068.github.io/ui-ux-development

### Goal and Value of the Application

The goal of this application is to display information about the biggest tech companies in the stock market. The user can add stocks to their "library" by pressing the add button at the bottom of the stock card. The user can then view the stocks in their library, and the cummulative market cap of the stocks and the average daily percent gain. The user can also filter what stocks are displayed in their library and on the stocks section by their market cap and number of employees. This app allows users to easily view the average daily percent gain and cummalitve market cap of their favorite big tech stocks. 

### Usability Principles Considered

I included a reset button which resets the filters to their original values. When the user is on the stocks page I opted for a green plus button to tell the user they can add the stock to the library. On the library page there is a red X button to tell the user it will remove the stock from their library. I also highlight either the stock button or library button to tell the user what section they are viewing and label the filter button. I also added basic instructions in the subtitle.

### Organization of Components

App.js contains all of the components in the app. I decided to compartmentalize the app into a header component containing the filter component, options component containg the stocks and library button, and aggregator component which displays the card component for all the stocks or the stocks in the users library.  

### How Data is Passed Down Through Components

App.js contains the library and stock data state. When the app mounts the stock data state is updated to recieve all of the data fetched from the stock api. The stock data and library states are passed into the aggregate component as props which displays the aggregator if the user selects the library button and the stock data cards if the user is on the stocks button. If the user presses the add button at the bottom of the stock card the library state in App.js is updated which then updates the aggregator component and displays the stock that was added in the library section. When the user applies a filter I update filter states in App.js which are passed down as props into the aggregator component. 

### How the User Triggers State Changes

When the user presses the add button or remove button on the stock card the library state in App.js is updated by the aggregator component to reflect the changes made by the user. When the filter options are changed by the user, filter states in App.js component are updated by the filter component in the header component and passed passed back down into the aggregator component as props. When the user presses the stocks or library button the displayLib state in App.js is updated in the options component and passed into the aggregate component as props which either displays the stocks in the users library or the list of all the stocks in the StockData state.


### I used parts of the custom dialog from the mui website to create the filter dialog and parts of the card example from the website to create the stock cards