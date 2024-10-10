// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import jsPDF from 'jspdf'; // For generating PDFs
// import 'jspdf-autotable'; // For creating tables in PDFs
// import '../../styles/productDashoard.css'; // CSS file
// import Logo from '../../images/logo.jpeg';
// import manager from '../../images/manager.jpeg';
// import { useNavigate } from "react-router-dom";

// const ProductDashboard = () => {
//   const [products, setProducts] = useState([]); // Hold product data
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(''); // Error handling
//   const [searchQuery, setSearchQuery] = useState(''); // Search query state
//   const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
//   const [availabilityFilter, setAvailabilityFilter] = useState(''); // Availability filter
//   const navigate = useNavigate();

//   const lowStockThreshold = 10;

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/products');
//         setProducts(response.data);
//         setFilteredProducts(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching products.');
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const lowerCaseQuery = searchQuery.toLowerCase();
//     let filtered = products.filter(product =>
//       product.ProductCode.toLowerCase().includes(lowerCaseQuery)
//     );

//     if (availabilityFilter === 'in-stock') {
//       filtered = filtered.filter(product => product.availability === 'In Stock');
//     } else if (availabilityFilter === 'out-of-stock') {
//       filtered = filtered.filter(product => product.availability === 'Out of Stock');
//     }

//     setFilteredProducts(filtered);
//   }, [searchQuery, availabilityFilter, products]);

//   const lowStockProducts = filteredProducts.filter(product => {
//     const stockSize = Number(product.stockSize);
//     return stockSize < lowStockThreshold;
//   });

//   const handleEdit = (productId) => {
//     navigate(`/Addproduct/${productId}`);
//   };

//   const deleteProduct = async (productId) => {
//     const confirmed = window.confirm('Are you sure you want to delete this product?');
//     if (!confirmed) return;

//     try {
//       const response = await axios.delete(`http://localhost:5000/api/products/${productId}`);
//       if (response.status === 200) {
//         setProducts((prevProducts) => prevProducts.filter(product => product._id !== productId));
//         alert('Product deleted successfully');
//       }
//     } catch (err) {
//       console.error('Error deleting product:', err);
//       alert('Failed to delete product.');
//     }
//   };

//   const generateReport = () => {
//     const doc = new jsPDF();
//     doc.text('Product Report', 14, 22);

//     const tableColumn = ["Product Code", "Product Name", "Description", "Stock Size", "Category", "Availability", "Price"];
//     const tableRows = filteredProducts.map(product => [
//       product.ProductCode,
//       product.ProductName,
//       product.ProductDescription,
//       product.stockSize,
//       product.ProductCategory,
//       product.availability || 'Unknown',
//       product.price
//     ]);

//     doc.autoTable({
//       head: [tableColumn],
//       body: tableRows,
//       startY: 30
//     });

//     doc.save('Product_Report.pdf');
//   };

//   if (loading) {
//     return <p>Loading products...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="flex">
//       <div className="w-64 bg-gray-800 h-screen text-white">
//         <div className="p-4">
//           {/* <img src={Logo} alt="Tannoy Electricals Logo" className="h-16 mx-auto" /> */}
//           <h2 className="text-center mt-2">Tannoy Electricals</h2>
//         </div>
//         <ul className="mt-6 space-y-2">
//           <li><a href="/productDashboard" className="block py-2 px-4 hover:bg-gray-700">Product Details</a></li>
//           <li><a href="/Addproduct" className="block py-2 px-4 hover:bg-gray-700">Add Product</a></li>
//           <li><a href="/supplierDashboard" className="block py-2 px-4 hover:bg-gray-700">Supplier details</a></li>
//           <li><a href="/Addsupplier" className="block py-2 px-4 hover:bg-gray-700">Add Supplier</a></li>
//           <li><a href="/stockDashboard" className="block py-2 px-4 hover:bg-gray-700">Stock Details</a></li>
//           <li><a href="/addStock" className="block py-2 px-4 hover:bg-gray-700">Add Stock</a></li>
//           <li><a href="/stock-add" className="block py-2 px-4 hover:bg-gray-700">Add Inquiry</a></li>
//         </ul>
//         <div className="mt-auto p-4">
//           <img src={manager} alt="Manager Photo" className="h-16 w-16 rounded-full mx-auto" />
//           <p className="text-center mt-2">Stock Manager</p>
//           <p className="text-center text-gray-400">stockmanager@tannoy.com</p>
//           <ul className="mt-4 space-y-2">
//           <li><a href="#" className="block py-2 px-4 hover:bg-gray-700">Settings</a></li>
//           <li><a href="#" className="block py-2 px-4 hover:bg-gray-700">Log out</a></li>
//         </ul>
//         </div>
//         {/* <ul className="mt-4 space-y-2">
//           <li><a href="#" className="block py-2 px-4 hover:bg-gray-700">Settings</a></li>
//           <li><a href="#" className="block py-2 px-4 hover:bg-gray-700">Log out</a></li>
//         </ul> */}
//       </div>

//       <div className="flex-1 p-6 bg-gray-100 overflow-auto h-screen">
//         <h1 className="text-2xl font-bold mb-4">Product Details</h1>
//         <div className="flex items-center space-x-4 mb-4">
//           <select
//             value={availabilityFilter}
//             onChange={(e) => setAvailabilityFilter(e.target.value)}
//             className="border border-gray-300 rounded p-2 w-1/4"
//           >
//             <option value="">All Products</option>
//             <option value="in-stock">In Stock</option>
//             <option value="out-of-stock">Out of Stock</option>
//           </select>

//           <input
//             type="text"
//             placeholder="Search by Product Code..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="border border-gray-300 rounded p-2 w-1/4" // Made the search bar same width as the dropdown
//           />
//         </div>

//         <div>
//           {lowStockProducts.length > 0 && (
//             <p className="text-red-600">
//               ⚠️ Warning: The following products are running low on stock! IDs: {lowStockProducts.map(product => product.ProductCode).join(', ')}
//             </p>
//           )}
//         </div>

//         <table className="min-w-full bg-white shadow-md rounded-lg">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="py-2 px-4">Product Code</th>
//               <th className="py-2 px-4">Product Name</th>
//               <th className="py-2 px-4">Description</th>
//               <th className="py-2 px-4">Stock Size</th>
//               <th className="py-2 px-4">Category</th>
//               <th className="py-2 px-4">Availability</th>
//               <th className="py-2 px-4">Price</th>
//               <th className="py-2 px-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map((product) => (
//                 <tr key={product._id}>
//                   <td className="py-2 px-4 border">{product.ProductCode}</td>
//                   <td className="py-2 px-4 border">{product.ProductName}</td>
//                   <td className="py-2 px-4 border">{product.ProductDescription}</td>
//                   <td className="py-2 px-4 border">{product.stockSize}</td>
//                   <td className="py-2 px-4 border">{product.ProductCategory}</td>
//                   <td className="py-2 px-4 border">{product.availability}</td>
//                   <td className="py-2 px-4 border">{product.price}</td>
//                   <td className="py-2 px-4 border">
//                     <button
//                       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
//                       onClick={() => handleEdit(product._id)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
//                       onClick={() => deleteProduct(product._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8" className="py-2 px-4 text-center">No products found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         <div className="mt-4">
//           <button
//             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//             onClick={generateReport}
//           >
//             Generate Report
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDashboard;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../../styles/productDashoard.css'; 
import Logo from '../../images/logo.jpeg';
import manager from '../../images/manager.jpeg';
import { useNavigate } from "react-router-dom";

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const navigate = useNavigate();

  const lowStockThreshold = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Products');
        const productData = response.data.Products.map(product => ({
          ProductCode: product.productId,
          ProductName: product.productName,
          Quality: product.quality, // Assuming quality as description
          stockSize: product.quantity,
          ProductCategory: product.status, // Assuming status as category
          availability: product.quantity > 0 ? 'In Stock' : 'Out of Stock',
          price: product.price || 'N/A', // Assuming you have a price field
        }));
        setProducts(productData);
        setFilteredProducts(productData);
        setLoading(false);
      } catch (err) {
        setError('Error fetching products.');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    let filtered = products.filter(product =>
      product.ProductCode.toLowerCase().includes(lowerCaseQuery)
    );

    if (availabilityFilter === 'in-stock') {
      filtered = filtered.filter(product => product.availability === 'In Stock');
    } else if (availabilityFilter === 'out-of-stock') {
      filtered = filtered.filter(product => product.availability === 'Out of Stock');
    }

    setFilteredProducts(filtered);
  }, [searchQuery, availabilityFilter, products]);

  const lowStockProducts = filteredProducts.filter(product => {
    const stockSize = Number(product.stockSize);
    return stockSize < lowStockThreshold;
  });

  const handleEdit = (productId) => {
    navigate(`/Addproduct/${productId}`);
  };

  const deleteProduct = async (productId) => {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (!confirmed) return;

    try {
      const response = await axios.delete(`http://localhost:5000/Products/${productId}`);
      if (response.status === 200) {
        setProducts((prevProducts) => prevProducts.filter(product => product.ProductCode !== productId));
        alert('Product deleted successfully');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product.');
    }
  };

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text('Product Report', 14, 22);

    const tableColumn = ["Product Code", "Product Name", "Quality", "Stock Size", "Category", "Availability", "Price"];
    const tableRows = filteredProducts.map(product => [
      product.ProductCode,
      product.ProductName,
      product.Quality,
      product.stockSize,
      product.ProductCategory,
      product.availability || 'Unknown',
      product.price
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30
    });

    doc.save('Product_Report.pdf');
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex">
      <div className="w-64 bg-gray-800 h-screen text-white">
        <div className="p-4">
          <h2 className="text-center mt-2">Tannoy Electricals</h2>
        </div>
        <ul className="mt-6 space-y-2">
        <li><a href="/productDashboard" className="block py-2 px-4 hover:bg-gray-700">Product Details</a></li>
           <li><a href="/Addproduct" className="block py-2 px-4 hover:bg-gray-700">Add Product</a></li>
           <li><a href="/supplierDashboard" className="block py-2 px-4 hover:bg-gray-700">Supplier details</a></li>
           <li><a href="/Addsupplier" className="block py-2 px-4 hover:bg-gray-700">Add Supplier</a></li>
           <li><a href="/stockDashboard" className="block py-2 px-4 hover:bg-gray-700">Stock Details</a></li>
           <li><a href="/addStock" className="block py-2 px-4 hover:bg-gray-700">Add Stock</a></li>
           <li><a href="/stock-add" className="block py-2 px-4 hover:bg-gray-700">Add Inquiry</a></li>
        </ul>
        <div className="mt-auto p-4">
          <img src={manager} alt="Manager Photo" className="h-16 w-16 rounded-full mx-auto" />
          <p className="text-center mt-2">Stock Manager</p>
          <p className="text-center text-gray-400">stockmanager@tannoy.com</p>
        </div>
      </div>

      <div className="flex-1 p-6 bg-gray-100 overflow-auto h-screen">
        <h1 className="text-2xl font-bold mb-4">Product Details</h1>
        <div className="flex items-center space-x-4 mb-4">
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="border border-gray-300 rounded p-2 w-1/4"
          >
            <option value="">All Products</option>
            <option value="in-stock">In Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>

          <input
            type="text"
            placeholder="Search by Product Code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded p-2 w-1/4"
          />
        </div>

        <div>
          {lowStockProducts.length > 0 && (
            <p className="text-red-600">
              ⚠️ Warning: The following products are running low on stock! IDs: {lowStockProducts.map(product => product.ProductCode).join(', ')}
            </p>
          )}
        </div>

        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">Product Code</th>
              <th className="py-2 px-4">Product Name</th>
              <th className="py-2 px-4">Quality</th>
              <th className="py-2 px-4">Stock Size</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Availability</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.ProductCode}>
                  <td className="py-2 px-4 border">{product.ProductCode}</td>
                  <td className="py-2 px-4 border">{product.ProductName}</td>
                  <td className="py-2 px-4 border">{product.Quality}</td>
                  <td className="py-2 px-4 border">{product.stockSize}</td>
                  <td className="py-2 px-4 border">{product.ProductCategory}</td>
                  <td className="py-2 px-4 border">{product.availability}</td>
                  <td className="py-2 px-4 border">{product.price}</td>
                  <td className="py-2 px-4 border">
                  <button
                       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                       onClick={() => handleEdit(product._id)}
                     >
                       Edit
                     </button>
                     <button
                       className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                       onClick={() => deleteProduct(product._id)}
                     >
                       Delete
                     </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">No products found</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
        <button
             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
             onClick={generateReport}
           >
             Generate Report
           </button>        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;

