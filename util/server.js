const express = require("express")

const server = express()

const path = require("path");

server.get("/", (req, res) => {
    res.sendFile(path.resolve('./index.html'))
});

function keepAlive() {
    server.listen(3000, () => {
        console.log("Server ready")
    })
}

module.exports = keepAlive