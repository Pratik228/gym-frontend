import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert"; // Make sure to import `Alert` correctly
import { hideSnackbar } from "../slices/snackbarSlice";

const SnackBar = () => {
  console.log("Snackbar");
  const snackbar = useSelector((state) => state.snackbar);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      open={snackbar.show}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={snackbar.severity}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default Snackbar;
