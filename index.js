const express = require('express');
const app = express();
const path = require('path');

const PORT = 2500;
app.use(express.static(__dirname));

app.listen(PORT ,console.log(`Server running at http://localhost:${PORT}/`));