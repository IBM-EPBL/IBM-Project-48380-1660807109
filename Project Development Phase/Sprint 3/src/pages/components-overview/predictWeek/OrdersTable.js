import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
    {
        id: 'Date',
        align: 'left',
        disablePadding: true,
        label: 'Date'
    },
    {
        id: 'Time',
        align: 'left',
        disablePadding: true,
        label: 'Time'
    },
    {
        id: 'Wind-speed',
        align: 'left',
        disablePadding: true,
        label: 'Wind Speed 🌪'
    },
    {
        id: 'Wind-direction',
        align: 'left',
        disablePadding: true,
        label: 'Wind direction'
    },
    {
        id: 'Wind-Power',
        align: 'right',
        disablePadding: false,
        label: 'Wind Power'
    }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead() {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell key={headCell.id} align={headCell.align} disablePadding>
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
    let color;
    let title;
    switch (status) {
        case 0:
            color = 'warning';
            title = 'Pending';
            break;
        case 1:
            color = 'success';
            title = 'Approved';
            break;
        case 2:
            color = 'error';
            title = 'Rejected';
            break;
        default:
            color = 'primary';
            title = 'None';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};

OrderStatus.propTypes = {
    status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable(props) {
    const [selected] = useState([]);
    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
    function createData(Date, Time, WindSpeed, WindDirection, WindPower) {
        return { Date, Time, WindSpeed, WindDirection, WindPower };
    }

    var rows = [];
    for (let i = 0; i < props.wd.length; i++) {
        let temp = new Date(props.time[i]);
        rows.push(
            createData(
                temp.toLocaleDateString(),
                temp.getHours(),
                Math.round(props.ws[i] * 100) / 100,
                Math.round(props.wd[i] * 100) / 100,
                Math.round(Math.abs(props.wp[i]) * 100) / 100
            )
        );
    }
    return (
        <Box>
            <TableContainer
                sx={{
                    width: '100vh',
                    overflowX: 'auto',
                    position: 'relative',
                    display: 'block',
                    minWidth: '100vh',
                    '& td, & th': { whiteSpace: 'nowrap' }
                }}
                xs={{ maxWidth: '100vh', '& td, & th': { whiteSpace: 'wrap' } }}
            >
                <Table aria-labelledby="tableTitle" style={{ maxWidth: '100vh' }}>
                    <OrderTableHead />
                    <TableBody>
                        {rows.map((row, index) => {
                            const isItemSelected = isSelected(row.trackingNo);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={index}
                                    selected={isItemSelected}
                                >
                                    <TableCell component="th" id={labelId} scope="row" align="left">
                                        <Link color="secondary" component={RouterLink} to="">
                                            {row.Date}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="left">{row.Time + ':00'}</TableCell>
                                    <TableCell align="left">{row.WindSpeed}</TableCell>
                                    <TableCell align="left">{row.WindDirection}</TableCell>
                                    <TableCell align="right">
                                        <NumberFormat value={row.WindPower} displayType="text" thousandSeparator suffix="$" />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
