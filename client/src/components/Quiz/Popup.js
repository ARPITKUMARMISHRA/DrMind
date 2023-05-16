import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  maxWidth: '95%',
  bgcolor: 'background.paper',
  outline: 'none',
  border: 'none',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

function Group({ group }) {
  const [color, setColor] = React.useState(() => {
    if (group === 'red') return 'red';
    if (group === 'green') return 'green';
  });
  return (
    <span
      style={{
        display: 'inline-block',
        width: '11px',
        height: '11px',
        backgroundColor: color,
        borderRadius: '50%'
      }}
    ></span>
  );
}

export default function Popup({ handleModalVisibility }) {
  const [open, setOpen] = React.useState(true);
  React.useEffect(() => {
    setOpen(true);
  }, []);
  const handleClose = () => {
    handleModalVisibility(false);
    setOpen(false)
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Before taking the quiz:
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Quiz result will determine the group you are alloted.
            </Typography>
            <br />

            <ul>
              <li style={{ listStyle: 'circle' }}>
                Group red (<Group group='red' />) : People with meltal illness
              </li>
              <li style={{ listStyle: 'circle' }}>
                Group green (<Group group='green' />) : Mentally fit people
              </li>
            </ul>
            <br />

            <ul>
              <li style={{ listStyle: 'circle' }}>
                'Red' group people can seek help from 'Green' group.
              </li>
              <li style={{ listStyle: 'circle' }}>
                'Green' group can help people of 'Red' group.
              </li>
            </ul>

          </Box>
        </Fade>
      </Modal>
    </div>
  );
}