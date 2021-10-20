import React, { useEffect, useState } from "react";
import * as R from "ramda";
import { styled } from "@mui/material/styles";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { useSalaries } from "hooks/useSalaries";

const TableRemovedEmployeeHistory = () => {
  const [events, setEvents] = useState([]);
  const { fetchRemovedEmployeeHistory } = useSalaries();

  useEffect(async () => {
    const events = await fetchRemovedEmployeeHistory();
    setEvents(events);
  }, []);

  if (R.isEmpty(events)) {
    return null;
  }

  return (
    <>
      <Typography
        variant="h4"
        style={{
          color: "white",
          textTransform: "uppercase",
          letterSpacing: 1,
          textAlign: "left",
          marginTop: 50,
          marginBottom: 20,
          display: "block",
          fontWeight: "bold",
          fontSize: 25,
        }}
        component="span"
      >
        History of removed users
      </Typography>
      <TableContainer component={Paper} style={{ marginBottom: 100 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">ADDRESS</StyledTableCell>
              <StyledTableCell align="right">DATE ADDED</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((row) => (
              <StyledTableRow
                key={row.date}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.address}
                </StyledTableCell>
                <StyledTableCell align="right">{row.date}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#2c2c2c",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "theme.palette.common.black",
    color: theme.palette.common.white,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

export default TableRemovedEmployeeHistory;
