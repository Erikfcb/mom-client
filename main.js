const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "./build")));
const forceHttps = function (req, res, next) {
    if (process.env.NODE_ENV === 'production') {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url)
      }
    }
    next()
  }
app.use(forceHttps)


  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});