const http = require("http");

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    const DNT = req.headers.dnt;

    res.writeHead(200);
    res.end("DNT: " + DNT || "unset");
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});