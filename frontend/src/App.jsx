import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { hideError } from "./store/slices/errorSlice";

function App() {
  const dispatch = useDispatch();
  const { message, open } = useSelector((state) => state.error);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideError());
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen p-4">
        <Outlet />
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
