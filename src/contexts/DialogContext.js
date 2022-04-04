import React from "react";
import { Dialog } from "@headlessui/react";

const DialogContext = ({
  isOpen = false,
  title,
  message,
  onConfirm,
  onDismiss,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => onDismiss()}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="inline-block w-full max-w-sm p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            {title}
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">{message}</p>
          </div>
          <div className="flex items-end mt-4">
            <button
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-black bg-white border-2 border-black rounded-md focus:outline-none mr-4"
              onClick={onConfirm}
            >
              Confirm
            </button>
            <button
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-black"
              color="primary"
              variant="contained"
              onClick={onDismiss}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

const ConfirmationDialogContext = React.createContext({});

const ConfirmationDialogProvider = ({ children }) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogConfig, setDialogConfig] = React.useState({});

  const openDialog = ({ title, message, actionCallback }) => {
    console.log("openDialog -> setDialogOpen", setDialogOpen);
    console.log("openDialog -> dialogOpen", dialogOpen);
    setDialogOpen(true);
    setDialogConfig({ title, message, actionCallback });
  };

  const resetDialog = () => {
    setDialogOpen(false);
    setDialogConfig({});
  };

  const onConfirm = () => {
    resetDialog();
    dialogConfig.actionCallback(true);
  };

  const onDismiss = () => {
    resetDialog();
    dialogConfig.actionCallback(false);
  };

  return (
    <ConfirmationDialogContext.Provider value={{ openDialog }}>
      <DialogContext
        isOpen={dialogOpen}
        title={dialogConfig?.title}
        message={dialogConfig?.message}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
      />
      {children}
    </ConfirmationDialogContext.Provider>
  );
};

const useDialog = () => {
  const { openDialog } = React.useContext(ConfirmationDialogContext);

  const getConfirmation = ({ ...options }) =>
    new Promise((res) => {
      openDialog({ actionCallback: res, ...options });
    });

  return { getConfirmation };
};

export default DialogContext;
export { ConfirmationDialogProvider, useDialog };
