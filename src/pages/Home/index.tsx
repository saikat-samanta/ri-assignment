import React from "react";
import {
  Backdrop,
  CircularProgress,
  Grid,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  AlertSnackbar,
  type AlertSnackbarProps,
  CustomList,
  Footer,
  Header,
} from "../../components";
import { NoEmployeeFound } from "../../Assets";
import { FABButton } from "../../Base";
import { IDBContext } from "../../context";
import { type EmployeeSchema } from "../../schemas";

export function Home(): React.JSX.Element {
  const { IDBInstance, getAllEmployee, deleteEmployee } = React.useContext(IDBContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("md"));
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFetchedComplete, setIsFetchedComplete] = React.useState(false);
  const [employeeList, setEmployeeList] = React.useState<{
    current: EmployeeSchema[];
    previous: EmployeeSchema[];
  }>({
    current: [],
    previous: [],
  });
  const [showAlert, setShowAlert] = React.useState<{
    show: AlertSnackbarProps["open"];
    message: AlertSnackbarProps["children"];
    status: AlertSnackbarProps["alertProps"]["severity"];
  }>({
    show: false,
    status: undefined,
    message: undefined,
  });

  const fetchEmployee = React.useCallback(() => {
    const response = getAllEmployee();
    if (response !== undefined) {
      response.onsuccess = function (this, _ev) {
        const out = this.result.reduce<typeof employeeList>(
          (pre, cur) => ({
            current: cur.endDate === undefined ? [...(pre.current ?? []), cur] : pre.current ?? [],
            previous:
              cur.endDate !== undefined ? [...(pre.previous ?? []), cur] : pre.previous ?? [],
          }),
          {
            current: [],
            previous: [],
          },
        );
        setEmployeeList(out);
        setIsLoading(false);
        setIsFetchedComplete(true);
      };
    }
  }, [IDBInstance]);

  React.useEffect(() => {
    if (IDBInstance !== undefined) {
      setIsLoading(true);
      fetchEmployee();
    }
  }, [IDBInstance]);

  const handleEdit = (data: EmployeeSchema): void => {
    navigate(`/employee-details/${data.id}`);
  };

  const handleDelete = (data: EmployeeSchema): void => {
    const response = deleteEmployee(data);
    if (response !== undefined) {
      response.onsuccess = function (this, _ev) {
        setShowAlert({
          show: true,
          status: "success",
          message: "Employee deleted successfully.",
        });
        fetchEmployee();
      };
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
        onClose={handleAlertClose}
        autoHideDuration={6000}
        open={showAlert.show}
        sx={{ minWidth: 300 }}
      >
        {showAlert.message}
      </AlertSnackbar>
      <Grid item>
        <Header />
      </Grid>
      <Grid item>
        <Toolbar />
      </Grid>
      <Grid container flex={1} item width="100%">
        {isFetchedComplete &&
        employeeList.current.length < 1 &&
        employeeList.previous.length < 1 ? (
          <Grid alignItems="center" container item justifyContent="center">
            <Grid item>
              <NoEmployeeFound />
            </Grid>
          </Grid>
        ) : null}
        {employeeList.current.length > 0 || employeeList.previous.length > 0 ? (
          <Grid flex={1} item>
            <Grid container flexDirection="column" height="100%" item>
              <Grid flex={1} item>
                <Grid alignItems="center" bgcolor="lightgrey" container height={30} item>
                  <Grid item paddingLeft={1}>
                    <Typography color="#1976d2" fontSize={16} fontWeight={500}>
                      Current Employees
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  sx={{ overflowY: "scroll", position: "relative", height: "calc(100% - 30px)" }}
                >
                  <Grid item sx={{ position: "absolute", width: "100%" }}>
                    <CustomList
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                      options={employeeList.current}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid flex={1} item>
                <Grid alignItems="center" bgcolor="lightgrey" container height={30} item>
                  <Grid item paddingLeft={1}>
                    <Typography color="#1976d2" fontSize={16} fontWeight={500}>
                      Previous Employees
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  item
                  sx={{ overflowY: "scroll", position: "relative", height: "calc(100% - 30px)" }}
                >
                  <Grid item sx={{ position: "absolute", width: "100%" }}>
                    <CustomList
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                      options={employeeList.previous}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
      <Grid item>
        <Toolbar />
      </Grid>
      <Grid item>
        <Footer>
          {match ? <Typography color="lightgrey">Swipe left to delete</Typography> : null}
          <FABButton
            color="primary"
            onClick={() => {
              navigate("/employee-details");
            }}
            sx={{ top: -25 }}
          >
            <Add />
          </FABButton>
        </Footer>
      </Grid>
      <Backdrop
        onClick={() => {
          setIsLoading(false);
        }}
        open={isLoading}
        sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
}
