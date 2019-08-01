const port = process.env.port || 4001;
const app = require('./app');

app.listen(port, function (){
    console.log(`listening on port: ${port}`);
});

