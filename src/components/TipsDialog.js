import React, { Fragment } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Link,
  MobileStepper,
  Paper
} from '@mui/material';
import {
  EmojiEmotions,
  EmojiEvents,
  KeyboardArrowLeft, 
  KeyboardArrowRight, 
  Lightbulb,
  Quiz
} from '@mui/icons-material';

const steps = [
  {
    icon: ( <Lightbulb /> ),
    primary: 'Pro Tip',
    secondary: 'Look for the biggest number as a starting point. Focus on this column and try to find other numbers in each disk that could work with it. Typically if there is one really big number in a column, the others will be relatively small.'
  },
  {
    icon: ( <Quiz /> ),
    primary: 'Did You Know?',
    secondary: (
      <Fragment>
        I created a word variant to this game, where disks of letters can be rotated to form words. If you are also a fan of word games, please check out <Link href="https://mh11wi.github.io/WordDisks/" target="_blank">Word Disks</Link>!
      </Fragment>
    )
  },
  {
    icon: ( <EmojiEmotions /> ),
    primary: 'Fun Fact',
    secondary: (
      <Fragment>
        This game was inspired by a physical version I saw at <Link href="https://www.museumofplay.org/" target="_blank">The Strong National Museum of Play</Link>. As soon as I saw it I wanted recreate it digitally, and make it customizable so that players at any level can enjoy!
      </Fragment>
    )
  },
  {
    icon: ( <Lightbulb /> ),
    primary: 'Pro Tip',
    secondary: 'Each configurable sum (10, 20, 50, and 100) is a multiple of 10. What combination of digits add up to 10? Look for these patterns in the last digit of the numbers across each disk, and try to group them in one column.'
  },
  {
    icon: ( <Quiz /> ),
    primary: 'Did You Know?',
    secondary: (
      <Fragment>
        The <Link href="https://opendyslexic.org/" target="_blank">OpenDyslexic</Link> font was chosen to make the disks easier to read, particularly when the numbers appear upside down. Each number has a weighted bottom to help distinguish 6 and 9, for instance.
      </Fragment>
    )
  },
  {
    icon: ( <EmojiEvents /> ),
    primary: 'Keep Practicing',
    secondary: 'This game is a great way to exercise your mental math skills! Practice at your own pace, or if you are up for a challenge, try increasing the number of disks, numbers per disk, or sum of numbers.'
  }
];

const TipsDialog = (props) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  return (
    <Dialog
      aria-labelledby="tips-dialog-title"
      aria-describedby="tips-dialog-content"
      fullWidth={true}
      maxWidth="sm"
      open={props.open} 
      onClose={props.onClose}
    >
      <DialogTitle id="tips-dialog-title">Tips & Tidbits</DialogTitle>
      <DialogContent id="tips-dialog-content" dividers={true}>
        <Paper>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                  {steps[activeStep].icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={steps[activeStep].primary} 
                secondary={steps[activeStep].secondary}
                secondaryTypographyProps={{ component: "div" }}
              />
            </ListItem>
          </List>
          <MobileStepper
            position="static"
            steps={maxSteps}
            activeStep={activeStep}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TipsDialog;
