import { Link } from "react-router-dom";
import Header from "../CrmHeader/crmHeader";

function CrmHome() {
  return (
    <div>
       <Header />
      <div className="flex flex-row ">
        <div className="flex flex-col gap-5 p-5 mt-16 w-2/7 bg-slate-200 rounded-xl mx-auto mb-10">
          <h1 className="text-center font-semibold">Dashboard</h1>
          <Link to="/orderDetails">
            <button
              type="submit"
              className="bg-blue-800 text-white p-3 rounded-lg uppercase w-72 ml-4 over:opacity-95 font-semibold hover:opacity-95 hover:scale-110 hover:bg-blue-600 transition duration-300 mb-2"
            >
              Order Details
            </button>
          </Link>
         
          <Link to="/crmReport">
            <button
              type="submit"
              className="bg-blue-800 text-white p-3 rounded-lg uppercase w-72 ml-4 over:opacity-95 font-semibold hover:opacity-95 hover:scale-110 hover:bg-blue-600 transition duration-300 mb-2"
            >
               Report
            </button>
          </Link>
          <Link to="/inventoryReport">
            <button
              type="submit"
              className="bg-blue-800 text-white p-3 rounded-lg uppercase w-72 ml-4 over:opacity-95 font-semibold hover:opacity-95 hover:scale-110 hover:bg-blue-600 transition duration-300 mb-2"
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
