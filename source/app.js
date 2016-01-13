'use strict';

let express = require('express');

var env = process.env.NODE_ENV || 'development';

// load app
let app = express();
let config = require('./server/config/config')[env];
// load models before using them in the other models. DON'T MOVE IT
require('./server/models');

require('./server/config/mongoose')(config);
let upload = require('./server/config/multer.js').upload;
require('./server/config/express')(app, config);
require('./server/config/passport')();
require('./server/routes')(app, upload);

app.listen(config.port, () => console.log(`App running on http://localhost:${config.port}`));
