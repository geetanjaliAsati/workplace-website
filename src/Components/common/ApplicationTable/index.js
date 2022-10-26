import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const Date = (date) => {
  const dateString = `${date.toDate()}`;
  const dateArray = dateString.split(" ");
  const filteredDay = dateArray[0];
  const filteredMonth = dateArray[1];
  const filteredDate = dateArray[2];
  const filteredYear = dateArray[3];
  return `${filteredDay} ${filteredMonth} ${filteredDate} ${filteredYear}`;
};
function ApplicationTable({ columns, rows, buttons,handleAction }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow align="center">
            {columns.map((column) => {
              return <StyledTableCell>{column.label}</StyledTableCell>;
            })}
            {buttons && <StyledTableCell>Actions</StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.application_id}>
              {columns.map((column) => {
                return (
                  <StyledTableCell align="left">
                    {column.key === "createdAt"
                      ? Date(row[column.key])
                      : row[column.key]}
                  </StyledTableCell>
                );
              })}
              {buttons && (
                <StyledTableCell align="left">
                  <Button
                    sx={{
                      backgroundColor: "green",
                      color: "#fff",
                      marginRight: "10px",
                    }}
                    onClick={() => handleAction('accept',row)}
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => handleAction('reject',row)}
                    sx={{
                      backgroundColor: "#f50057",
                      color: "#fff",
                    }}
                  >
                    Reject
                  </Button>
                </StyledTableCell>
              )}
              {/* <StyledTableCell component="th" scope="row">
                {row.job_title}
              </StyledTableCell>
              <StyledTableCell align="left">{row.client_name}</StyledTableCell>
              <StyledTableCell align="left">
                {row.project_bugdet}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row.interest_showen === "candidate"
                  ? "applied"
                  : row.interest_showen === "client"
                  ? "Interest shown"
                  : row.interest_showen}
              </StyledTableCell>
              <StyledTableCell align="left">{Date(row.createdAt)}</StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ApplicationTable;
