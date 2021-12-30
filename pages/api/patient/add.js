import {db} from "../../../database/MysqlConf";

var mysql = require('mysql');


export default function handler(req,res) {

    const body = req !== undefined ? req.body : {}
    db.connect(function(err) {
        if (err){
            res.status(502).json({message: err})
        }
        console.log('connected to db')
        var sql = `INSERT INTO Patient (PatientName, Gender, Age, RoomNo, Disease) VALUES ('${body.name}',
         '${body.gender}', '${body.age}', ${body.roomNo === '' ? 'NULL' : `'`+ body.roomNo+`'`}, '${body.disease}')`;

        console.log(sql)
        db.query(sql, function (err, result) {
            if (err) {
                res.status(502).json({message: err})
            } else {
                res.status(200).json({message: result})
            }
        });
    });


}