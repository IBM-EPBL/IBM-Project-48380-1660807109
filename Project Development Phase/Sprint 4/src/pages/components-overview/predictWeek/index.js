// project import
import ComponentSkeleton from '../ComponentSkeleton';

//Styles
import './styles.css';
// ==============================|| COMPONENTS - PREDCTING MANUALLY||============================== //

import React, { useState } from 'react';

// material-ui
import { Button, Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';

// third party
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import AnimateButton from 'components/@extended/AnimateButton';
import options from 'menu-items/toastOptions';
import OrderTable from './OrdersTable';
import SalesColumnChart from './SalesColumnChart';
import MonthlyBarChart from './MonthlyBarChart';

// ============================|| FIREBASE - LOGIN ||============================ //
const PredictManual = () => {
    const [latitude, setlatitude] = useState('');
    const [longitude, setlongitude] = useState('');
    const [isOutput, setisOutput] = useState(false);
    const [time, settime] = useState([]);
    const [windSpeed, setwindSpeed] = useState([]);
    const [windPower, setwindPower] = useState([]);
    const [windDirection, setwindDirection] = useState([]);

    const Predict = async () =>
        await toast.promise(
            fetch('http://127.0.0.1:5000/forecast-and-predict-6-days', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    apikey: '9d06a0a080e7ce38d35803bca42e0e1c',
                    lat: latitude,
                    lng: longitude
                })
            })
                .then((res) => res.json())
                .then((json) => {
                    setisOutput(true);
                    settime(json.data.time);
                    setwindDirection(json.data.wd);
                    setwindSpeed(json.data.ws);
                    setwindPower(json.data.wp);
                }),
            {
                pending: 'Predicting from the server',
                success: 'Prediction completed 👌',
                error: 'Prediction rejected 🤯'
            },
            options
        );
    const handleSubmit = (e) => {
        Predict();
        e.preventDefault();
    };
    const handleBack = (e) => {
        setisOutput(false);
        setlongitude('');
        setlatitude('');
        e.preventDefault();
    };
    return (
        <>
            {!isOutput && (
                <div className="container">
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            submit: null
                        }}
                    >
                        <form noValidate onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="latitute">Latitude</InputLabel>
                                        <OutlinedInput
                                            id="latitute"
                                            type="string"
                                            value={latitude}
                                            name="email"
                                            onChange={(e) => {
                                                setlatitude(e.target.value);
                                            }}
                                            placeholder="Enter Latitute"
                                            fullWidth
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="longitude">Longitude</InputLabel>
                                        <OutlinedInput
                                            id="longitude"
                                            type="string"
                                            value={longitude}
                                            name="wind direction"
                                            onChange={(e) => {
                                                setlongitude(e.target.value);
                                            }}
                                            placeholder={'Enter Longitude'}
                                        />
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} alignSelf="center">
                                    <AnimateButton>
                                        <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
                                            Predict
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </form>
                    </Formik>
                </div>
            )}
            {isOutput && (
                <div>
                    <OrderTable ws={windSpeed} wd={windDirection} wp={windPower} time={time} />
                    <SalesColumnChart ws={windSpeed} wd={windDirection} time={time} />
                    <MonthlyBarChart wp={windPower} time={time} />
                    <div className="btn">
                        <AnimateButton onSubmit={handleBack}>
                            <Button disableElevation size="large" type="submit" variant="contained" color="primary">
                                Go back
                            </Button>
                        </AnimateButton>
                    </div>
                </div>
            )}
        </>
    );
};

const ComponentTypography = () => (
    <ComponentSkeleton>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="center" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h3">Power Prediction</Typography>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <PredictManual />
            </Grid>
        </Grid>
    </ComponentSkeleton>
);

export default ComponentTypography;
