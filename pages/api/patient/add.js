import {db} from "../../../database/MysqlConf";

var mysql = require('mysql');


export default function handler(req,res) {

    db.connect(function(err) {
        if (err) throw err
        console.log('connected to db')

        var sql = "INSERT INTO Patient (PatientName, Gender, Age, RoomNo, Disease) VALUES ('Chrustkiran', 'Male', '26', NULL, 'Corona')";
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Query executed");
        });
    });

    res.status(200).json({message: 'success'})
}