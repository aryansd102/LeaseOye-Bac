const express = require('express');
const app = express();

app.get('/test', (req, res) => {
    res.send("hello this is lease oye testing api");
});

const port = 8080;
app.listen(8080, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
})