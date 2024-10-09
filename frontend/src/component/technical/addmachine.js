import React, { useState } from "react";
import axios from 'axios';
import { message } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import tecnicalimage from "../../images/technical.png"
import { RiArrowGoBackLine } from "react-icons/ri";

const Addmachine = () => {
  const [name, setname] = useState("");
  const [materialtype, setmaterialtype] = useState("");
  const [servicedate, setservicedate] = useState("");
  const [nextservicedate, setnextservicedate] = useState("");
  const [description, setdescription] = useState("");
  const [Cost, setCost] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateNextServiceDate = () => {
    if (new Date(nextservicedate) <= new Date(servicedate)) {
      setError("Next service date must be a future date relative to the service date.");
      return false;
    }
    setError("");
    return true;
  };

  const addmachine = async (event) => {
    event.preventDefault();

    if (!validateNextServiceDate()) {
      return;
    }

    const machine = {
      name,
      materialtype,
      servicedate,
      nextservicedate,
      description,
      Cost
    };

    try {
      const result = await axios.post("http://localhost:5000/api/addmachine", machine);
      console.log(result.data);

      message.success('Machine added successfully!').then(() => {
        navigate("/technicalHome");
        window.location.reload()
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-white-green">
        <div className="container flex justify-between items-start mr-20 mb-10">
          {/* Image container */}
          <div className="w-[600px] ">
          <Link to={"/technicalHome"}>
          <RiArrowGoBackLine className="mt-5 ml-5 w-8 h-8" /></Link>
            <h2 className="font-bold text-dark text-xl font-custom mt-2 mb-6 ml-8">Add new Machine</h2>
            <img src={tecnicalimage} alt="Machine" className="w-full h-auto rounded-xl mt-12 mr-44" />
           <h1 className="ml-30 text-center text-black font-semibold"> Resposible <span className="text-green-500">Machine repair</span> service.</h1>
          </div>
          {/* Form container */}
          <div className="w-[900px] max-w-2xl bg-white shadow-xl rounded-3xl p-6 pl-7 mt-20">
            <form onSubmit={addmachine}>
              <div className="flex flex-col mt-6">
                <label htmlFor="machineName" className="text-gray-700 font-bold mb-2">Machine name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Machine name"
                  required
                  className="p-2 block w-full rounded-xl bg-gray-100 text-black border-none placeholder-gray-400 placeholder-opacity-50 font-custom text-md"
                />
              </div>
              <div className="flex flex-col mt-6">
                <label htmlFor="machineName" className="text-gray-700 font-bold mb-2">Material type</label>
                <select
              value={materialtype}
              onChange={(e) => setmaterialtype(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl block w-full p-2.5"
            >
              <option  value="">Select here</option>
              <option value="HDPE">HDPE</option>
              <option value="PVC">PVC</option>
              <option value="Polypropylene">Polypropylene</option>
              <option value="Polystyrene">Polystyrene</option>
              <option value="Acrylic">Acrylic</option>
            </select>
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="serviceDate" className="text-gray-700 font-bold mb-2">Service date</label>
                <input
                  type="date"
                  value={servicedate}
                  onChange={(e) => setservicedate(e.target.value)}
                  required
                  className="p-2 block w-full rounded-xl bg-gray-100 border-none focus:outline-none placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                />
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="nextServiceDate" className="text-gray-700 font-bold mb-2">Next service date</label>
                <input
                  type="date"
                  value={nextservicedate}
                  onChange={(e) => setnextservicedate(e.target.value)}
                  required
                  className="p-2 block w-full rounded-xl bg-gray-100 border-none focus:outline-none placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                />
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="cost" className="text-gray-700 font-bold mb-2">Cost</label>
                <input
                  type="number"
                  value={Cost}
                  onChange={(e) => setCost(e.target.value)}
                  required
                  placeholder='Cost'
                  className="p-2 block w-full rounded-xl bg-gray-100 border-none focus:outline-none placeholder-gray-500 placeholder-opacity-50 font-custom text-md"
                />
              </div>
              <div className="flex flex-col mt-6">
                <label htmlFor="description" className="text-gray-700 font-bold mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                  required
                  rows="4"
                  className="p-2.5 block w-full text-sm text-gray-500 rounded-xl bg-gray-100 dark:border-gray-100 placeholder-gray-500 placeholder-opacity-50"
                  placeholder="Summary of the service"
                />
              </div>
              <div className="mt-8 mb-2">
                <button
                  type="submit"
                  className="text-white bg-green-500 block w-full font-semibold rounded-md text-md px-5 py-2.5 text-center transition-transform duration-300 ease-in-out transform hover:scale-105"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default Addmachine;