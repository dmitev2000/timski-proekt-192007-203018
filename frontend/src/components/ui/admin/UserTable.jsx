/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ReloadDashboard from "./ReloadDashboardContext";
import { FireSuccessNotification } from "../../../shared/ShowNotification";
import FormControlLabel from "@mui/material/FormControlLabel";
import TablePagination from "@mui/material/TablePagination";
import { AuthContext } from "../../../shared/AuthContext";
import TableContainer from "@mui/material/TableContainer";
import TableSortLabel from "@mui/material/TableSortLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import { API_BASE_URL } from "../../../shared/URLs";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { useState, useContext } from "react";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import axios from "axios";

const UserTable = ({ users, title }) => {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const AuthCtx = useContext(AuthContext);
  const DashCtx = useContext(ReloadDashboard);

  const DeleteHandler = async () => {
    Swal.fire({
      title: "You are about to delete the user/s. Are you sure?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "crimson",
      cancelButtonColor: "#1976d2",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_BASE_URL}/admin/users`, {
            headers: {
              Authorization: `Bearer ${AuthCtx.user.token}`,
            },
            data: {
              user_ids: selected,
            },
          })
          .then((res) => {
            FireSuccessNotification(res.data);
            DashCtx.updateReloadUsers();
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const VerifyHandler = async () => {
    Swal.fire({
      title: "Verify user/s?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "crimson",
      cancelButtonColor: "#1976d2",
    }).then(async (result) => {
      if (result.isConfirmed && selected.length > 0) {
        for (let i = 0; i < selected.length; i++) {
          const resp = await axios.put(
            `${API_BASE_URL}/admin/sellers/verify`,
            {
              seller_id: selected[i],
            },
            {
              headers: {
                Authorization: `Bearer ${AuthCtx.user.token}`,
                "Content-Type": "application/json",
              },
            }
          );
          FireSuccessNotification(resp.data);
        }
        DashCtx.updateReloadUsers();
      }
    });
  };

  const createData = (id, user_name, shop, verified) => {
    return {
      id,
      user_name,
      shop,
      verified,
    };
  };

  const rows = users.map((c) => {
    return createData(c.id, c.user_name, c.shop, c.verified);
  });

  const headCells = [
    {
      id: "id",
      label: "User ID",
    },
    {
      id: "user_name",
      label: "Username",
    },
    {
      id: "shop",
      label: "Works for",
    },
    {
      id: "verified",
      label: "Verified",
    },
  ];

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const EnhancedTableHead = (props) => {
    const { onSelectAllClick, numSelected, rowCount } = props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": `select all ${title.toLowerCase()}`,
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell key={headCell.id} align={"left"}>
              <TableSortLabel>{headCell.label}</TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {title}
          </Typography>
        )}

        {numSelected > 0 && (
          <>
            {title === "Sellers" && (
              <Tooltip title="Verify">
                <IconButton onClick={VerifyHandler}>
                  <CheckIcon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Delete">
              <IconButton onClick={DeleteHandler}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Toolbar>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  return (
    <Box sx={{ width: "100%", pb: 5 }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                    >
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.user_name}</TableCell>
                    <TableCell align="left">
                      {row.shop ? row.shop : "none"}
                    </TableCell>
                    <TableCell align="left">
                      {row.verified ? "yes" : "no"}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className="table-pagination"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default UserTable;
