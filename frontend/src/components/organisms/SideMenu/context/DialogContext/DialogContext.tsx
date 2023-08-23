import { Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from '@mui/material';
import React, { createContext, ReactNode, useState } from 'react';

interface DialogProviderProps {
  children: ReactNode;
}

type CustomDialogProps = Omit<DialogProps, 'open'>;

interface DialogContextValue {
  showDialog: (title: string | ReactNode, content: string | ReactNode, actions: Array<ReactNode>, props?: CustomDialogProps) => void;
  hideDialog: () => void;
}

export const DialogContext = createContext<DialogContextValue | undefined>(undefined);

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const [dialogProps, setDialogProps] = useState<CustomDialogProps>();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<string | ReactNode>('');
  const [content, setContent] = useState<string | ReactNode>('');
  const [actions, setActions] = useState<Array<ReactNode>>([]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const showDialog = (title: string | ReactNode, content: string | ReactNode, actions: Array<ReactNode>, props?: CustomDialogProps) => {
    setTitle(title);
    setContent(content);
    setActions(actions);
    setIsOpen(true);
    if (props) setDialogProps(props);
  };

  const hideDialog = () => {
    setIsOpen(false);
    setDialogProps(undefined);
  };

  const contextValue: DialogContextValue = { showDialog, hideDialog };

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      <Dialog open={isOpen} onClose={handleClose} {...dialogProps}>
        {title && <DialogTitle>{title}</DialogTitle>}
        {content && <DialogContent>{content}</DialogContent>}
        {actions.length > 0 && <DialogActions>{actions}</DialogActions>}
      </Dialog>
    </DialogContext.Provider>
  );
};
