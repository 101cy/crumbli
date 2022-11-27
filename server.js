const http = require("http");

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    const DNT = req.headers.dnt;

    res.writeHead(200);

    res.end("<h1 style='text-align: center; height: 100vh; background: chartreuse; display: flex; justify-content: center; align-items: center;'>DNT: " +
        DNT || "unset" + "</h1>");
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});