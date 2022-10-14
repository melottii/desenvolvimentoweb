const fs = require('fs');

let routes = {
    default: (res) => responde(res, "index.html"),
    notFound: (res) => responde(res, "error404.html"),
  }

function responde(res, pag){
  res.setHeader("Content-Type", "text/html")
  res.setHeader("Access-Control-Allow-Origin", "*")
  fs.readFile(pag, (err, data) => {
    res.end(data)
    return
    })
}

module.exports = routes
