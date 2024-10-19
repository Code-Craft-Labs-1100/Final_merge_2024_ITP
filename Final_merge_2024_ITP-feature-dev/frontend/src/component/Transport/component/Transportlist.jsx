import React, { useState } from "react";
import "boxicons";
import { default as api } from "../store/apiSlice";
import { Input } from "antd";
import { IoSearch } from "react-icons/io5";
import { FiPrinter } from "react-icons/fi";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";
import { MdAddCard } from "react-icons/md";
import EditTransportForm from "./EditTransportForm";

export default function TransportList() {
  const { data, isFetching, isSuccess, isError } =
    api.useGetTransportLabelsQuery();
  const [deleteTransport] = api.useDeleteTransportMutation();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search input value
  };

  const handleDeleteClick = async (id) => {
    try {
      const result = await deleteTransport({ _id: id }).unwrap();
      console.log("Delete successful:", result);
    } catch (error) {
      console.error("Failed to delete transport:", error);
    }
  };

  let TransportList;

  if (isFetching) {
    TransportList = <div>Fetching...</div>;
  } else if (isSuccess) {
    // Filter transports by customer name based on search term (case-insensitive)
    const filteredtransports = data.filter((transport) =>
      transport.customername?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Render filtered transports or a message if none found
    TransportList = filteredtransports.length ? (
      filteredtransports.map((transport) => (
        <Transport
          key={transport._id}
          transport={transport}
          handler={handleDeleteClick}
        />
      ))
    ) : (
      <div>No transports found</div>
    );
  } else if (isError) {
    TransportList = <div>Error fetching transports.</div>;
  }

  const generateReport = () => {
    if (!data || data.length === 0) {
      alert("No data available to generate report");
      return;
    }

    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const pdfName = `transport_Report_${currentDate}.pdf`;

    doc.setFontSize(20);
    doc.text("Transport Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Date: ${currentDate}`, 20, 30);
    doc.text(`Time: ${currentTime}`, doc.internal.pageSize.getWidth() - 50, 30);

    const tableHeaders = [
      "Customer Name",
      "Vehicle Type",
      "Rent Date",
      "Claim Date",
      "Rent Cost",
    ];

    const tableData = data.map((transport) => [
      transport.customername,
      transport.vehicletype,
      formatDate(transport.rentdate),
      formatDate(transport.claimdate),
      transport.rentprice,
    ]);

    doc.autoTable({
      startY: 40,
      head: [tableHeaders],
      body: tableData,
    });

    doc.save(pdfName);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div>
      <div className="flex justify-between items-center h-24 p-4 bg-white rounded-[11px] mb-[15px] px-[15px]">
        <h1 className="text-2xl font-semibold font-Poppins px-4">All Transports</h1>
        <Input
          placeholder="Search by Customer Name"
          prefix={<IoSearch className="text-gray-500 text-xl" />}
          style={{ width: 200 }}
          value={searchTerm} // Bind input to searchTerm state
          onChange={handleSearchChange} // Update search term on input change
        />
        <Link to="/addtranport">
          <button
            className="bg-[#26bb3a] text-white text-sm font-normal font-['Lexend'] px-4 py-2 flex items-center rounded"
          >
            <MdAddCard className="text-black w-8 h-8" />
          </button>
        </Link>
        <div className="flex justify-center items-center">
          <button
            onClick={generateReport}
            className="bg-[#26bb3a] text-black text-sm font-normal font-['Lexend'] px-4 py-2 flex items-center rounded"
          >
            <FiPrinter className="mr-2 w-8 h-8" />
          </button>
        </div>
      </div>

      <div className="item flex bg-gray-50 md:mr-8 lg:mr-12 mt-2 font-bold">
        <span className="w-full mt-2 ml-1 text-sm">Action</span>
        <span className="w-full mt-2 text-sm">Customer Name</span>
        <span className="w-full mt-2 text-sm">Vehicle Type</span>
        <span className="w-full mt-2 text-sm">Rent Date</span>
        <span className="w-full mt-2 text-sm">Claim Date</span>
        <span className="mr-4 w-full mt-2 text-sm">Rent Cost</span>
      </div>

      <br />

      <div>{TransportList}</div>
    </div>
  );
}

function Transport({ transport, handler }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleOpen = () => {
    setOpenDialog(true);
    setIsEditOpen(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  if (!transport) return null;

  return (
    <div
      className="item flex justify-center bg-gray-50 rounded-md mt-2"
      style={{ borderRight: `8px solid ${transport.color ?? "#e5e5e5"}` }}
    >
      <button className="px-3" onClick={() => handler(transport._id)}>
        <box-icon color={transport.color ?? "#e5e5e5"} size="20px" name="trash" />
      </button>
      <button className="px-3" onClick={handleOpen}>
        <box-icon
          color={transport.color ?? "#e5e5e5"}
          size="20px"
          name="edit-alt"
        ></box-icon>
      </button>
      <EditTransportForm
        open={openDialog}
        setOpen={setOpenDialog}
        transportData={transport}
      />

      <span className="block w-full mt-4 text-sm">
        {transport.customername ?? ""}
      </span>
      <span className="block w-full mt-4 text-sm">
        {transport.vehicletype ?? ""}
      </span>
      <span className="block w-full mt-4 text-sm">
        {formatDate(transport.rentdate)}
      </span>
      <span className="block w-full mt-4 text-sm">
        {formatDate(transport.claimdate)}
      </span>
      <span className="block w-full mt-4 text-sm">
        {transport.rentprice ?? ""}
      </span>
    </div>
  );
}
