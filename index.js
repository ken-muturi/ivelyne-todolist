const express = require("express");
const userRoutes = require('./routes/users')
const categoriesRoutes = require('./routes/categories')
const todosRoutes = require('./routes/todos')

const app = express();

app.use(express.urlencoded({ extended: true}))
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/todos', todosRoutes);

const port = 3000;
app.listen(port, (req, res) => console.log(`Listening at port ${port}`));
