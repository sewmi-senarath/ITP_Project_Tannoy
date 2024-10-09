import React, { useState ,useEffect } from "react";
import "boxicons";
import { default as api } from "../store/apiSlice";
import EditMachine from "./EditMachineForm";
import { Input } from "antd";
import { IoSearch } from "react-icons/io5";
import { FiPrinter } from "react-icons/fi";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { MdAddCard } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from 'axios';


export default function MachineList() {
  const { data, isFetching, isSuccess, isError } =
    api.useGetMachineLabelsQuery();
  const [deleteMachine] = api.useDeleteMachineMutation(); // Ensure this matches your API slice
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState('');  // State for search query


  useEffect(() => {
    const getData = () => {
      axios
        .get("http://localhost:5000/recyclingProducts")
        .then(response => {
          setProducts(response.data.RecyclingProducts);
          console.log(products)
        })
        .catch(error => console.log(error));
    };
    

    getData();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.recyclingProductName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) && product.status === "COMPLETE"
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search input value
  };

  const handleDeleteClick = async (id) => {
    console.log("Attempting to delete machine with ID:", id);
    try {
      const result = await deleteMachine({ _id: id }).unwrap();
      console.log("Delete successful:", result);
    } catch (error) {
      console.error("Failed to delete machine:", error);
    }
  };

  let MachineList;

  if (isFetching) {
    MachineList = <div>Fetching...</div>;
  } else if (isSuccess) {
    // Filter machines by name based on search term (case-insensitive)
    const filteredMachines = data.filter((machine) =>
      machine.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    MachineList = filteredMachines.length ? (
      filteredMachines.map((machine) => (
        <Machine
          key={machine._id}
          machine={machine}
          handler={handleDeleteClick}
          filteredProducts={filteredProducts}
        />
      ))
    ) : (
      <div>No machines found</div>
    );
  } else if (isError) {
    MachineList = <div>Error fetching machines.</div>;
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
    const pdfName = `Machine_Report_${currentDate}.pdf`;

    // Add report title
    doc.setFontSize(20);
    doc.text("Machine Report", 20, 20);

    // Date and Time above table
    doc.setFontSize(12);
    doc.text(`Date: ${currentDate}`, 20, 30);
    doc.text(`Time:${currentTime}`, doc.internal.pageSize.getWidth() - 50, 30);

    // Define table headers
    const tableHeaders = [
      "Machine Name",
      "Material Type",
      "Service Date",
      "Next Service Date",
      "Cost",
      "Description",
    ];

    // Map the data for the table
    const tableData = data.map((machine) => [
      machine.name,
      machine.materialtype,
      formatDate(machine.servicedate),
      formatDate(machine.nextservicedate),
      machine.Cost,
      machine.description,
    ]);

    // Generate the PDF table
    doc.autoTable({
      startY: 40,
      head: [tableHeaders],
      body: tableData,
    });

    // Save the PDF
    doc.save(pdfName);
  };

  // Helper function to format the date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear(); // use full year
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="">
      <div className="flex justify-between items-center h-12 p-4 bg-white rounded-[11px] mb-[15px] px-[15px] ">
        <h1 className="text-2xl font-semibold font-Poppins px-4">
          All machines
        </h1>
        <Input
          placeholder="Search by machine Name"
          prefix={<IoSearch className="text-gray-500 text-xl" />}
          style={{ width: 200 }}
          value={searchTerm}
          onChange={handleSearchChange}
          className="border-2 rounded-lg w-12"
        />
        <Link to={"/addmachine"}>
          <button
            className=" text-white text-sm font-normal font-['Lexend'] px-4 py-2 flex items-center rounded"
            style={{ background: "bg-[#26bb3a]" }}
          >
            <MdAddCard className="fill-green-700 w-8 h-8" />
          </button>
        </Link>
        <div className="flex justify-center items-center">
          <button
            onClick={generateReport}
            className=" text-sm font-normal font-['Lexend'] px-4 py-2 flex items-center rounded"
          >
            <FiPrinter className="mr-2 w-8 h-8 fill-green-700" />
          </button>
        </div>
      </div>
      <div className="item flex bg-gray-50  rounded-md mt-2 font-bold h-12">
        <span className="block w-full mt-4 text-sm">Action</span>
        <span className="block w-full mt-4 text-sm ">Machine Name</span>
        <span className="block w-full mt-4 text-sm">Material Type</span>
        <span className="block w-full mt-4 text-sm">Service Date</span>
        <span className="block w-full mt-4 text-sm">Next Service Date</span>
        <span className="block w-full mt-4 text-sm"> Repair Cost</span>
        <span className="block w-full mt-4 text-sm">Description</span>
      </div>

      <div>{MachineList}</div>
      <table className='recycled-table'>
            <thead>
              <tr>
                <th className= "w-80">Machine Name</th>
                <th>Machine Status</th>
                
              </tr>
            </thead>
            <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id}>
              <td>{product.machineName}</td>
              <td>{product.machineCondition}</td>
            </tr>
          ))}
        </tbody>
          </table>
    </div>
  );
}

function Machine({ machine, handler, filteredProducts }) {
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

  if (!machine) return null;

  return (
    <div>
    <div
      className="item flex justify-center bg-gray-50 rounded-md mt-2"
      style={{ borderRight: `8px solid ${machine.color ?? "#e5e5e5"}` }}
    >
      <button className="w-80" onClick={() => handler(machine.id)}>
        <box-icon color={machine.color ?? "#e5e5e5"} size="20px" name="trash" />
      </button>
      <button className="w-80" onClick={handleOpen}>
        <box-icon
          color={machine.color ?? "#e5e5e5"}
          size="20px"
          name="edit-alt"
        ></box-icon>
      </button>
      <EditMachine
        open={openDialog}
        setOpen={setOpenDialog}
        matirialData={machine}
      />

      <span className="block w-full mt-4 text-sm">{machine.name ?? ""}</span>
      <span className="block w-full mt-4 text-sm">
        {machine.materialtype ?? ""}
      </span>
      <span className="block w-full mt-4 text-sm">
        {formatDate(machine.servicedate)}
      </span>
      <span className="block w-full mt-4 text-sm">
        {formatDate(machine.nextservicedate)}
      </span>
      <span className="block w-full mt-4 text-sm">{machine.Cost ?? ""}</span>
      <span className="block w-full mt-4 text-sm">
        {machine.description ?? ""}
      </span>
    </div>
    
    </div>
  );
}
