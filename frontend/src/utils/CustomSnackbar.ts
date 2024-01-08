import { useSnackbar, VariantType } from "notistack";
import React from "react";

let useSnackbarRef: any;
export const SnackbarUtilsConfigurator: React.FC = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

export default {
  success(msg: string) {
    this.toast(msg, "success");
  },
  warning(msg: string) {
    this.toast(msg, "warning");
  },
  info(msg: string) {
    this.toast(msg, "info");
  },
  error(msg: string) {
    this.toast(msg, "error");
  },
  toast(msg: string, variant: VariantType = "default") {
    if (!useSnackbarRef) return;
    useSnackbarRef.enqueueSnackbar(msg, { variant, autoHideDuration: 3000 });
  },
};
