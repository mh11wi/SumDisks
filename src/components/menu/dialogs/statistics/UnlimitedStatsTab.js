import { Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';


const UnlimitedStatsTab = (props) => {
  const theme = useTheme();
  
  return (
    <Fragment>
      <Typography sx={{ pt: 2, pb: 1, fontWeight: 500 }}>
        Total Games Won: { props.data.reduce((partialSum, a) => partialSum + a, 0) }
      </Typography>
      <BarChart
        xAxis={[
          { tickMinStep: 1 }
        ]}
        yAxis={[
          {
            id: 'barCategories',
            data: ['3 Disks', '4 Disks', '5 Disks', '6 Disks', '7 Disks'],
            scaleType: 'band'
          },
        ]}
        series={[
          {
            data: props.data,
            color: theme.palette.primary.light,
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
      />
    </Fragment>
  );
};

export default UnlimitedStatsTab;
