let express = require('express');
let PORT = process.env.PORT || 5000

let app = express();

//create access to the views folder where the html file is stored.
app.use(express.static('views'))
//access the stylesheets 
app.use(express.static('public/stylesheets'))
//access the javascript file for functionality purposes
app.use(express.static('public/assets'))

//Give a confirmation message once server has estabilished a connection on the port.
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));