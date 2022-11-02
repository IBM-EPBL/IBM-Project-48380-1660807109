// project import
import AuthWrapper from './PredictWrapper';
import ComponentSkeleton from '../ComponentSkeleton';

// ==============================|| COMPONENTS - PREDCTING MANUALLY||============================== //

import React, { useState } from 'react';

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
    const [windSpeed, setwindSpeed] = useState('');
    const [windDirection, setwindDirection] = useState('');
    const [isOutput, setisOutput] = useState(false);
    const [Output, setOutput] = useState('');

    const Predict = async () =>
        await toast.promise(
            fetch('http://127.0.0.1:5000/predict-ws-and-wd', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ws: windSpeed,
                    wd: windDirection
                })
            })
                .then((res) => res.json())
                .then((json) => {
                    setOutput(json.result);
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
        setwindDirection('');
        setwindSpeed('');
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
                                    <InputLabel htmlFor="email-login">Wind Speed</InputLabel>
                                    <OutlinedInput
                                        id="email-login"
                                        type="email"
                                        value={windSpeed}
                                        name="email"
                                        onChange={(e) => {
                                            setwindSpeed(e.target.value);
                                        }}
                                        placeholder="Enter Wind Speed"
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-login">Wind direction</InputLabel>
                                    <OutlinedInput
                                        id="password-login"
                                        type="string"
                                        value={windDirection}
                                        name="wind direction"
                                        onChange={(e) => {
                                            setwindDirection(e.target.value);
                                        }}
                                        placeholder={'Enter Wind Direction'}
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
                                    <InputLabel>Wind Speed - {windSpeed}</InputLabel>
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={0}>
                                    <InputLabel>Wind Direction - {windDirection}</InputLabel>
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
