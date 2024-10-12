import React from "react";
import Header from "../CrmHeader/crmHeader";
import PrintableOrder from "../OrderReport/PrintableOrder";
import ReportButton from "../OrderReport/ReportButton";
import { useRef } from "react";
import { Link } from "react-router-dom";

// Import the new component

function CRMReport() {
  const componentsRef = useRef(); // Shared ref for the content to print
  return (
<div>
  <Header />

  <div className="flex flex-col items-center m-8">
    <h1 className="text-center font-bold text-4xl text-slate-700 mb-4">
      Report Section
    </h1>
    <hr className="border-2 w-full mb-8" />
  </div>

  <div className="flex flex-wrap justify-center gap-8">
    {/* Report Card */}
    <div className="relative w-full sm:w-1/3 h-52 bg-white rounded-lg shadow-lg p-4">
      <div className="w-full h-12 bg-sky-200 rounded-lg flex items-center justify-center">
        <h2 className="font-medium text-2xl text-slate-900">Report</h2>
      </div>
    </div>

    {/* Generate Order Report Card */}
    <div className="relative w-full sm:w-1/3 h-52 bg-white rounded-lg shadow-lg p-4">
      <div className="w-full h-12 bg-sky-200 rounded-lg flex items-center justify-center">
        <h2 className="font-medium text-2xl text-slate-900">
          Generate Order Report
        </h2>
      </div>
      <div className="absolute bottom-4 right-4">
        <ReportButton contentRef={componentsRef} />
      </div>
    </div>

    {/* Upload Report Card */}
    {/* <div className="relative w-full sm:w-1/3 h-52 bg-white rounded-lg shadow-lg p-4">
      <div className="w-full h-12 bg-sky-200 rounded-lg flex items-center justify-center">
        <h2 className="font-medium text-2xl text-slate-900">Upload Report</h2>
      </div>
      <Link to="/sendReport">
        <button className="bg-lime-500 text-white font-semibold py-2 px-4 rounded-lg absolute bottom-4 right-4 hover:bg-lime-600 transition-all duration-200">
          Upload Report
        </button>
      </Link>
    </div> */}
  </div>

  {/* Hidden Printable Order */}
  <div className="hidden">
    <PrintableOrder ref={componentsRef} />
  </div>
</div>

    
  );
}

export default CRMReport;
