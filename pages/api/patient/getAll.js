import {db} from "../../../database/MysqlConf";

export default function handler(req,res) {
    db.connect(function(err) {
        if (err) {
            res.status(502)
        }
        console.log('connected to db')

        var sql = "SELECT * FROM Patient";
        db.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                res.status(502)
            }
            res.status(200).json(result)
        });
    });
}