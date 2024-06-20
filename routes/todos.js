const connection = require('../db/db');
const express= require("express")
const router = express.Router();
const { format } = require('date-fns');


router.get("/", (req, res) => {
    const sql =`
        SELECT
            t.* ,
            c.title AS category,
            u.firstname,
            u.lastname,
            u.email
        FROM todos t
        INNER JOIN users u on u.id = t.user_id
        INNER JOIN categories c on c.id = t.category_id
    `;
    return connection.query(sql, function(err, results) {
        if(err) {
            return res.status(400).json({error: err});
        }
        res.status(200).json(results)
    });
})

router.get("/:id", (req, res) => {
    const sql =`
        SELECT
            t.* ,
            c.title AS category,
            u.firstname,
            u.lastname,
            u.email
        FROM todos t
        INNER JOIN users u on u.id = t.user_id
        INNER JOIN categories c on c.id = t.category_id
        WHERE t.id =${req.params.id}
    `;
    return connection.query(sql, function(err, results) {
        if(err) {
            return res.status(400).json({error: err});
        }
        res.status(200).json(results)
    });
})

router.post("/create", (req, res) => {
    const {title, category_id, user_id} = req.body;
    const sql =`INSERT INTO todos (title,category_id, user_id)  VALUES ('${title}', ${category_id}, ${user_id});`;
    console.log({sql})
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
    const sql =`UPDATE todos SET ${updateColumns.join(', ')} WHERE id=${req.params.id}`;
    console.log({sql})
    return connection.query(sql, function(err, results) {
        if(err) {
            return res.status(400).json({error: err});
        }
        res.status(200).json(results)
    });
})

router.patch("/:id/completed", (req, res) => {
    const formattedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const sql =`UPDATE todos SET completed_at = IF(completed_at IS NULL, '${formattedDate}', NULL) WHERE id=${req.params.id}`;
    console.log({sql})
    return connection.query(sql, function(err, results) {
        if(err) {
            return res.status(400).json({error: err});
        }
        res.status(200).json(results)
    });
})

router.delete("/:id", (req, res) => {
    const sql =`DELETE FROM todos where id =${req.params.id}`;
    console.log({sql})
    return connection.query(sql, function(err, results) {
        if(err) {
            return res.status(400).json({error: err});
        }
        res.status(200).json(results)
    });
})

module.exports = router