import express from 'express';
import path from 'path';
import nconf from 'nconf';

nconf.argv().env().defaults({ NODE_ENV: 'development', PORT: '3001', WEBPACK_SERVER: 'http://localhost:3000'});

const NODE_ENV = nconf.get('NODE_ENV').toLowerCase();
const PORT = nconf.get('PORT');
const WEBPACK_SERVER = nconf.get('WEBPACK_SERVER');
const isProduction = NODE_ENV === 'production';

console.log('NODE_ENV', NODE_ENV);
!isProduction && console.log('WEBPACK_SERVER', WEBPACK_SERVER);

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.use("/api", (req, res) => {
   res.send("sup yo yo");
});

app.get('/*', (req, res) => {
    if (isProduction) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    } else {
        res.redirect(WEBPACK_SERVER + req.path);
    }
});

const server = app.listen(PORT, () => console.log('Listening on port %d', server.address().port));
