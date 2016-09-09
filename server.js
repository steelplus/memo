let express = require('express');
let app = express();

app.set('/', __dirname)

app.listen(3000, () => {
  console.log("server running.")
})
