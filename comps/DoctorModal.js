import * as React from "react";

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import {Card, CardHeader, Divider} from "@mui/material";
import {useEffect, useState} from "react";

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
    overflow: 'scroll',
    height: '60%'
};


export const DoctorModal = (props) => {

    /*  const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

  const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };*/

    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);
    const [added, setAdded] = useState([]);
    const [removed, setRemoved] = useState([]);

    useEffect(async () => {
        makeDefault()
        await onFetchNotAssignedDoctors()
        setRight(props.doctorsForPat.map(doc =>`${doc.DoctorId} - ${doc.DoctorName}`))
    }, [props])

    const makeDefault = () => {
        setRight([])
        setLeft([])
        setAdded([])
        setRemoved([])
        setChecked([])
    }


    const onFetchNotAssignedDoctors = async () => {
        const res = await fetch(`/api/doctor/getDoctorsNotAssignedForPat?patientId=${props.modalPatientId}`)
        const resJ = await res.json()
        setLeft(resJ.map(doc => `${doc.DoctorId} - ${doc.DoctorName}`))
    }

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const sendAssignReq = async () => {
        const req = fetch('/api/doctor/assignDoctorForPatient', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                patientId: props.modalPatientId,
                doctors: added.map(val => val.split(' -')[0])
            })
        })
    }

    const sendUnAssignReq = async () => {
        const req = fetch('/api/doctor/unAssignDoctorForPatient', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                patientId: props.modalPatientId,
                doctors: removed.map(val => val.split(' -')[0])
            })
        })
    }


    const handleSave = async () => {
        if (added.length > 0) {
            await sendAssignReq()
        }
        if (removed.length > 0) {
            await sendUnAssignReq()
        }
    }


    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setAdded(added.concat(not(leftChecked, removed)))

        const newRemoved = [...removed]
        intersection(removed, leftChecked).map(v => newRemoved.splice(v, 1))
        setRemoved(newRemoved)

        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    function not(a, b) {
        return a.filter((value) => b.indexOf(value) === -1);
    }

    function intersection(a, b) {
        return a.filter((value) => b.indexOf(value) !== -1);
    }

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRemoved(removed.concat(not(rightChecked, added)))

        const newAdded = [...added]
        intersection(rightChecked, added).map(v => newAdded.splice(v, 1))
        setAdded(newAdded)

        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };


    const customList = (title, items) => (
        <Card sx={{width: 200, height: 230, overflow: 'auto'}}>
            <CardHeader
                sx={{px: 2, py: 1}}
                avatar={
                    <div></div>
                }
                title={title}
            />
            <Divider/>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value}-label`;

                    return (
                        <ListItem
                            key={value}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value}`}/>
                        </ListItem>
                    );
                })}
                <ListItem/>
            </List>
        </Card>
    );

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="doctor-modal"
        >
            <Box sx={modalStyle}>
                <h3 style={{textAlign: "center"}} variant="h6" component="h2">
                    Manage Doctors for patient {props.modalPatientName}
                </h3>
                <Typography sx={{mt: 2}}>
                    <Box sx={{display: 'block', flexWrap: 'wrap'}}>
                        <div>
                            <Grid container spacing={2} justifyContent="center" alignItems="center">
                                <Grid item>{customList(`Not Assigned`, left)}</Grid>
                                <Grid item>
                                    <Grid container direction="column" alignItems="center">

                                        <Button
                                            sx={{my: 0.5}}
                                            variant="outlined"
                                            size="small"
                                            onClick={handleCheckedRight}
                                            disabled={leftChecked.length === 0}
                                            aria-label="move selected right"
                                        >
                                            &gt;
                                        </Button>
                                        <Button
                                            sx={{my: 0.5}}
                                            variant="outlined"
                                            size="small"
                                            onClick={handleCheckedLeft}
                                            disabled={rightChecked.length === 0}
                                            aria-label="move selected left"
                                        >
                                            &lt;
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item>{customList(`Assigned`, right)}</Grid>
                            </Grid>
                            <p>
                                <Button sx={{float: "right", mr: 30}} onClick={handleSave}
                                        variant={"contained"}>Save</Button>
                            </p>
                        </div>
                    </Box>
                </Typography>
            </Box>
        </Modal>
    )
}

export default DoctorModal