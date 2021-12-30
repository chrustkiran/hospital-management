import classes from '/styles/PatientView.module.css'
import NavBar from "../../comps/NavBar";
import * as React from 'react';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {AiOutlineUserAdd} from "react-icons/ai";
import {Tooltip} from "@mui/material";
import DoctorModal from "../../comps/DoctorModal";
import AddPatientModal from "../../comps/AddPatientModal";


export const View = () => {

    const [patient, setPatient] = useState([])
    const [addPatOpen, setAddPatOpen] = useState(false);
    const [docOpen, setDocOpen] = useState(false);
    const [modalPatientName, setModalPatientName] = useState('');
    const [modalPatientId, setModalPatientID] = useState('');
    const [roomsForPat, setRoomsForPat] = useState([]);
    const [doctorsForPat, setDoctorsForPat] = useState([]);
    const handleOpen = async (patient) => {
        setModalPatientID(patient.PatientId)
        setModalPatientName(patient.PatientName)
        await onDoctorsFetch(patient.PatientId)
        setDocOpen(true);
    }

    const handleAddPatOpen = async () => {
        await onRoomFetch()
        setAddPatOpen(true)
    }

    const handleAddPatClose = () => setAddPatOpen(false)

    const handleClose = () => setDocOpen(false);

    const modalStyle = {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
    };

    useEffect(async () => {
        onFetch()
    }, [])

    const onRoomFetch = async () => {
        const response = await fetch(`/api/room/getNo`)
        const resJ = await response.json()
        setRoomsForPat(resJ)
    }

    const onDoctorsFetch = async (patientId) => {
        const res = await fetch(`/api/doctor/getDoctorsForPatient?patientId=${patientId}`)
        const resJ = await res.json()
        setDoctorsForPat(resJ)
    }

    const onFetch = async () => {
        const res = await fetch('http://localhost:3000/api/patient/getAll')
        const data = await res.json()
        setPatient(data)
    }


    return (
        <div>
            <NavBar/>
            <div>
                <h1 className={classes.center}>View Patient Records
                    <span style={{position: "absolute", marginLeft: "30px"}}>
                        <Tooltip title={"Add Patient"}>
                             <Button variant="contained">
                                 <AiOutlineUserAdd size={24} onClick={handleAddPatOpen}/></Button>
                        </Tooltip>

                </span></h1>


            </div>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="center">Id</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="center">Gender</TableCell>
                                <TableCell align="center">Age</TableCell>
                                <TableCell align="left">Disease</TableCell>
                                <TableCell align="center">Room No</TableCell>
                                <TableCell align="center">Doctor</TableCell>
                                <TableCell align="center">Nurses</TableCell>
                                <TableCell align="center">Medicine</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {patient.map((row) => (
                                <TableRow
                                    key={row.PatientId}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.PatientId}
                                    </TableCell>
                                    <TableCell align="center">{row.PatientId}</TableCell>
                                    <TableCell align="left">{row.PatientName}</TableCell>
                                    <TableCell align="center">{row.Gender}</TableCell>
                                    <TableCell align="center">{row.Age}</TableCell>
                                    <TableCell align="left">{row.Disease}</TableCell>
                                    <TableCell align="center">{row.RoomNo}</TableCell>
                                    <TableCell align="center"><Button onClick={() => handleOpen(row)}>
                                        Manage
                                    </Button></TableCell>
                                    <TableCell align="center"><Button onClick={() => handleOpen(row)}>
                                        Manage
                                    </Button></TableCell>
                                    <TableCell align="center"><Button onClick={() => handleOpen(row)}>
                                        Manage
                                    </Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <AddPatientModal open={addPatOpen} rooms={roomsForPat} handleClose={handleAddPatClose}/>
            <DoctorModal open={docOpen} handleClose={handleClose} modalPatientName={modalPatientName}
                         modalPatientId={modalPatientId} doctorsForPat={doctorsForPat}/>

        </div>
    )
}


export default View