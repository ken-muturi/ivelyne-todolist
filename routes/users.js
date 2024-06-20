const express= require("express")
const router = express.Router();
const connection = require('../db/db');

router.get("/", (req, res) => {
    const sql =`SELECT * FROM users`;
    return connection.query(sql, function(err, results) {
        if(err) {
            return res.status(400).json({error: err});
        }
        res.status(200).json(results)
    });
})

router.get("/:id", (req, res) => {
    const sql =`SELECT * FROM users WHERE id =${req.params.id}`;
    return connection.query(sql, function(err, results) {
        if(err) {
            return res.status(400).json({error: err});
        }
        res.status(200).json(results)
    });
})

router.post("/create", (req, res) => {
    const {firstname,lastname, email, active} = req.body;
    const sql =`INSERT INTO users (firstname,lastname, email, active)  VALUES ('${firstname}','${lastname}','${email}','${active}');`;
    return connection.query(sql, function(err, results) {
        if(err) {
            return res.status(400).json({error: err});
        }
        console.log({results});
        res.status(200).json(results)
    });
})

router.patch("/:id/edit", (req, res) => {
    const todo = req.body;
    const updateColumns = Object.entries(todo).map(t => {
        const [column, value] = t
        return `${column}= '${value}'`;
    })
    const sql =`UPDATE users SET ${updateColumns(', ')})  WHERE id=${req.params.id}`;
    return connection.query(sql, function(err, results) {
        if(err) {
            return res.status(400).json({error: err});
        }
        res.status(200).json(results)
    });
})

router.delete("/:id", (req, res) => {
    const sql =`
        DELETE FROM users where id =${req.params.id}
    `;
    return connection.query(sql, function(err, results) {
        if(err) {
            return res.status(400).json({error: err});
        }
        res.status(200).json(results)
    });
})

module.exports= router