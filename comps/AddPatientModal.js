import * as React from "react";
import {useEffect, useState} from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {Button, MenuItem, Select} from "@mui/material";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    overflow: 'scroll'
};


export const AddPatient = (props) => {

    const [values, setValues] = useState({
        name: 'sample',
        gender: 'Male',
        age: 50,
        roomNo: '',
        disease: 'sample'
    });

    const [roomNo, setRoomNo] = useState([])


    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const onSave = async () => {
        const response = await fetch('/api/patient/add',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        const resJ = await response.json()
    }




    return(
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="doctor-modal"
        >
            <Box sx={modalStyle}>
                <h3 style={{textAlign: "center"}} variant="h6" component="h2">
                    Add New Patient
                </h3>
                <div sx={{ mt: 2}}>
                    <Box sx={{ display: 'block', flexWrap: 'wrap' }}>
                        <div>
                            <FormControl sx={{ m: 1, width: '100%'}} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={'text'}
                                    value={values.name}
                                    onChange={handleChange('name')}
                                    label="Name"
                                />
                            </FormControl>


                        </div>

                        <p>
                            <FormControl sx={{m: 1, width: 100}}>
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                    value={values.gender}
                                    label="Gender"
                                    onChange={handleChange('gender')}
                                >
                                    <MenuItem value={'Male'}>Male</MenuItem>
                                    <MenuItem value={'Female'}>Female</MenuItem>
                                    <MenuItem value={'Other'}>Other</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1}} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-name">Age</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={'number'}
                                    value={values.age}
                                    onChange={handleChange('age')}
                                    label="Age"
                                />
                            </FormControl>

                            <FormControl sx={{m: 1, width: 150}}>
                                <InputLabel id="demo-simple-select-label">Room No</InputLabel>
                                <Select
                                    value={values.roomNo}
                                    label="Room No"
                                    onChange={handleChange('roomNo')}
                                >
                                    {props.rooms.map(roomNo => (
                                        <MenuItem value={roomNo.RoomNo}>{roomNo.RoomNo}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </p>
                        <p>
                            <FormControl fullWidth sx={{ m: 1, width: '100%'}} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-name">Disease</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={'text'}
                                    value={values.disease}
                                    onChange={handleChange('disease')}
                                    label="Disease"
                                />
                            </FormControl>

                        </p>
                        <p style={{float: "right"}}>
                                <Button variant="contained" onClick={onSave}>Save</Button>
                        </p>
                    </Box>
                </div>
            </Box>
        </Modal>
    )
}

export default AddPatient