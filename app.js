const Server = require('./server');

const hostname = '127.0.0.1'
const port = process.env.PORT || 3000

const servidor = new Server(hostname, port)

//servidor.ligarServidorDesenvolvimento()
servidor.ligarServidorHeroku()
