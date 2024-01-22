import React, { Component } from "react";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";
import ChartWebLayerIcon from "assets/img/assetmanager/chart-web-layer-icon.png";
import ChartAppLayerIcon from "assets/img/assetmanager/chart-app-layer-icon.png";
import DataServiceSvgrepo from "assets/img/assetmanager/data-service-svgrepo.png";
import bottomArrow from "assets/img/assetmanager/bottom-arrow.png";
import RightArrow from "assets/img/assetmanager/right-arrow.png";
import deployed1 from "../../../../assets/img/bimapping/deployed1.png";
import deployed4 from "../../../../assets/img/bimapping/deployed4.png";
import deployed5 from "../../../../assets/img/bimapping/deployed5.png";
import Aws from "../../../../assets/img/aws.png";
import { v4 } from "uuid";

let dropDownLayersData = {
  webLayer: [
    "NGINX",
    "Varnish",
    "HA Proxy",
    "Apache Tomcat",
    "Microsoft IAS",
    "Traefik",
  ],
  appLayer: [
    "Java Spring Boot API",
    "NodeJs API Service",
    "Golang API Service",
    "Python API Service",
    "Laravel API Service",
    "Ruby API Service",
  ],
  dataLayer: [
    "MySQL",
    "Postgresql",
    "Oracle",
    "Dynamo",
    "MongoDB",
    "IndexDB",
    "Casandra",
  ],
  auxLayer: ["Redis", "MemCache", "Elasticsearch", "Open search"],
};

let serviceTableData = [
  {
    name: "MockDB",
    port: 80,
  },
  {
    name: "DummyWebServer",
    port: 443,
  },
  {
    name: "SimulatedQueue",
    port: 443,
  },
  {
    name: "PseudoAnalytics",
    port: 21,
  },
  {
    name: "PhantomCache",
    port: 53,
  },
];

class Tier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentActiveNode: "",
      activeLayer: "",
      isSelectNginxOpen: false,
      isSelectSpringBootOpen: false,
      isSelectMySQLOpen: false,
      isSelectRedisOpen: false,
      deployedInstances: [
        {
          key: "EC2",
          name: "EC2",
          image: deployed1,
        },
        {
          key: "ECS",
          name: "ECS",
          image: deployed1,
        },
        {
          key: "EkS",
          name: "EkS",
          image: deployed1,
        },
        {
          key: "Lambda",
          name: "Lambda",
          image: deployed4,
        },
        {
          key: "CM",
          name: "CM",
          image: deployed5,
        },
      ],
      savedData: [],
      selectedLayer: {
        web: "",
        app: "",
        data: "",
        aux: "",
      },
      isShowDepolyedSection: false,
      selectedInstance: "",
      selectedDeployedInstance: "",
      selectedService: [],
      savedLayer: {
        web: false,
        app: false,
        data: false,
        aux: false,
      },
    };
  }

  toggleWebLayer = () => {
    let { savedLayer } = this.state;
    if (!savedLayer.web) {
      this.setState({
        isSelectNginxOpen: !this.state.isSelectNginxOpen,
      });
    }
  };

  toggleAppLayer = () => {
    let { savedLayer } = this.state;

    if (savedLayer.web && !savedLayer.app) {
      this.setState({
        isSelectSpringBootOpen: !this.state.isSelectSpringBootOpen,
      });
    }
  };

  toggleDataLayer = () => {
    let { savedLayer } = this.state;

    if (!savedLayer.data && savedLayer.app) {
      this.setState({
        isSelectMySQLOpen: !this.state.isSelectMySQLOpen,
      });
    }
  };

  toggleAuxLayer = () => {
    let { savedLayer } = this.state;
    if (savedLayer.data && !savedLayer.aux) {
      this.setState({
        isSelectRedisOpen: !this.state.isSelectRedisOpen,
      });
    }
  };

  renderDeployedInstances = () => {
    let { deployedInstances, selectedDeployedInstance } = this.state;
    return deployedInstances.map((instance) => {
      return (
        <Box
          className={`deployed-card ${
            instance.name === selectedDeployedInstance ? "active" : ""
          }`}
          key={v4()}
          onClick={() => {
            this.setState({ selectedDeployedInstance: instance.name });
          }}
        >
          <Box className="d-block text-center">
            <Box className="deployed-image">
              <img src={instance.image} alt="" />
            </Box>
            <Box className="deployed-title">{instance.name}</Box>
          </Box>
        </Box>
      );
    });
  };

  renderSelectedInstance = () => {
    let { selectedDeployedInstance } = this.state;
    return [...Array(10)].map((instance) => {
      return (
        <Box
          className="environment-box"
          key={v4()}
          onClick={(e) => {
            this.setState({ selectedInstance: selectedDeployedInstance });
            e.stopPropagation();
          }}
        >
          <Box className="environment-title">
            <Box className="environment-image">
              <img src={Aws} alt="aws" />
            </Box>
            <Box className="title-name"> {selectedDeployedInstance} </Box>
          </Box>
          <Box className="data-contant">
            <List>
              <ListItem>
                <Box className="data-text">
                  <span style={{ backgroundColor: "#FFBA69" }}></span>
                  <p>ID</p>
                </Box>
                <label>123456</label>
              </ListItem>
              <ListItem>
                <Box className="data-text">
                  <span style={{ backgroundColor: "#8676FF" }}></span>
                  <p>Key</p>
                </Box>
                <label>Name</label>
              </ListItem>
              <ListItem>
                <Box className="data-text">
                  <span style={{ backgroundColor: "#FF2D2E" }}></span>
                  <p>Value</p>
                </Box>
                <label>Kick</label>
              </ListItem>
            </List>
          </Box>
        </Box>
      );
    });
  };

  renderSelectedInstanceWrapper = () => {
    let { selectedDeployedInstance } = this.state;
    return selectedDeployedInstance ? (
      <Box className="deployed-section m-t-4">
        <Box className="deployed-head">
          <h4 className="m-t-0">Select Instance</h4>
        </Box>
        <Box className="deployed-content">
          <Box className="deployed-cards">{this.renderSelectedInstance()}</Box>
        </Box>
      </Box>
    ) : (
      <></>
    );
  };

  renderDeployedInstanceWrapper = () => {
    let { isShowDepolyedSection } = this.state;
    if (isShowDepolyedSection) {
      return (
        <Box className="deployed-section">
          <Box className="deployed-head">
            <h4 className="m-t-0">Deployed to</h4>
          </Box>
          <Box className="deployed-content">
            <Box className="deployed-cards">
              {this.renderDeployedInstances()}
            </Box>
          </Box>
        </Box>
      );
    }
  };

  onClickLayerDropDown = (key, value) => {
    let { selectedLayer } = this.state;
    selectedLayer[key] = value;
    this.setState({ selectedLayer, isShowDepolyedSection: true });
  };

  // Handle check box
  handleCheckBox = (event) => {
    let { selectedService } = this.state;

    let { id, checked } = event.target;

    if (checked) {
      selectedService.push(+id);
    } else {
      selectedService = selectedService.filter((value) => value !== +id);
    }

    this.setState({ selectedService });
  };

  renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell align="center" component="th" scope="row">
            Servicename
          </TableCell>
          <TableCell align="center">Port Details</TableCell>
          <TableCell align="center">Department URL</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  renderTableBody = () => {
    return (
      <TableBody>
        {serviceTableData.map((service, index) => {
          return (
            <TableRow>
              <TableCell align="left">
                <Checkbox
                  className="check-box"
                  size="small"
                  id={index}
                  onChange={this.handleCheckBox}
                />
                {service.name}
              </TableCell>
              <TableCell align="center">{service.port}</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    );
  };

  onClickSave = () => {
    let {
      savedLayer,
      savedData,
      selectedInstance,
      selectedDeployedInstance,
      selectedService,
      isShowDepolyedSection,
    } = this.state;
    let layerName = "";

    if (!savedLayer.web) {
      savedLayer.web = true;
      layerName = "web";
    } else if (!savedLayer.app) {
      savedLayer.app = true;
      layerName = "app";
    } else if (!savedLayer.data) {
      savedLayer.data = true;
      layerName = "data";
    } else if (!savedLayer.aux) {
      savedLayer.aux = true;
      layerName = "aux";
    }

    savedData.push({
      layerName,
      selectedInstance,
      selectedDeployedInstance,
      selectedService,
    });

    selectedInstance = "";
    selectedDeployedInstance = "";
    selectedService = [];
    isShowDepolyedSection = false;

    this.setState({
      savedLayer,
      savedData,
      selectedInstance,
      selectedDeployedInstance,
      selectedService,
      isShowDepolyedSection,
    });
  };

  render() {
    let {
      isSelectNginxOpen,
      isSelectSpringBootOpen,
      isSelectMySQLOpen,
      isSelectRedisOpen,
      selectedLayer,
      selectedInstance,
      selectedService,
    } = this.state;
    console.log(this.state.savedData);
    return (
      <Box className="bimapping-container">
        <Box className="list-heading">
          <h3>3 Tier</h3>
          <Link to={`/app/bim/adding-product`}>
            <Button
              className="primary-btn min-width-inherit"
              variant="contained"
            >
              Back
            </Button>
          </Link>
        </Box>
        <Box className="tier-container">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={5}>
              <Box className="topology-panel">
                <Box className="topology-panel-body">
                  <Box className="topology-inner-content">
                    <Box className="content-left">
                      <List>
                        <ListItem>
                          <Box className="button-box">
                            <span>
                              <img src={ChartWebLayerIcon} alt="" />
                            </span>
                            <p>Web Layer</p>
                          </Box>
                          <span>
                            <img src={RightArrow} alt="" />
                          </span>
                        </ListItem>
                        <ListItem>
                          <Box className="button-box">
                            <span>
                              <img src={ChartAppLayerIcon} alt="" />
                            </span>
                            <p>App Layer</p>
                          </Box>
                          <span>
                            <img src={RightArrow} alt="" />
                          </span>
                        </ListItem>
                        <ListItem>
                          <Box className="button-box">
                            <span>
                              <img src={DataServiceSvgrepo} alt="" />
                            </span>
                            <p>Data Layer</p>
                          </Box>
                          <span>
                            <img src={RightArrow} alt="" />
                          </span>
                        </ListItem>
                        <ListItem>
                          <Box className="button-box">
                            <span>
                              <img src={DataServiceSvgrepo} alt="" />
                            </span>
                            <p>AUX Layer</p>
                          </Box>
                          <span>
                            <img src={RightArrow} alt="" />
                          </span>
                        </ListItem>
                      </List>
                    </Box>
                    <Box className="content-middle">
                      <List>
                        <ListItem>
                          <Box className="application-balancer">
                            <Button
                              className="secondary-btn min-width"
                              variant="contained"
                            >
                              SSL
                            </Button>
                            <Box className="balancer-boxs">
                              <Box className="balancer-box">
                                <span>
                                  <img src={bottomArrow} alt="" />
                                </span>
                              </Box>
                            </Box>
                          </Box>
                        </ListItem>
                        <ListItem
                          className={`  ${
                            dropDownLayersData.webLayer.includes(
                              selectedLayer.web
                            )
                              ? "active"
                              : ""
                          }`}
                        >
                          <Box className="application-balancer">
                            <Box className="mapping-fliter">
                              <Box
                                className="fliter-toggel"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  this.toggleWebLayer();
                                }}
                              >
                                {selectedLayer.web || "Select"}
                                <i className="fa-solid fa-caret-down arrow-icon"></i>
                              </Box>
                              <Box
                                className={
                                  isSelectNginxOpen
                                    ? "fliter-collapse active"
                                    : "fliter-collapse"
                                }
                              >
                                <List>
                                  {dropDownLayersData.webLayer.map((name) => (
                                    <ListItem
                                      key={v4()}
                                      onClick={() =>
                                        this.onClickLayerDropDown("web", name)
                                      }
                                    >
                                      <i className="fa-solid fa-circle-dot"></i>{" "}
                                      {name}
                                    </ListItem>
                                  ))}
                                </List>
                              </Box>
                              <div
                                className={
                                  isSelectNginxOpen
                                    ? "fliters-collapse-bg active"
                                    : "fliters-collapse-bg"
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  this.toggleWebLayer();
                                }}
                              />
                            </Box>
                            <Box className="balancer-boxs">
                              <Box className="balancer-box">
                                <span>
                                  <img src={bottomArrow} alt="" />
                                </span>
                              </Box>
                            </Box>
                          </Box>
                        </ListItem>
                        <ListItem
                          className={`  ${
                            dropDownLayersData.appLayer.includes(
                              selectedLayer.app
                            )
                              ? "active"
                              : ""
                          }`}
                        >
                          <Box className="application-balancer">
                            <Box className="mapping-fliter">
                              <Box
                                className="fliter-toggel"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  this.toggleAppLayer();
                                }}
                              >
                                {selectedLayer.app || "Select"}
                                <i className="fa-solid fa-caret-down arrow-icon"></i>
                              </Box>
                              <Box
                                className={
                                  isSelectSpringBootOpen
                                    ? "fliter-collapse active"
                                    : "fliter-collapse"
                                }
                              >
                                <List>
                                  {dropDownLayersData.appLayer.map((name) => (
                                    <ListItem
                                      key={v4()}
                                      onClick={() =>
                                        this.onClickLayerDropDown("app", name)
                                      }
                                    >
                                      <i className="fa-solid fa-circle-dot"></i>
                                      {name}
                                    </ListItem>
                                  ))}
                                </List>
                              </Box>
                              <div
                                className={
                                  isSelectSpringBootOpen
                                    ? "fliters-collapse-bg active"
                                    : "fliters-collapse-bg"
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  this.toggleAppLayer();
                                }}
                              />
                            </Box>
                            <Box className="balancer-boxs">
                              <Box className="balancer-box">
                                <span>
                                  <img src={bottomArrow} alt="" />
                                </span>
                              </Box>
                            </Box>
                          </Box>
                        </ListItem>
                        <ListItem
                          className={`  ${
                            dropDownLayersData.dataLayer.includes(
                              selectedLayer.data
                            )
                              ? "active"
                              : ""
                          }`}
                        >
                          <Box className="application-balancer">
                            <Box className="mapping-fliter">
                              <Box
                                className="fliter-toggel"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  this.toggleDataLayer();
                                }}
                              >
                                {selectedLayer.data || "Select"}
                                <i className="fa-solid fa-caret-down arrow-icon"></i>
                              </Box>
                              <Box
                                className={
                                  isSelectMySQLOpen
                                    ? "fliter-collapse active"
                                    : "fliter-collapse"
                                }
                              >
                                <List>
                                  {dropDownLayersData.dataLayer.map((name) => (
                                    <ListItem
                                      key={v4()}
                                      onClick={() =>
                                        this.onClickLayerDropDown("data", name)
                                      }
                                    >
                                      <i className="fa-solid fa-circle-dot"></i>
                                      {name}
                                    </ListItem>
                                  ))}
                                </List>
                              </Box>
                              <div
                                className={
                                  isSelectMySQLOpen
                                    ? "fliters-collapse-bg active"
                                    : "fliters-collapse-bg"
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  this.toggleDataLayer();
                                }}
                              />
                            </Box>
                            <Box className="balancer-boxs">
                              <Box className="balancer-box">
                                <span>
                                  <img src={bottomArrow} alt="" />
                                </span>
                              </Box>
                            </Box>
                          </Box>
                        </ListItem>
                        <ListItem
                          className={`  ${
                            dropDownLayersData.auxLayer.includes(
                              selectedLayer.aux
                            )
                              ? "active"
                              : ""
                          }`}
                        >
                          <Box className="mapping-fliter">
                            <Box
                              className="fliter-toggel"
                              onClick={(e) => {
                                e.stopPropagation();
                                this.toggleAuxLayer();
                              }}
                            >
                              {selectedLayer.aux || "Select"}
                              <i className="fa-solid fa-caret-down arrow-icon"></i>
                            </Box>
                            <Box
                              className={
                                isSelectRedisOpen
                                  ? "fliter-collapse active"
                                  : "fliter-collapse"
                              }
                            >
                              <List>
                                {dropDownLayersData.auxLayer.map((name) => (
                                  <ListItem
                                    key={v4()}
                                    onClick={() =>
                                      this.onClickLayerDropDown("aux", name)
                                    }
                                  >
                                    <i className="fa-solid fa-circle-dot"></i>
                                    {name}
                                  </ListItem>
                                ))}
                              </List>
                            </Box>
                            <div
                              className={
                                isSelectRedisOpen
                                  ? "fliters-collapse-bg active"
                                  : "fliters-collapse-bg"
                              }
                              onClick={(e) => {
                                e.stopPropagation();
                                this.toggleAuxLayer();
                              }}
                            />
                          </Box>
                        </ListItem>
                      </List>
                    </Box>
                    <Box className="content-right">
                      <List>
                        <ListItem>
                          <Box className="add-button">
                            <i className="fa-solid fa-plus"></i>
                          </Box>
                        </ListItem>
                        <ListItem>
                          <Box className="add-button">
                            <i className="fa-solid fa-plus"></i>
                          </Box>
                        </ListItem>
                      </List>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={7}>
              <Box className="nginx-cards">
                {this.renderDeployedInstanceWrapper()}
                {this.renderSelectedInstanceWrapper()}
              </Box>
            </Grid>
          </Grid>
          {selectedInstance ? (
            <>
              <Box className="nginx-table-section">
                <TableContainer className="table">
                  <Table className="overview">
                    {this.renderTableHead()}
                    {this.renderTableBody()}
                  </Table>
                </TableContainer>
              </Box>
              <Box justifyContent={"center"} className="text-center m-t-4">
                <Button
                  className={` ${
                    selectedService.length ? "" : "info-btn"
                  } primary-btn min-width-inherit`}
                  variant="contained"
                  onClick={() =>
                    selectedService.length ? this.onClickSave() : <></>
                  }
                >
                  Save
                </Button>
              </Box>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    );
  }
}

export default Tier;
