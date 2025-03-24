# Cologne Gas station Visualized

### This project should show how I would display online available JSON Data (from Gas stations in Cologne): See Data [here](https://geoportal.stadt-koeln.de/arcgis/rest/services/verkehr/gefahrgutstrecken/MapServer/0/query?where=objectid+is+not+null&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson)

I decided to showcase more appraoches. 

This Main Branch has the most basic and simple approach of just fetching the Data on the server side of the Application and showing the Data in a Table with the Option of Client side ordering and filtering for the address. 
You can test the Application [here](https://koeln-gasstation-visualizer.vercel.app/)

As a second approach I decided to add a Cloud PostgreSQL Database in the form of NeonDB and the Drizzle ORM to have more control over the Data. 

This appraoch has an API endpoint for importing the Data from the online available url into our own NeonDB (/api/import-data) 
Once the Data is imported, we can then perform action like: list all the Data, create new entried or delete existing entires in the Application. 

Furthermore the Ordering of the entries and the filtering are not performed on the client side anymore, but on the server side, since we are leveraging the Database for more performant actions.

You can see the code for this approach in the `feature/-add-drizzle-and-neonDB` Branch aswell in the currently open PR.
You can also use the hosted version here: [Link](https://koeln-gasstation-visualizer-gz7xo6bsq-danilotrottas-projects.vercel.app/)

As a Third approach I decided to also implement a very simple seperate Backend based on NodeJS & FastifyJS. 
This can be found in a other Repo: [Link](https://github.com/DaniloTrotta/rest-api-fastify-gas-stations)


## Getting Started

CLone the Repository either the `Main` Branch or the `feature/-add-drizzle-and-neonDB` Branch

Add the necesarry environment vars to the root of the project in a `.env` file. 

````
GAS_STATION_URL="https://geoportal.stadt-koeln.de/arcgis/rest/services/verkehr/gefahrgutstrecken/MapServer/0/query?where=objectid+is+not+null&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson"
MAPBOX_ACCESS_TOKEN="MapBox-Access-token"
DATABASE_URL="NeonDB-connection-string"
````

As you can see you will need a Mapbox access token to display the interactive map locally and also a neonDB connection string to save the imported data (when using the `feature/-add-drizzle-and-neonDB` Branch

If you want to jsut test the App without adding your own env vars, just test the deployed version in the Link displayed in the section above.

Run 

```bash
npm run install
# or
pnpm install
```

First, run the development server:

```bash
npm run dev
# or
pnpm dev
```

When first starting the `feature/-add-drizzle-and-neonDB` Branch locally and using your own clean Neon DB 

you will need to apply the db migrations by using 
```bash
npx drizzle-kit migrate
```

Then visit `localhost:3000/api/import-data` to fetch the Data and save the Data in the DB 



