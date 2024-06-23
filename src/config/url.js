const PORT = process.env.PORT;
const IP = process.env.IP;

const url = {
    local: `http://localhost:${PORT}`,
    server: `http://${IP}:${PORT}`
};

const urlCors = [
    url.local, url.server
];

module.exports =  { PORT, url, urlCors };