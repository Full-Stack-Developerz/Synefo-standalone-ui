import React, { Component } from "react";
import {
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Grid,
  List,
  ListItem,
} from "@mui/material";
import { APP_PREFIX_PATH } from "Configs/AppConfig";

class AlertRules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAssetsSetUpModal: false,
      pg: 0,
      rpg: 10,
    };
  }
  //  Render table
  renderTable = () => {
    let alerts = this.props.data || [];
    let { rpg, pg } = this.state;

    return this.props.loderStatus ? (
      this.renderLoder()
    ) : (
      <>
        <TableContainer className="table">
          <Table style={{minWidth: 1300}}>
            {this.renderTableHead()}
            {this.renderTableBody()}
          </Table>
        </TableContainer>
        {alerts?.length ? (
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={alerts.length}
            rowsPerPage={rpg}
            page={pg}
            className="access-control-pagination"
            onPageChange={this.handleChangePage}
            onRowsPerPageChange={this.handleChangeRowsPerPage}
          />
        ) : (
          <></>
        )}
      </>
    );
  };

  //  Render table head
  renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell align="left">Name</TableCell>
          <TableCell align="left">Condition</TableCell>
          <TableCell align="left">Status</TableCell>
          <TableCell align="left">Target Resource</TableCell>
          <TableCell align="center">Action</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  //  Render table body
  renderTableBody = () => {
    return (
      <TableBody>
        <TableRow>
          <TableCell align="left">Percentage CPU</TableCell>
          <TableCell align="left">Percentage CPU GreaterOrEqual 0</TableCell>
          <TableCell align="left" className="status">Enabled</TableCell>
          <TableCell align="left">kub-master-1467834</TableCell>
          <TableCell align="center">
            {" "}
            <button type="button" className="list-icon">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Percentage CPU</TableCell>
          <TableCell align="left">Percentage CPU GreaterOrEqual 0</TableCell>
          <TableCell align="left" className="status">Enabled</TableCell>
          <TableCell align="left">kub-master-1467834</TableCell>
          <TableCell align="center">
            {" "}
            <button type="button" className="list-icon">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Percentage CPU</TableCell>
          <TableCell align="left">Percentage CPU GreaterOrEqual 0</TableCell>
          <TableCell align="left" className="status">Enabled</TableCell>
          <TableCell align="left">kub-master-1467834</TableCell>
          <TableCell align="center">
            {" "}
            <button type="button" className="list-icon">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Percentage CPU</TableCell>
          <TableCell align="left">Percentage CPU GreaterOrEqual 0</TableCell>
          <TableCell align="left" className="status">Enabled</TableCell>
          <TableCell align="left">kub-master-1467834</TableCell>
          <TableCell align="center">
            {" "}
            <button type="button" className="list-icon">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Percentage CPU</TableCell>
          <TableCell align="left">Percentage CPU GreaterOrEqual 0</TableCell>
          <TableCell align="left" className="status">Enabled</TableCell>
          <TableCell align="left">kub-master-1467834</TableCell>
          <TableCell align="center">
            {" "}
            <button type="button" className="list-icon">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Percentage CPU</TableCell>
          <TableCell align="left">Percentage CPU GreaterOrEqual 0</TableCell>
          <TableCell align="left" className="status">Enabled</TableCell>
          <TableCell align="left">kub-master-1467834</TableCell>
          <TableCell align="center">
            {" "}
            <button type="button" className="list-icon">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">Percentage CPU</TableCell>
          <TableCell align="left">Percentage CPU GreaterOrEqual 0</TableCell>
          <TableCell align="left" className="status">Enabled</TableCell>
          <TableCell align="left">kub-master-1467834</TableCell>
          <TableCell align="center">
            {" "}
            <button type="button" className="list-icon">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  };
  render() {
    return (
      <Box className="alert-container">
        <Box className="list-heading">
          <h3>Monitor Alerts</h3>
          <Box className="breadcrumbs">
            <ul>
              <li
                onClick={() => this.props.navigate(`${APP_PREFIX_PATH}/alerts`)}
              >
                Home
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Alerts | Rules</li>
            </ul>
          </Box>
        </Box>
        <Box className="table-head">
          <h4 className="m-t-0 m-b-0">24 Rules / 20 Enabled</h4>
          <Box className="d-flex">
            <Box className="search m-r-2">
              <input
                type="text"
                className="input"
                placeholder="Search"
                //value={searchedKey}
                onChange={this.handleSearchChange}
                autoFocus="autoFocus"
              />
            </Box>
            <Button className="light-btn p-l-15 p-r-15">Bulk Action</Button>
          </Box>
        </Box>
        <Box className="alert-table">{this.renderTable()}</Box>
      </Box>
    );
  }
}

export default AlertRules;
