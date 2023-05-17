import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Ref } from 'react-hook-form';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '.MuiPaper-root': {
        minWidth: "800px"
    },
    '& .MuiDialogContent-root': {
        padding: 0
        // padding: theme.spacing(2),

    },
    '& .MuiDialogActions-root': {
        // padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

export default function CustomizedDialog(props: { isOpen: boolean, setIsOpen: Function, textDialog: string, textBtn: string, content: React.ReactElement<any, any> }) {
    const handleClickOpen = () => {
        props.setIsOpen(true);
    };

    const handleClose = () => {
        props.setIsOpen(false);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                {props.textBtn}
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={props.isOpen}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {props.textDialog}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {props.content}
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}