import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { createContext, ReactNode, useState } from 'react';

interface DialogProviderProps {
  children: ReactNode;
}

interface DialogContextValue {
  showDialog: (title: string | ReactNode, content: string | ReactNode, actions: ReactNode[]) => void;
  hideDialog: () => void;
}

export const DialogContext = createContext<DialogContextValue | undefined>(undefined);

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState<string | ReactNode>('');
  const [content, setContent] = useState<string | ReactNode>('');
  const [actions, setActions] = useState<ReactNode[]>([]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const showDialog = (title: string | ReactNode, content: string | ReactNode, actions: ReactNode[]) => {
    setTitle(title);
    setContent(content);
    setActions(actions);
    setIsOpen(true);
  };

  const hideDialog = () => {
    setIsOpen(false);
  };

  const contextValue: DialogContextValue = { showDialog, hideDialog };

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      <Dialog open={isOpen} onClose={handleClose}>
        {title && <DialogTitle>{title}</DialogTitle>}
        {content && <DialogContent>{content}</DialogContent>}
        {actions.length > 0 && <DialogActions>{actions}</DialogActions>}
      </Dialog>
    </DialogContext.Provider>
  );
};
