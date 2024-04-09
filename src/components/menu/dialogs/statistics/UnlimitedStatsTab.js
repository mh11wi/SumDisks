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
      <Typography sx={{ pt: 2, pb: 1, fontWeight: 500 }}>
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
