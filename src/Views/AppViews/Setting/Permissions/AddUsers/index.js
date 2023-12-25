import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Box, Grid, List, ListItem, Button } from "@mui/material";
import { Component } from "react";
import { Link } from "react-router-dom";
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import {
  setActiveTab,
  getUrlDetailsOfPage,
  deleteUrlDetailsOfPage,
  getCurrentUser,
  getFormattedDate,
} from "Utils";
import { navigateRouter } from "Utils/Navigate/navigateRouter";
import { getUserPermissionData } from "Redux/Settings/SettingsThunk";
import { connect } from "react-redux";
import status from "Redux/Constants/CommonDS";
import Loader from "Components/Loader";
const getCurrentUserInfo = () => {
  return getCurrentUser()
    ? getCurrentUser()?.info?.user
      ? getCurrentUser().info.user
      : { id: "", username: "", email: "", profileImage: "" }
    : { id: "", username: "", email: "", profileImage: "" };
};

class AddUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      pg: 0,
      rpg: 5,
      showCreateUserControlModal: false,
      actionButton: null,
      selectedUsers: [],
      searchedKey: "",
      showCancelUserControlModal: false,
    };
  }

  componentDidMount = () => {
    this.props.getUserPermissionData("admin" || getCurrentUserInfo().username);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      this.props.userPermissionData.status !==
      prevProps.userPermissionData.status
    ) {
      if (this.props.userPermissionData.status === status.SUCCESS) {
        let rows = this.props.userPermissionData.data?.users || [];
        if (rows) {
          this.setState({ rows });
        }
      }
    }
  };

  handleChangePage = (event, newpage) => {
    this.setState({ pg: newpage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rpg: parseInt(event.target.value, 10) });
  };

  handleCreateUserControlModal = () => {
    this.setState({
      showCreateUserControlModal: !this.state.showCreateUserControlModal,
    });
  };

  handleActionButton = (index) => {
    const { actionButton } = this.state;
    if (actionButton === null) {
      this.setState({
        actionButton: index,
      });
    } else {
      this.setState({
        actionButton: null,
      });
    }
  };
  // Move to previous page
  handlePreviousPage = (tab, url) => {
    setActiveTab(tab);
    this.props.navigate(url);
  };

  // Render header of table
  renderTableHead = () => {
    const { rows, selectedUsers } = this.state;
    return (
      <TableHead>
        <TableRow>
          <TableCell>
            <Checkbox
              className="check-box"
              size="small"
              disabled={rows?.length ? false : true}
              checked={rows?.length === selectedUsers?.length}
              onChange={(e) => this.handleSelectAllCheckBox(e)}
            />
            User
          </TableCell>
          <TableCell>Email Address</TableCell>
          <TableCell align="center">Groups</TableCell>
          <TableCell align="center">User Creation Date</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  // Render body of table
  renderTableBody = () => {
    const { rows, pg, rpg, selectedUsers } = this.state;
    return (
      <TableBody>
        {rows?.length ? (
          rows.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox
                  className="check-box"
                  size="small"
                  id={`${row.id}`}
                  checked={selectedUsers.includes(row.id)}
                  onChange={this.handleCheckBox}
                />
                {row.username}
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell align="center">{row.roles?.length}</TableCell>
              <TableCell align="center">
                {getFormattedDate(row.createdAt)}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={12}>
              <Box className="d-blck text-center w-100 h-100 ">
                <Box className="environment-loader  align-item-center justify-center p-t-20 p-b-20 ">
                  <h5 className="m-t-0 m-b-0">There are no data available.</h5>
                </Box>
              </Box>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    );
  };

  renderComponentTablePagination = () => {
    const { rows, pg, rpg } = this.state;
    return rows?.length ? (
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rpg}
        page={pg}
        className="access-control-pagination"
        onPageChange={this.handleChangePage}
        onRowsPerPageChange={this.handleChangeRowsPerPage}
      />
    ) : (
      <></>
    );
  };

  // Render table container
  renderTableContainer = () => {
    let { status: userStatus } = this.props.userPermissionData;
    if (userStatus === status.IN_PROGRESS) {
      return this.renderLoder();
    } else {
      return (
        <TableContainer component={Paper} className="access-control-table">
          <Table
            sx={{ minWidth: 500 }}
            aria-label="custom pagination table"
            className="table"
          >
            {this.renderTableHead()}
            {this.renderTableBody()}
          </Table>
        </TableContainer>
      );
    }
  };

  // Handle check box
  handleCheckBox = (event) => {
    let { selectedUsers } = this.state;

    let { id, checked } = event.target;

    if (checked) {
      selectedUsers.push(+id);
    } else {
      selectedUsers = selectedUsers.filter((value) => value !== +id);
    }

    this.setState({ selectedUsers });
  };

  // Handle select all checkbox
  handleSelectAllCheckBox = (event, isRole = 0) => {
    let { selectedUsers, rows } = this.state;

    let { checked } = event.target;

    if (checked) {
      selectedUsers = rows.map((value) => value.id);
    } else {
      selectedUsers = [];
    }
    this.setState({ selectedUsers });
  };

  //  Serach Groups
  handleSearchChange = (e) => {
    let value = e.target.value;
    let { rows } = this.state;
    let data = this.props.userPermissionData.data?.users || [];

    if (data?.length) {
      if (value) {
        rows = data.filter((user) => {
          if (user?.username.toLowerCase().includes(value.toLowerCase())) {
            return user;
          } else {
            return null;
          }
        });
      } else {
        rows = data;
      }
      this.setState({ rows, searchedKey: value });
    }
  };

   // Render Loder
   renderLoder() {
    return (
      <Box className="d-blck text-center w-100 h-100 ">
        <Loader className="align-item-center justify-center w-100 h-100 p-t-20 p-b-20" />
      </Box>
    );
  }

  render() {
    let { searchedKey } = this.state;
    return (
      <Box className="add-users-container">
        <Box className="list-heading">
          <h3>Group Infra team Add users</h3>
          <Box className="breadcrumbs">
            <ul onClick={() => deleteUrlDetailsOfPage()}>
              <li
                onClick={() =>
                  this.handlePreviousPage("permissions/group", "/app/setting")
                }
              >
                <Link>Users and Permissions</Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li>
                <Link
                  to={`/app/setting/group-details/${getUrlDetailsOfPage()}`}
                >
                  Super Admin Group
                </Link>
              </li>
              <li>
                <i className="fa-solid fa-chevron-right"></i>
              </li>
              <li className="active">Add users</li>
            </ul>
          </Box>
        </Box>
        <Box className="setting-common-searchbar">
          <h5>Add users to infra team</h5>
          <Grid container className="h-100" alignItems={"center"}>
            <Grid item xs={6}>
              <Box className="top-search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search user"
                  value={searchedKey}
                  onChange={this.handleSearchChange}
                  autoFocus="autoFocus"
                />
                <button className="button">
                  <SearchOutlinedIcon />
                </button>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <List>
                <ListItem>
                  <Link
                    to={`/app/setting/group-details/${getUrlDetailsOfPage()}`}
                    onClick={() => deleteUrlDetailsOfPage()}
                  >
                    <Button
                      className="danger-btn min-width-inherit"
                      variant="contained"
                    >
                      Cancel
                    </Button>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    to={`/app/setting/group-details/${getUrlDetailsOfPage()}`}
                    onClick={() => deleteUrlDetailsOfPage()}
                  >
                    <Button
                      className="primary-btn min-width-inherit"
                      variant="contained"
                    >
                      Add users
                    </Button>
                  </Link>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>
        {this.renderTableContainer()}
        {this.renderComponentTablePagination()}
      </Box>
    );
  }
}
const mapStateToProps = (state) => {
  const { userPermissionData } = state.settings;
  return {
    userPermissionData,
  };
};

const mapDispatchToProps = {
  getUserPermissionData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(navigateRouter(AddUsers));
