import { useSnackbar, VariantType } from "notistack";
import React from "react";

let useSnackbarRef: any;
export const SnackbarUtilsConfigurator: React.FC = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

const options = {
  autoHideDuration: 3000,
  variant: "error",
};

export default {
  success(msg: string) {
    this.toast(msg, "success", options);
  },
  warning(msg: string) {
    this.toast(msg, "warning", options);
  },
  info(msg: string) {
    this.toast(msg, "info", options);
  },
  error(msg: string) {
    this.toast(msg, "error", options);
  },
  toast(msg: string, variant: VariantType = "default") {
    useSnackbarRef.enqueueSnackbar(msg, { variant });
  },
};
