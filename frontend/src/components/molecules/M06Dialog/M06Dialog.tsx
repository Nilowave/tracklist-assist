import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAtom } from 'jotai';
import { ReactElement } from 'react';
import { dialogAtom } from './M06Dialog.atoms';
import { A03Text } from '../../atoms/A03Text/A03Text';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface M06DialogProps {}

// eslint-disable-next-line no-empty-pattern
export const M06Dialog = ({}: M06DialogProps): ReactElement => {
  const [dialog, setDialog] = useAtom(dialogAtom);

  const handleClose = () => {
    setDialog({
      ...dialog,
      open: false,
    });
  };

  return (
    <Dialog
      open={dialog.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">{dialog.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{dialog.text}</DialogContentText>
        <br />
        {dialog.bold && <A03Text type="bold">{dialog.bold}</A03Text>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          {dialog.confirm}
        </Button>
        {dialog.reject && (
          <Button onClick={handleClose} autoFocus>
            {dialog.reject}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
