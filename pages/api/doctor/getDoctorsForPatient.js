import {db} from "../../../database/MysqlConf";

export default function handler(req,res) {
    console.log(req.query)
    const patientId = req.query != undefined ? req.query.patientId : ''
    db.connect(function(err) {
        if (err) {
            res.status(502)
        }
        console.log('connected to db')

        var sql = `Select * From Doctor WHERE DoctorId IN (SELECT DoctorId FROM Patient_Doctor where PatientId = '${patientId}')`;
        db.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                res.status(502)
            }
            res.status(200).json(result)
        });
    });
}