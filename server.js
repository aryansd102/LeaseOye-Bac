const express = require('express');
const app = express();

app.get('/test', (req, res) => {
    res.send("hello this is lease oye testing api");
});

const port = 3000;
app.listen(3000, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
})