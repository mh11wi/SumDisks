import { useState } from 'react';
import {
  Box,
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  Tab,
  Tabs
} from '@mui/material';
import UnlimitedStatsTab from 'components/menu/dialogs/statistics/UnlimitedStatsTab';
import AchievementsTab from 'components/menu/dialogs/statistics/AchievementsTab';


const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const StatisticsDialog = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <Dialog
      aria-labelledby="statistics-dialog-title"
      aria-describedby="statistics-dialog-content"
      fullWidth={true}
      maxWidth="sm"
      open={props.open} 
      onClose={props.onClose}
    >
      <DialogTitle id="statistics-dialog-title">Stats & Achievements</DialogTitle>
      <DialogContent id="statistics-dialog-content" dividers={true} sx={{ px: 2, py: 0 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="dialog tabs">
            <Tab label="Unlimited" sx={{ fontSize: '0.75em' }} />
            <Tab label="Achievements" sx={{ fontSize: '0.75em' }} />
          </Tabs>
        </Box>
        
        <TabPanel value={value} index={0}>
          <UnlimitedStatsTab data={props.unlimitedStats} />
        </TabPanel>
        
        <TabPanel value={value} index={1}>
          <AchievementsTab unlimitedStats={props.unlimitedStats} challengeStats={props.challengeStats} />
        </TabPanel>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatisticsDialog;
