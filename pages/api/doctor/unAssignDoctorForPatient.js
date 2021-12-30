import {db} from "../../../database/MysqlConf";

export default function handle(req, res) {
    const body = req !== undefined ? req.body : {}
    db.connect(function(err) {
        if (err){
            res.status(502).json({message: err})
        }
        console.log('connected to db')
        var values = '';
        body.doctors.map(docId => {
            values += `('${body.patientId}', '${docId}'),`
        })
        values = values.substr(0, values.length-1)
        var sql = `DELETE FROM Patient_Doctor WHERE (PatientId, DoctorId) IN (${values})`;

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