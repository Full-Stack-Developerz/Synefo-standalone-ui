import React, { Component } from "react";
import { Box, Button, List, ListItem } from "@mui/material";
import Aws from "../../../assets/img/aws.png";
import Microsoftazure from "../../../assets/img/microsoftazure.png";
import GoogleCloud from "../../../assets/img/google-cloud.png";
import Kubernetes from "../../../assets/img/kubernetes.png";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Link } from "react-router-dom";
import AccordionView from "Views/AppViews/Setting/Components/AccordionView";
import { getCurrentOrgId, getCloudWiseLandingZoneCount } from "Utils";
import status from "Redux/Constants/CommonDS";
import { connect } from "react-redux";
import {
  getProductList,
  getProductEnv,
} from "Redux/AssociateApp/AssociateAppThunk";
import { getOrgWiseDepartments } from "Redux/Environments/EnvironmentsThunk";
import {
  getElementType,
  getElementInstancesOfGivenType,
} from "Redux/BIMapping/BIMappingThunk";
import Loader from "Components/Loader";
import { setProductIntoDepartment } from "Redux/BIMapping/BIMappingSlice";
const orgId = getCurrentOrgId();

let headers = [
  { name: "Organization Name", styled: {} },
  {
    name: (
      <>
        <Box className="environment-image">
          <img src={Aws} alt="" />
        </Box>
        AWS
      </>
    ),
    styled: {},
  },
  {
    name: (
      <>
        <Box className="environment-image">
          <img src={Microsoftazure} alt="" />
        </Box>
        Azure
      </>
    ),
    styled: {},
  },
  {
    name: (
      <>
        <Box className="environment-image">
          <img src={GoogleCloud} alt="" />
        </Box>
        GCP
      </>
    ),
    styled: {},
  },
  {
    name: (
      <>
        <Box className="environment-image">
          <img src={Kubernetes} alt="" />
        </Box>
        Kubernetes
      </>
    ),
    styled: {},
  },
];
class BIMapping extends Component {
  TYPE = {
    ORGANIZATION: "organization",
    DEPARTMENT: "department",
    PRODUCT: "product",
    PRODUCT_ENVS: "productEnvs",
    ELEMENT_TYPE: "elementType",
    ELEMENT_INSTANCE_TYPE: "elementInstanceType",
  };
  constructor(props) {
    super(props);
    this.state = {
      isSelectDepartmentOpen: false,
      organizationTableData: [],
      clickTableData: {},
    };
  }

  componentDidMount = () => {
    this.props.getOrgWiseDepartments(orgId);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.organizationWiseDepartments.status !==
        this.props.organizationWiseDepartments.status &&
      this.props.organizationWiseDepartments.status === status.SUCCESS &&
      this.props.organizationWiseDepartments?.data
    ) {
      const organization = this.props.organizationWiseDepartments.data;
      this.manipulateDepartMentData(organization);
    }

    if (
      prevProps.products.status !== this.props.products.status &&
      this.props.products.status === status.SUCCESS &&
      this.props.products?.data
    ) {
      let products = this.props.products?.data;
      this.manipulateProductData(products);
    }

    if (
      prevProps.productEnv.status !== this.props.productEnv.status &&
      this.props.productEnv.status === status.SUCCESS &&
      this.props.productEnv?.data
    ) {
      let productEnvs = this.props.productEnv.data;
      this.manipulateProductEnvsData(productEnvs);
    }

    if (
      prevProps.elementTypeData.status !== this.props.elementTypeData.status &&
      this.props.elementTypeData.status === status.SUCCESS &&
      this.props.elementTypeData?.data
    ) {
      let elementTypes = this.props.elementTypeData.data;
      this.manipulateElementTypeData(elementTypes);
    }

    if (
      prevProps.elementInstancesOfGivenType.status !==
        this.props.elementInstancesOfGivenType.status &&
      this.props.elementInstancesOfGivenType.status === status.SUCCESS &&
      this.props.elementInstancesOfGivenType?.data
    ) {
      let elementInstancesOfGivenTypeData =
        this.props.elementInstancesOfGivenType.data;
      this.manipulateElementInstancesOfGivenTypeData(
        elementInstancesOfGivenTypeData
      );
    }
  }
  toggleSelectDepartment = () => {
    this.setState({
      isSelectDepartmentOpen: !this.state.isSelectDepartmentOpen,
    });
  };

  manipulateChildrenData = (data, type, exptraIds, isArrOfObj = 0) => {
    let isTypeDepartment = type === this.TYPE.DEPARTMENT;
    return data.map((dataDetails, index) => {
      let { name, id, instanceName } = dataDetails;
      name = <> {isArrOfObj ? dataDetails : instanceName || name} </>;
      id = isArrOfObj ? `${dataDetails}_${exptraIds?.productId}_${index}` : id;

      return {
        name,
        id,
        isLink: type === this.TYPE.DEPARTMENT,
        url: isTypeDepartment ? `/app/bim/add-product/${dataDetails.name}` : "",
        chlidren: [],
        type,
        departmentId: exptraIds?.departmentId,
        isLastClickEnable: true,
        productId: exptraIds?.productId,
        productEnvId: exptraIds?.productEnvId,
        elementTypeId: exptraIds?.elementTypeId,
      };
    });
  };

  // Manipulation of department data
  manipulateDepartMentData = (organization) => {
    if (organization) {
      let { name, id, departments } = organization;
      let { organizationTableData } = this.state;
      let chlidren = [];
      if (departments?.length) {
        chlidren = this.manipulateChildrenData(
          departments,
          this.TYPE.DEPARTMENT
        );
      }
      let cloudWiseLandingZoneCount = getCloudWiseLandingZoneCount();
      if (cloudWiseLandingZoneCount.length) {
        let environments = ["AWS", "AZURE", "GCP", "KUBEENETES"];
        cloudWiseLandingZoneCount = cloudWiseLandingZoneCount.map((count) => {
          if (environments.includes(count.cloud)) {
            environments.splice(environments.indexOf(environments), 1);
          }
          return { name: "" + count.totalAccounts };
        });
        if (environments.length) {
          cloudWiseLandingZoneCount = [
            ...cloudWiseLandingZoneCount,
            { name: 0 },
          ];
        }
      }

      organizationTableData = [
        {
          name,
          id,
          isMutipleCell: true,
          multipeCellData: cloudWiseLandingZoneCount,
          type: this.TYPE.ORGANIZATION,
          chlidren,
        },
      ];

      this.setState({
        organizationTableData,
      });
    }
  };
  // Manipulation of Product data
  manipulateProductData = (products) => {
    if (products) {
      let { organizationTableData, clickTableData } = this.state;

      organizationTableData =
        organizationTableData.map((organization) => {
          if (organization.chlidren?.length) {
            organization.chlidren = organization.chlidren.map((department) => {
              if (department.id === clickTableData.id) {
                department.chlidren = this.manipulateChildrenData(
                  products,
                  this.TYPE.PRODUCT,
                  {
                    departmentId: department.id,
                  }
                );
              }
              return department;
            });
          }
          return organization;
        }) || [];

      this.setState({
        organizationTableData,
      });
    }
  };

  // Manipulation of ProductEnvs data
  manipulateProductEnvsData = (productEnvs) => {
    if (productEnvs?.length) {
      let { organizationTableData, clickTableData } = this.state;

      organizationTableData =
        organizationTableData.map((organization) => {
          let organizationChlidren = organization.chlidren;

          if (organizationChlidren?.length) {
            organization.chlidren = organizationChlidren.map((department) => {
              if (department.id === clickTableData.departmentId) {
                department.chlidren = department.chlidren.map((product) => {
                  if (product.id === clickTableData.id) {
                    product.chlidren = this.manipulateChildrenData(
                      productEnvs,
                      this.TYPE.PRODUCT_ENVS,
                      {
                        departmentId: clickTableData.departmentId,
                        productId: product.id,
                      }
                    );
                  }
                  return product;
                });
              }
              return department;
            });
          }
          return organization;
        }) || [];

      this.setState({
        organizationTableData,
      });
    }
  };

  // Manipulation of Element type data
  manipulateElementTypeData = (elemntTypes) => {
    if (elemntTypes?.length) {
      let { organizationTableData, clickTableData } = this.state;

      organizationTableData =
        organizationTableData.map((organization) => {
          let organizationChlidren = organization.chlidren;

          if (organizationChlidren?.length) {
            organization.chlidren = organizationChlidren.map((department) => {
              if (department.id === clickTableData.departmentId) {
                department.chlidren = department.chlidren.map((product) => {
                  if (product.id === clickTableData.productId) {
                    product.chlidren = product.chlidren.map((productEnv) => {
                      if (productEnv.id === clickTableData.id) {
                        productEnv.chlidren = this.manipulateChildrenData(
                          elemntTypes,
                          this.TYPE.ELEMENT_TYPE,
                          {
                            departmentId: clickTableData.departmentId,
                            productId: clickTableData.productId,
                            productEnvId: productEnv.id,
                          },
                          1
                        );
                      }
                      return productEnv;
                    });
                  }
                  return product;
                });
              }
              return department;
            });
          }
          return organization;
        }) || [];

      this.setState({
        organizationTableData,
      });
    }
  };

  manipulateElementInstancesOfGivenTypeData = (elemntInstanceTypes) => {
    if (elemntInstanceTypes?.length) {
      let { organizationTableData, clickTableData } = this.state;

      organizationTableData =
        organizationTableData.map((organization) => {
          let organizationChlidren = organization.chlidren;

          if (organizationChlidren?.length) {
            organization.chlidren = organizationChlidren.map((department) => {
              if (department.id === clickTableData.departmentId) {
                department.chlidren = department.chlidren.map((product) => {
                  if (product.id === clickTableData.productId) {
                    product.chlidren = product.chlidren.map((productEnv) => {
                      if (productEnv.id === clickTableData.productEnvId) {
                        productEnv.chlidren = productEnv.chlidren.map(
                          (elementType) => {
                            if (elementType.id === clickTableData.id) {
                              elementType.chlidren =
                                this.manipulateChildrenData(
                                  elemntInstanceTypes,
                                  this.TYPE.ELEMENT_INSTANCE_TYPE,
                                  {
                                    departmentId: clickTableData.departmentId,
                                    productId: clickTableData.productId,
                                    productEnvId: clickTableData.productEnvId,
                                    elementTypeId: elementType.id,
                                  }
                                );
                            }
                            return elementType;
                          }
                        );
                      }
                      return productEnv;
                    });
                  }
                  return product;
                });
              }
              return department;
            });
          }
          return organization;
        }) || [];

      this.setState({
        organizationTableData,
      });
    }
  };
  // Render Loder
  renderLoder(widthClass) {
    return (
      <Box className="d-blck text-center w-100 h-100 p-t-20 p-b-20 ">
        <Loader className="align-item-center justify-center w-100 h-100" />
      </Box>
    );
  }

  onClickNode(data) {
    let { type, departmentId, productId, productEnvId, id, name } = data;

    if (type === this.TYPE.DEPARTMENT) {
      this.props.getProductList(id);
    } else if (type === this.TYPE.PRODUCT) {
      this.props.getProductEnv(id);
    } else if (type === this.TYPE.PRODUCT_ENVS) {
      this.props.getElementType({ productId, departmentId, productEnvId: id });
    } else if (type === this.TYPE.ELEMENT_TYPE) {
      this.props.getElementInstancesOfGivenType({
        productId,
        departmentId,
        productEnvId,
        elementType: name,
      });
    }
    this.setState({ clickTableData: data });
  }

  onLinkClick = (data) => {
    this.props.setProductIntoDepartment({ departmentName: data.name });
  };

  renderNoDataHtml = (text) => {
    return (
      <Box className="group-loader  h-100  m-r-auto m-l-auto  p-t-20 p-b-20">
        <h5 className="m-t-0 m-b-0">{text}</h5>
      </Box>
    );
  };
  render() {
    const { isSelectDepartmentOpen, organizationTableData } = this.state;
    const {
      organizationWiseDepartments: organization,
      products,
      productEnv,
      elementTypeData,
      elementInstancesOfGivenType,
    } = this.props;
    const inprogressStatus = status.IN_PROGRESS;
    let loderStatus = [
      products.status,
      productEnv.status,
      elementTypeData.status,
      elementInstancesOfGivenType.status,
    ].includes(inprogressStatus);

    return (
      <Box className="bimapping-container">
        <Box className="list-heading">
          <h3>Organization Unit</h3>
          <Box className="mapping-fliter">
            <Button
              onClick={this.toggleSelectDepartment}
              className="primary-outline-btn min-width"
              variant="outlined"
            >
              <ControlPointIcon className="m-r-1 plus-icon" />
              Department
            </Button>
            {this.state.isSelectDepartmentOpen === true && (
              <div
                className={
                  isSelectDepartmentOpen
                    ? "fliter-collapse active"
                    : "fliter-collapse"
                }
              >
                <List>
                  <Link to={`/app/bim/create-department`}>
                    <ListItem>
                      <i className="fa-solid fa-circle-dot"></i>Create
                      Department
                    </ListItem>
                  </Link>
                  <Link to={`/app/bim/add-product`}>
                    <ListItem>
                      <i className="fa-solid fa-circle-dot"></i>Add Products
                    </ListItem>
                  </Link>
                </List>
              </div>
            )}
          </Box>
        </Box>
        <Box className="bimapping-table">
          {organization.status === inprogressStatus ? (
            this.renderLoder()
          ) : organizationTableData?.length ? (
            <AccordionView
              data={organizationTableData}
              headers={headers}
              onClickNode={(data) => this.onClickNode(data)}
              isLoding={loderStatus}
              onLinkClick={(data) => this.onLinkClick(data)}
            />
          ) : (
            this.renderNoDataHtml("There are no data available.")
          )}
        </Box>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { products, productEnv } = state.associateApp;
  const { organizationWiseDepartments } = state.environments;
  const { elementTypeData, elementInstancesOfGivenType } = state.biMapping;
  return {
    organizationWiseDepartments,
    products,
    productEnv,
    elementTypeData,
    elementInstancesOfGivenType,
  };
}

const mapDispatchToProps = {
  getOrgWiseDepartments,
  getProductList,
  getProductEnv,
  getElementType,
  getElementInstancesOfGivenType,
  setProductIntoDepartment,
};

export default connect(mapStateToProps, mapDispatchToProps)(BIMapping);
