import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options

// ==============================|| MONTHLY BAR CHART ||============================== //

const MonthlyBarChart = (props) => {
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const info = theme.palette.info.light;

    const [series] = useState([
        {
            data: props.wp.map((element) => Math.abs(Math.round(element)))
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
                text: 'Wind Power'
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
            colors: [info],
            xaxis: {
                labels: {
                    style: {
                        colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary]
                    }
                }
            },
            tooltip: {
                theme: 'light'
            }
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [primary, info, secondary]);

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="bar" height={365} />
        </div>
    );
};

export default MonthlyBarChart;
