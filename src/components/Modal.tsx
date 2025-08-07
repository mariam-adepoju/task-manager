import { Button } from "./ui/button";
import { Card } from "./ui/card";

type ModalProps = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const Modal = ({
  title = "Confirm Delete",
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ModalProps) => {
  return (
    <Card className=" py-6 px-4 rounded-md  max-w-sm w-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-4 z-50 ">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p>{message}</p>
      <div className="flex justify-end gap-4">
        <Button onClick={onCancel}>{cancelText}</Button>
        <Button variant="destructive" onClick={onConfirm}>
          {confirmText}
        </Button>
      </div>
    </Card>
  );
};

export default Modal;
