
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { AccountInterface } from "../models/IAccount";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    tableSpace: {
      marginTop: 20,
    },
  })
);

function Accounts() {
  const classes = useStyles();
  const [accounts, setAccounts] = useState<AccountInterface[]>([]);
  const apiUrl = "http://localhost:8080/users";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getAccounts = async () => {
    fetch(`${apiUrl}/accounts`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setAccounts(res.data);
        } else {
          console.log("else");
        }
      });
  };
  

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <div>
      <Container className={classes.container} maxWidth="lg">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลส่วนตัว
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/account/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="10%">
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="20%">
                  ที่อยู่
                </TableCell>
                <TableCell align="center" width="20%">
                  จังหวัด
                </TableCell>
                <TableCell align="center" width="20%">
                  ช่องทางการติดต่อ
                </TableCell>
                <TableCell align="center" width="20%">
                  เพศ
                </TableCell>
                <TableCell align="center" width="20%">
                  การเคยเป็นสมาชิก
                </TableCell>
                <TableCell align="center" width="20%">
                  ศาสนา
                </TableCell>
                <TableCell align="center" width="20%">
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts.map((account: AccountInterface) => (
                <TableRow key={account.ID}>
                  <TableCell align="center">{account.ID}</TableCell>
                  <TableCell align="center">{account.Address}</TableCell>
                  <TableCell align="center">{account.Province}</TableCell>
                  <TableCell align="center">{account.Contact}</TableCell>
                  <TableCell align="center">{account.Sex}</TableCell>
                  <TableCell align="center">{account.Olduser}</TableCell>
                  <TableCell align="center">{account.Religion}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Accounts;

