import { useContext } from 'react';
import { DialogContext } from '../components/organisms/SideMenu/context/DialogContext/DialogContext';

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return { showDialog: context.showDialog, hideDialog: context.hideDialog };
};
