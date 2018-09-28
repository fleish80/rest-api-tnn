const express = require('express');

// set up express app
const app = express();

app.get('/api', (req, res) => {
    console.log('GET request');
    res.send({name: 'yoshi'});
});

//listen for requests
app.listen(process.env.port || 4000, () => {
    console.log('now listening for requests')
});
