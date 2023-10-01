import React from "react";
import { Backdrop, Button, CircularProgress, Grid, Toolbar } from "@mui/material";
import {
  AddEmployeeForm,
  AlertSnackbar,
  type AlertSnackbarProps,
  Footer,
  Header,
} from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { IDBContext } from "../../context";
import type { EmployeeSchema } from "../../schemas";

export function AddEmployee(): React.JSX.Element {
  const formRef = React.useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const params = useParams();
  const { IDBInstance, addEmployee, getIndividualEmployee, updateEmployee } =
    React.useContext(IDBContext);
  const [formData, setFormData] = React.useState<EmployeeSchema>({
    name: "",
    role: "none",
    startDate: new Date().toUTCString(),
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState<{
    show: AlertSnackbarProps["open"];
    message: AlertSnackbarProps["children"];
    status: AlertSnackbarProps["alertProps"]["severity"];
  }>({
    show: false,
    status: undefined,
    message: undefined,
  });

  React.useEffect(() => {
    if (params.id !== undefined) {
      setIsLoading(true);
      const response = getIndividualEmployee(Number(params.id));
      if (response !== undefined) {
        response.onsuccess = function (this, _ev) {
          setFormData(this.result);
          setIsLoading(false);
        };
      }
    }
  }, [params.id, IDBInstance]);

  const addOrUpdateEmployee = (value: EmployeeSchema): void => {
    if (value.id !== undefined) {
      const response = updateEmployee(value);
      if (response !== undefined) {
        response.onsuccess = function (this, _ev) {
          setShowAlert({
            show: true,
            status: "success",
            message: "Employee updated successfully.",
          });
        };
      }
    } else {
      const response = addEmployee(value);
      if (response !== undefined) {
        response.onsuccess = function (this, _ev) {
          setShowAlert({
            show: true,
            status: "success",
            message: "Employee added successfully.",
          });
        };
      }
    }
  };

  const handleAlertClose = (): void => {
    setShowAlert({
      show: false,
      status: undefined,
      message: undefined,
    });
  };

  return (
    <Grid display="flex" flexDirection="column" minHeight="100vh">
      <AlertSnackbar
        alertProps={{
          severity: showAlert.status,
          variant: "filled",
          sx: { color: "white" },
        }}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        open={showAlert.show}
        sx={{ minWidth: 300 }}
      >
        {showAlert.message}
      </AlertSnackbar>
      <Grid item>
        <Header title={`${params.id !== undefined ? "Update" : "Add"} Employee Details`} />
      </Grid>
      <Grid item>
        <Toolbar />
      </Grid>
      <Grid container flex={1} item width="100%">
        <Grid alignItems="center" container flexDirection="column" item spacing={2}>
          <Grid item />
          <Grid item width="100%">
            <AddEmployeeForm onSubmit={addOrUpdateEmployee} ref={formRef} value={formData} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Toolbar />
      </Grid>
      <Grid item>
        <Footer>
          <Grid container gap={2} justifyContent="flex-end">
            <Grid item>
              <Button
                onClick={() => {
                  navigate("/");
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  formRef.current?.submit();
                }}
                variant="contained"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Footer>
      </Grid>
      <Backdrop
        onClick={() => {
          setIsLoading(false);
        }}
        open={isLoading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
}
