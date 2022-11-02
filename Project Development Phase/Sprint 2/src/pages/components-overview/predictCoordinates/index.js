// project import
import AuthWrapper from './PredictWrapper';
import ComponentSkeleton from '../ComponentSkeleton';

// ==============================|| COMPONENTS - PREDCTING MANUALLY||============================== //

import React, { useState, useEffect } from 'react';

// material-ui
import { Button, Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';

// third party
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import AnimateButton from 'components/@extended/AnimateButton';
import options from 'menu-items/toastOptions';
import logo from 'assets/images/icons/turbinehut- 70.svg';

// ============================|| FIREBASE - LOGIN ||============================ //
const PredictManual = () => {
    const [latitude, setlatitude] = useState('');
    const [longitude, setlongitude] = useState('');
    const [isOutput, setisOutput] = useState(false);
    const [Output, setOutput] = useState('');

    const Predict = async () =>
        await toast.promise(
            fetch('http://127.0.0.1:5000/predict-lat-and-lng', {
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
                    setOutput(Math.abs(json.result));
                    setisOutput(true);
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
            )}
            {isOutput && (
                <Formik>
                    <form noValidate onSubmit={handleBack}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Stack spacing={0}>
                                    <InputLabel>The Wind Power predicted for</InputLabel>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={0}>
                                    <InputLabel>Latitude - {latitude}</InputLabel>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={0}>
                                    <InputLabel>Longitude - {longitude}</InputLabel>
                                </Stack>
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                <Stack spacing={0}>
                                    <InputLabel style={{ fontWeight: '700' }}>Wind Power - {Output}</InputLabel>
                                </Stack>
                                <Stack spacing={0}>
                                    <img src={logo} alt="Turbine Hut" srcset="" width="118" />
                                </Stack>
                            </Grid>
                            <Grid item xs={12} alignSelf="center">
                                <AnimateButton>
                                    <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
                                        Go Back
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                </Formik>
            )}
        </>
    );
};

const ComponentTypography = () => (
    <ComponentSkeleton>
        <AuthWrapper>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                        <Typography variant="h3">Power Prediction</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <PredictManual />
                </Grid>
            </Grid>
        </AuthWrapper>
    </ComponentSkeleton>
);

export default ComponentTypography;
