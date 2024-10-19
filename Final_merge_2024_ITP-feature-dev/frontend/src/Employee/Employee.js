import React, { useEffect, useState } from "react";
import {
  Layout,
  Typography,
  Form,
  Input,
  Space,
  Button,
  Modal,
  message
} from "antd";
import {
  PlusOutlined,
  StockOutlined,
  SearchOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import LayoutNew from "../Layout";
import { DataGrid } from "@mui/x-data-grid";
import EmployeeForm from "./AddEditEmployee";
import axios from "axios";

const { Title } = Typography;
const { Content } = Layout;
const token = localStorage.getItem("authToken");

const EmployeeManagementPage = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isAddEmployeeModalVisible, setIsAddEmployeeModalVisible] =
    useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/employees`);
      setData(response.data.data);
      setFilteredData(response.data.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const transformedRows = filteredData.map((row) => ({
    id: row._id,
    ...row
  }));

  const filterData = (query) => {
    if (!query) {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (employee) =>
          employee.firstName.toLowerCase().includes(query) ||
          employee.lastName.toLowerCase().includes(query) ||
          employee.email.toLowerCase().includes(query) ||
          employee.phone.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    }
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterData(query);
  };

  const addNewEmployee = () => {
    setIsAddEmployeeModalVisible(true);
  };

  const handleCancel = () => {
    setIsAddEmployeeModalVisible(false);
    setEditingEmployee(null);
    form.resetFields();
  };

  const confirmDelete = (id) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this employee?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => deleteItem(id)
    });
  };

  const deleteItem = async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/employees/${id}`,
      {
        headers: {
          Authorization: token
        }
      }
    );
    if (response.data.success) {
      message.success("Employee deleted successfully");
      fetchEmployees();
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsAddEmployeeModalVisible(true);
    form.setFieldsValue({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      address: employee.address,
      city: employee.city,
      state: employee.state,
      country: employee.country,
      zipCode: employee.zipCode,
      DateOfBirth: employee.Date,
      role: employee.role,
      gender: employee.gender
    });
  };

  const columns = [
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "city", headerName: "City", width: 100 },
    { field: "state", headerName: "State", width: 100 },
    { field: "country", headerName: "Country", width: 100 },
    { field: "zipCode", headerName: "Zip Code", width: 100 },
    { field: "DateOfBirth", headerName: "Date of Birth", width: 100 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "gender", headerName: "gender", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) =>
        React.createElement("div", null, [
          React.createElement(Button, {
            onClick: () => handleEdit(params.row),
            icon: React.createElement(EditOutlined, {
              style: { color: "blue" }
            })
          }),
          React.createElement(Button, {
            onClick: () => confirmDelete(params.row.id),
            icon: React.createElement(DeleteOutlined, {
              style: { color: "red" }
            })
          })
        ])
    }
  ];

  const onFinish = (values) => {
    onFinishAddEmployee(values);
  };

  const onFinishAddEmployee = async (values) => {
    try {
      let response = null;
      if (editingEmployee) {
        response = await axios.put(
          `http://localhost:5000/api/employees/${editingEmployee.id}`,
          values,
          {
            headers: {
              Authorization: token
            }
          }
        );
      } else {
        response = await axios.post(
          `http://localhost:5000/api/employees/`,
          values,
          {
            headers: {
              Authorization: token
            }
          }
        );
      }

      if (response.data.success) {
        form.resetFields();
        setIsAddEmployeeModalVisible(false);
        message.success(
          `Employee ${editingEmployee ? "updated" : "added"} successfully`
        );
        fetchEmployees();
      }
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const [loggedInUserType, setLoggedInUserType] = useState("");

  useEffect(() => {
    const userType = localStorage.getItem("loggedInUserType");
    if (userType) {
      setLoggedInUserType(userType);
    }
  }, []);

  return React.createElement(
    LayoutNew,
    { userType: loggedInUserType },
    React.createElement(
      Layout,
      null,
      React.createElement(
        Content,
        { style: { padding: "24px" } },
        React.createElement(
          Space,
          {
            style: {
              // background: "#001529",
              backgroundColor: "#001529",
              padding: "12px",
              borderRadius: "8px",
              justifyContent: "space-between",
              display: "flex"
            }
          },
          React.createElement(
            Space,
            null,
            React.createElement(StockOutlined, {
              style: {
                fontSize: "24px",
                marginRight: "8px",
                color: "white",
                backgroundColor: "#001529"
              }
            }),
            React.createElement(
              Title,
              {
                level: 2,
                style: {
                  fontSize: "24px",
                  marginTop: "8px",
                  color: "white",
                  backgroundColor: "#001529"
                }
              },
              "Employee Management"
            )
          ),
          React.createElement(
            "div",
            { style: { marginLeft: "auto" } },
            React.createElement(
              Button,
              {
                type: "primary",
                icon: React.createElement(PlusOutlined, null),
                onClick: addNewEmployee
              },
              "Add New Employee"
            )
          )
        ),
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement(
          "div",
          {
            style: {
              marginBottom: "16px",
              display: "flex",
              alignItems: "center"
            }
          },
          React.createElement(Input, {
            placeholder: "Search...",
            prefix: React.createElement(SearchOutlined, null),
            onChange: handleSearchInputChange,
            value: searchQuery,
            style: { marginRight: "8px" }
          })
        ),
        React.createElement(DataGrid, {
          rows: transformedRows,
          columns: columns,
          pageSize: 10,
          checkboxSelection: true,
          disableSelectionOnClick: true,
          autoHeight: true
        }),
        React.createElement(
          Modal,
          {
            open: isAddEmployeeModalVisible,
            title: editingEmployee ? "Edit Employee" : "Add New Employee",
            okText: editingEmployee ? "Update" : "Save",
            cancelText: "Cancel",
            onCancel: handleCancel,
            onOk: () => {
              form
                .validateFields()
                .then((values) => {
                  onFinish(values);
                })
                .catch((errorInfo) => {
                  console.log("Validation Failed:", errorInfo);
                });
            }
          },
          React.createElement(EmployeeForm, { form: form, onFinish: onFinish })
        )
      )
    )
  );
};

export default EmployeeManagementPage;
