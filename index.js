require('dotenv').config(); 

const express = require('express');
const app = express();
const pairRoutes = require('./generate/routes/generate.route');

app.use(express.json());
app.use('/api', pairRoutes); 

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
