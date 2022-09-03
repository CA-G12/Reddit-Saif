const app = require('./app');

const port = process.env.PORT || app.get('port');

app.listen(port, () => console.log(`start listening http://localhost:${port}`));
