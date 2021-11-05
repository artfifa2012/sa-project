import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  makeStyles,
  Theme,
  createStyles,
  alpha,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import TextField from "@material-ui/core/TextField";

import { UsersInterface } from "../models/IUser";
import { ContactsInterface } from "../models/IContact";
import { SexsInterface } from "../models/ISex";
import { OldusersInterface } from "../models/IOlduser";
import { ReligionsInterface } from "../models/IReligion";
import { AccountInterface } from "../models/IAccount";

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  })
);

function AccountCreate() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [oldusers, setOldusers] = useState<OldusersInterface[]>([]);
  const [sexs, setSexs] = useState<SexsInterface[]>([]);
  const [contacts, setContacts] = useState<ContactsInterface[]>([]);
  const [religions, setReligions] = useState<ReligionsInterface[]>([]);

  const [users, setUsers] = useState<Partial<UsersInterface>>({});
  const [account, setAccount] = useState<Partial<AccountInterface>>({});

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);


  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof account;
    setAccount({
      ...account, [name]: event.target.value,
    });
  };

  const handleInputChange = (

    event: React.ChangeEvent<{ id?: string; value: any }>
 
  ) => {
 
    const id = event.target.id as keyof typeof AccountCreate;
 
    const { value } = event.target;
 
    setAccount({ ...account, [id]: value });
 
  };

/*
  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };
*/

const getUsers = async () => {
  const uid = Number(localStorage.getItem("uid"));
  fetch(`${apiUrl}/user/${uid}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        setUsers(res.data);
      } else {
        console.log("else");
      }
    });
};


  const getContacts = async () => {
    fetch(`${apiUrl}/contacts`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setContacts(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getSexs = async () => {
    fetch(`${apiUrl}/sexs`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSexs(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getOldusers = async () => {
    fetch(`${apiUrl}/oldusers`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setOldusers(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getReligions = async () => {
    fetch(`${apiUrl}/religions`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setReligions(res.data);
        } else {
          console.log("else");
        }
      });
  };


  useEffect(() => {
    getContacts();
    getSexs();
    getOldusers();
    getReligions();
    getUsers();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };



  function submit() {
    let data = {
      
      OwnerID: convertType(account.UserID),

      Address: convertType(account.Address),
      Province   : convertType(account.Province),
      ContactID: convertType(account.ContactID),
      SexID: convertType(account.SexID),
      OlduserID: convertType(account.OlduserID),
      ReligionID: convertType(account.ReligionID),
      
    };

    console.log(data)

    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/product_stocks`, requestOptionsPost)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log("บันทึกได้")
        setSuccess(true);
      } else {
        console.log("บันทึกไม่ได้")
        setError(true);
      }
    });
  }

  return (
    <Container className={classes.container} maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper className={classes.paper}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกข้อมูลส่วนตัว
            </Typography>
          </Box>
        </Box>
        <Divider />

         <Grid container spacing={3} className={classes.root}>
        <Grid item xs={3}>
           <FormControl fullWidth variant="outlined">
           <p>ที่อยู่</p>

            <TextField

              id="Address"

              variant="outlined"

              type="string"

              size="medium"

              InputProps={{ inputProps: { min: 1 } }}

              InputLabelProps={{

                shrink: true,

              }}

              value={account.Address || ""}

              onChange={handleInputChange}

            />
           </FormControl>
         </Grid>
          
         <Grid item xs={3}>
           <FormControl fullWidth variant="outlined">
           <p>จังหวัด</p>

            <TextField

              id="Province"

              variant="outlined"

              type="number"

              size="medium"
              
              InputProps={{ inputProps: { min: 1 } }}

              InputLabelProps={{

                shrink: true,

              }}

              value={account.Province || ""}

              onChange={handleInputChange}

            />
           </FormControl>
         </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ช่องทางการติดต่อ</p>
              <Select
                native
                value={account.ContactID}
                onChange={handleChange}
                inputProps={{
                  name: "ContractID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกช่องทางการติดต่อ
                </option>
                {contacts.map((item: ContactsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Ctype}
                  </option>
                ))}
              </Select>
            </FormControl>
            </Grid>

            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เพศ</p>
              <Select
                native
                value={account.SexID}
                onChange={handleChange}
                inputProps={{
                  name: "SexID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกเพศ
                </option>
                {sexs.map((item: SexsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Stype}
                  </option>
                ))}
              </Select>
            </FormControl>
            </Grid>

            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>การเคยเป็นสมาชิก</p>
              <Select
                native
                value={account.OlduserID}
                onChange={handleChange}
                inputProps={{
                  name: "OlduserID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกการเคยเป็นสมาชิก
                </option>
                {oldusers.map((item: OldusersInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Otype}
                  </option>
                ))}
              </Select>
            </FormControl>
            </Grid>

            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ศาสนา</p>
              <Select
                native
                value={account.ReligionID}
                onChange={handleChange}
                inputProps={{
                  name: "ReligionID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกศาสนา
                </option>
                {religions.map((item: ReligionsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Rtype}
                  </option>
                ))}
              </Select>
            </FormControl>
            </Grid>

          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/accounts"
              variant="contained"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              variant="contained"
              onClick={submit}
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default AccountCreate;