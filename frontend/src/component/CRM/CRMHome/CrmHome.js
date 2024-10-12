import { Link } from "react-router-dom";
import Header from "../CrmHeader/crmHeader";

function CrmHome() {
  return (
    <div>
  <Header />
  <div className="flex flex-row justify-center items-start">
    <div className="flex flex-col gap-6 p-6 mt-20 w-1/4 bg-slate-200 rounded-xl shadow-lg">
      {/* Dashboard Heading */}
      <h1 className="text-center font-bold text-2xl text-gray-700 mb-4">Dashboard</h1>

      {/* Order Details Button */}
      <Link to="/orderDetails" className="no-underline">
        <button
          type="submit"
          className="bg-blue-800 text-white py-3 px-6 rounded-lg uppercase w-full font-semibold 
          hover:bg-blue-600 hover:scale-105 no-underline ease-in-out"
        >
          Order Details
        </button>
      </Link>

      {/* Report Button */}
      <Link to="/crmReport" className="no-underline">
        <button
          type="submit"
          className="bg-blue-800 text-white py-3 px-6 rounded-lg uppercase w-full font-semibold 
          hover:bg-blue-600 hover:scale-105  ease-in-out"
        >
          Report
        </button>
      </Link>

      {/* Support Desk Button */}
      <Link to="/inventoryReport" className="no-underline">
        <button
          type="submit"
          className="bg-blue-800 text-white py-3 px-6 rounded-lg uppercase w-full font-semibold 
          hover:bg-blue-600 hover:scale-105 ease-in-out"
        >
          Support Desk
        </button>
      </Link>
    </div>
  </div>
</div>

  );
}
export default CrmHome;
