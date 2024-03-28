const express = require('express');
const bodyParser = require('body-parser');
const { residentRouter } = require('./routes/residentRouter');


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', residentRouter);


app.listen(port, () => {
    console.log(`app running at PORT: ${port}`)
});