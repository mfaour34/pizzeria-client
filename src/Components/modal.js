import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    divider: {
        // Theme Color, or use css color in quote
        background: 'black'
    },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MyModal({ data, setShow }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleClose = () => { setOpen(false); setShow(false) };
    console.log(data)
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Items
                </Typography>
                {data.items.map(item => {
                    console.log(item)
                    return (
                        <div key={Math.random()}>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Name: {item.Name}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Price: {item.Price}$
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Quantity: {item.quantity}
                            </Typography>
                            <Divider classes={{ root: classes.divider }} />

                        </div>
                    )
                })}
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <b>Total: {data.total}$</b>
                </Typography>
            </Box>
        </Modal>
    );
}