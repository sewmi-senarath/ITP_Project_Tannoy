import React from 'react';
import PrintableOrder from "../OrderReport/PrintableOrder";
import ReportButton from "../OrderReport/ReportButton";
import { useRef } from "react";


function FinanceCRM() {
    const componentsRef = useRef(); // Shared ref for the content to print
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Download CRM Report
        </h2>

        {/* Download Button */}
        <div className="flex justify-center">
        <ReportButton contentRef={componentsRef} />
        </div>
      </div>
       {/* Hidden Printable Order */}
       <div style={{ display: "none" }}>
          <PrintableOrder ref={componentsRef} />
        </div>
    </div>
  );
}

export default FinanceCRM;
