import { useState, Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { getSum } from 'helpers/game';
import { diskMarks } from 'helpers/config';


const ChallengeStatsTab = (props) => {
  const theme = useTheme();
  const [seriesType, setSeriesType] = useState('count');
  
  const getSeriesData = () => {
    switch (seriesType) {
      case 'count': return props.data.map((stat) => stat.count);
      case 'best': return props.data.map((stat) => stat.best);
      case 'average': return props.data.map((stat) => stat.average);
    }
  }
  
  const getSeriesLabel = () => {
    switch (seriesType) {
      case 'count': return 'Completion Distribution';
      case 'best': return 'Best Time Per Sum';
      case 'average': return 'Average Time Per Sum';
    }
  }
  
  const handleSeriesChange = (event) => {
    setSeriesType(event.target.value);
  };

  return (
    <Fragment>
      <Typography sx={{ pt: 2, fontWeight: 500 }}>
        Total Challenges Completed: { getSum(props.data.map((stat) => stat.count)) }
      </Typography>
      
      <BarChart
        xAxis={[
          { 
            tickMinStep: 1, 
            valueFormatter: (index) => `${index}${seriesType === 'count' ? '' : 's'}` 
          }
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
            valueFormatter: (index) => `${getSeriesData()[index]}${seriesType === 'count' ? '' : 's'}`,
            scaleType: 'band'
          }
        ]}
        rightAxis="barValue"
        series={[
          {
            data: getSeriesData(),
            color: theme.palette.primary.light,
            label: getSeriesLabel(),
          }
        ]}
        width={400}
        height={280}
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
        margin={{ right: 60, bottom: 20 }}
        disableAxisListener={true}
        sx={{
          '.MuiChartsAxis-right .MuiChartsAxis-line': { visibility: 'hidden' },
          '.MuiChartsAxis-right .MuiChartsAxis-tick': { visibility: 'hidden' },
          '.MuiChartsAxis-right .MuiChartsAxis-tickLabel': { fill: theme.palette.primary.main, transform: 'translateX(5px)' }
        }}
      />
      
      <FormControl sx={{ mt: 2, mb: 1 }}>
        <RadioGroup value={seriesType} onChange={handleSeriesChange} row>
          <FormControlLabel 
            control={<Radio value="count" size="small" />} 
            label={<Typography sx={{ fontSize: "0.8em" }}>Distribution</Typography>}
          />
          <FormControlLabel 
            control={<Radio value="best" size="small" />} 
            label={<Typography sx={{ fontSize: "0.8em" }}>Best Time</Typography>}
          />
          <FormControlLabel 
            control={<Radio value="average" size="small" />} 
            label={<Typography sx={{ fontSize: "0.8em" }}>Average Time</Typography>}
          />
        </RadioGroup>
      </FormControl>
    </Fragment>
  );
};

export default ChallengeStatsTab;
