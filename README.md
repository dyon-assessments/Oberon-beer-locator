**Oberon beer locator**

**Summary:**

An application that will find brewery&#39;s and show them in a decedent order so the closest brewery is showed in the top, you can also filter with a radius.

It has also the option to see the beers they have in stock with the use of the &#39;bieren lijst button in the results.

Hover over the beer names and you can see more detail about that beer&#39;.

On the &#39;/addbrewery&#39; page you can add breweries I have not fixed validation and left out opening days

The application using a Redis cache so when added a brewery its not instant available with queries you already searched for.



**Stack:**

React,

Node.js,

MongoDB,

Mongoose,

Redis,

Google distance matrix,

eslint,



**Install and run the application:**

- install Redis local and keep it running on port 6379

- npm or yarn install in the source directory

- npm run dev to start the application



**compromises:**

- used no redux
- used MongoDB instead of SQL
- used only local Redis caching
- used no prop-types
- no form validation
- no unit tests
"# Oberon-beer-locator" 
"# Oberon-beer-locator" 
