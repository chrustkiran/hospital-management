import classes from '/styles/PatientView.module.css'
import NavBar from "../../comps/NavBar";
import {useState} from 'react'

export const Add = () => {

    const [name, setName] = useState('')

    const onChangeText = (text) => {
        setName(text.target.value)
    }

    const onClick = async () => {
        const res = await fetch('/patient/add')

    }

    return (
        <div>
            <NavBar/>
            <h1 className={classes.center} >Add Patient Records</h1>

            <div>
                Name : <input onChange={text => onChangeText(text)}></input>
                <br/><br/>
                <button onClick={() => onClick()}>Submit</button>
            </div>
        </div>
    )
}

export default Add