import {
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText,
  DialogTitle
} from '@mui/material';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from 'react-share';


const ShareDialog = (props) => {
  return (
    <Dialog
      aria-labelledby="share-dialog-title"
      aria-describedby="share-dialog-content"
      fullWidth={true}
      maxWidth="xs"
      open={props.open} 
      onClose={props.onClose}
    >
      <DialogTitle id="share-dialog-title">Share Game</DialogTitle>
      <DialogContent id="share-dialog-content" dividers={true}>
        <DialogContentText align="center" sx={{ pb: 3 }}>
          If you like Sum Disks, please give it a share!
        </DialogContentText>
        <DialogContentText align="center">
          <FacebookShareButton
            className="shareOption"
            url={props.data.url}
            quote={props.data.text}
          >
            <FacebookIcon size={40} round />
          </FacebookShareButton>
          
          <TwitterShareButton
            className="shareOption"
            url={props.data.url}
            title={props.data.text}
          >
            <TwitterIcon size={40} round />
          </TwitterShareButton>
          
          <WhatsappShareButton
            className="shareOption"
            url={props.data.url}
            title={props.data.text}
          >
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>
        
          <EmailShareButton
            className="shareOption"
            url={props.data.url}
            subject={props.data.title}
            body={props.data.text}
          >
            <EmailIcon size={40} round />
          </EmailShareButton>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareDialog;
