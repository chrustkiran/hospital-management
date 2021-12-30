import classes from '/styles/PatientView.module.css'
import NavBar from "../../comps/NavBar";
import {useEffect, useState} from 'react';

export const View = () => {

    const [patient, setPatient] = useState([])



    useEffect(async () => {
        onFetch()
    }, [])

    const onFetch = async () => {
        const res = await fetch('http://localhost:3000/api/patient/view')
        const data =  await res.json()
        setPatient(data)
    }

    return (
        <div>
            <NavBar/>
            <h1 className={classes.center} >View Patient Records</h1>

            <p>
                {patient.map(pat => {
                    return (
                        <div>
                            {pat.PatientName}, {pat.Gender}, {pat.Age}, {pat.RoomNo}, {pat.Disease}
                        </div>
                    )
                })}
            </p>
        </div>
    )
}

export default View