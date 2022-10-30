// project import
import AuthWrapper from './PredictWrapper';
import ComponentSkeleton from '../ComponentSkeleton';

// ==============================|| COMPONENTS - PREDCTING MANUALLY||============================== //

import React, { useState } from 'react';

// material-ui
import { Button, Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';

// third party
import { Formik } from 'formik';

import AnimateButton from 'components/@extended/AnimateButton';

// ============================|| FIREBASE - LOGIN ||============================ //

const PredictManual = () => {
    const [windSpeed, setwindSpeed] = useState('');
    const [windDirection, setwindDirection] = useState('');
    const handleSubmit = (e) => {
        console.log(windDirection, windSpeed);
        e.preventDefault();
    };
    return (
        <>
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
