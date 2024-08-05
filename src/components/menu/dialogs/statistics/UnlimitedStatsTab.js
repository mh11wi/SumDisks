import { Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { getSum } from 'helpers/game';
import { diskMarks } from 'helpers/config';


const UnlimitedStatsTab = (props) => {
  const theme = useTheme();
  
  return (
    <Fragment>
      <Typography sx={{ pt: 2, fontWeight: 500 }}>
        Total Games Won: { getSum(props.data) }
      </Typography>
      <BarChart
        xAxis={[
          { tickMinStep: 1 }
        ]}
        yAxis={[
          {
            id: 'barCategories',
            data: diskMarks.map((mark) => `${mark.value} Disks`),
            scaleType: 'band'
          },
          {
            id: 'barValue',
            data: diskMarks.map((mark, index) => index),
            valueFormatter: (index) => `${props.data[index]}`,
            scaleType: 'band'
          }
        ]}
        rightAxis="barValue"
        series={[
          {
            data: props.data,
            color: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.light,
            label: 'Win Distribution'
          },
        ]}
        width={400}
        height={300}
        layout="horizontal"
        slotProps={{
          legend: {
            position: {
              vertical: 'top',
              horizontal: 'middle',
            },
            itemMarkWidth: 0,
            itemMarkHeight: 0,
            labelStyle: { fontSize: "0.95em" }
          }
        }}
        margin={{ right: 60 }}
        disableAxisListener={true}
        sx={{
          '.MuiChartsAxis-right .MuiChartsAxis-line': { visibility: 'hidden' },
          '.MuiChartsAxis-right .MuiChartsAxis-tick': { visibility: 'hidden' },
          '.MuiChartsAxis-right .MuiChartsAxis-tickLabel': { 
            fill: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,  
            transform: 'translateX(5px)' 
           }
        }}
      />
    </Fragment>
  );
};

export default UnlimitedStatsTab;
