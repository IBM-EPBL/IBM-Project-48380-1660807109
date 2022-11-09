import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options

// ==============================|| SALES COLUMN CHART ||============================== //

const SalesColumnChart = (props) => {
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const warning = theme.palette.warning.main;
    const primaryMain = theme.palette.primary.main;
    const successDark = theme.palette.success.dark;
    const [series, setseries] = useState([
        {
            name: 'Wind Speed',
            data: props.ws.map((element) => Math.round(element))
        },
        {
            name: 'Wind direction',
            data: props.wd.map((element) => Math.round(element))
        }
    ]);

    const [options, setOptions] = useState({
        chart: {
            type: 'bar',
            height: 430,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '5%'
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 8,
            colors: ['transparent']
        },
        xaxis: {
            categories: props.time
        },
        yaxis: {
            title: {
                text: 'Wind speed and direction'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter(val) {
                    return `${val}`;
                }
            }
        },
        legend: {
            show: true,
            fontFamily: `'Public Sans', sans-serif`,
            offsetX: 0,
            offsetY: 0,
            labels: {
                useSeriesColors: false
            },
            markers: {
                width: 16,
                height: 16,
                radius: '50%',
                offsexX: 2,
                offsexY: 2
            },
            itemMargin: {
                horizontal: 15,
                vertical: 50
            }
        },
        responsive: [
            {
                breakpoint: 600,
                options: {
                    yaxis: {
                        show: false
                    }
                }
            }
        ]
    });

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [warning, primaryMain],
            xaxis: {
                labels: {
                    style: {
                        colors: [secondary, secondary, secondary, secondary, secondary, secondary]
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [secondary]
                    }
                }
            },
            grid: {
                borderColor: line
            },
            tooltip: {
                theme: 'light'
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                labels: {
                    colors: 'grey.500'
                }
            }
        }));
    }, [primary, secondary, line, warning, primaryMain, successDark]);

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="bar" height={430} />
        </div>
    );
};

export default SalesColumnChart;
