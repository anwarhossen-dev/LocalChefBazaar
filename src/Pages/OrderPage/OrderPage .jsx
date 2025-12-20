


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import AppLoading from "../../Components/Shared/AppLoading";
// import { FaReceipt } from "react-icons/fa";

// const OrderPage = () => {
//   const { id } = useParams();
//   const axiosSecure = useAxiosSecure();

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const res = await axiosSecure.get(`/orders/${id}`);
//         setOrder(res.data);
//       } catch (err) {
//         setError(err.response?.data?.message || "Order not found");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [id, axiosSecure]);

//   if (loading) return <AppLoading />;
//   if (error)
//     return <p className="text-center text-red-600 mt-10">{error}</p>;

//   const total = order.price * order.quantity;

//   return (
//     <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 border">
      
//       {/* Header */}
//       <div className="flex items-center justify-between border-b pb-4 mb-4">
//         <div className="flex items-center gap-2">
//           <FaReceipt className="text-2xl text-blue-600" />
//           <h2 className="text-2xl font-bold">Invoice</h2>
//         </div>
//         <span className="text-sm text-gray-500">
//           Order ID: <b>{order._id}</b>
//         </span>
//       </div>

//       {/* Info Section */}
//       <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
//         <p><b>Chef:</b> {order.chefName}</p>
//         <p><b>Status:</b> 
//           <span className="ml-2 px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs">
//             {order.orderStatus}
//           </span>
//         </p>
//         <p><b>Payment:</b> 
//           <span className={`ml-2 px-2 py-1 rounded text-xs ${
//             order.paymentStatus === "paid"
//               ? "bg-green-100 text-green-700"
//               : "bg-red-100 text-red-700"
//           }`}>
//             {order.paymentStatus}
//           </span>
//         </p>
//         <p><b>Date:</b> {new Date(order.createdAt).toLocaleDateString()}</p>
//       </div>

//       {/* Table */}
//       <div className="border rounded-lg overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="text-left p-3">Meal</th>
//               <th className="text-center p-3">Qty</th>
//               <th className="text-right p-3">Price</th>
//               <th className="text-right p-3">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="border-t">
//               <td className="p-3">{order.mealName}</td>
//               <td className="p-3 text-center">{order.quantity}</td>
//               <td className="p-3 text-right">${order.price}</td>
//               <td className="p-3 text-right font-semibold">
//                 ${total}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Summary */}
//       <div className="flex justify-end mt-6">
//         <div className="w-64 text-sm">
//           <div className="flex justify-between mb-2">
//             <span>Subtotal</span>
//             <span>${total}</span>
//           </div>
//           <div className="flex justify-between mb-2">
//             <span>Delivery</span>
//             <span>$0</span>
//           </div>
//           <div className="flex justify-between font-bold text-lg border-t pt-2">
//             <span>Total</span>
//             <span>${total}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderPage;


import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AppLoading from "../../Components/Shared/AppLoading";
import { FaReceipt, FaFilePdf, FaFileExcel } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const OrderPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const invoiceRef = useRef(); // For PDF capture

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosSecure.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Order not found");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id, axiosSecure]);

  if (loading) return <AppLoading />;
  if (error)
    return <p className="text-center text-red-600 mt-10">{error}</p>;

  const total = order.price * order.quantity;

  // -------------------- PDF --------------------
  const handleDownloadPDF = () => {
    const input = invoiceRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Invoice_${order._id}.pdf`);
    });
  };

  // -------------------- Excel --------------------
  const handleDownloadExcel = () => {
    const wsData = [
      ["Order ID", order._id],
      ["Chef", order.chefName],
      ["Status", order.orderStatus],
      ["Payment", order.paymentStatus],
      ["Date", new Date(order.createdAt).toLocaleDateString()],
      [],
      ["Meal", "Quantity", "Price", "Total"],
      [order.mealName, order.quantity, order.price, total],
      [],
      ["Subtotal", total],
      ["Delivery", 0],
      ["Total", total],
    ];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Invoice");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buf], { type: "application/octet-stream" }), `Invoice_${order._id}.xlsx`);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 border mb-15">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <div className="flex items-center gap-2">
          <FaReceipt className="text-2xl text-blue-600" />
          <h2 className="text-2xl font-bold">Invoice</h2>
        </div>
        <span className="text-sm text-gray-500">
          Order ID: <b>{order._id}</b>
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          <FaFilePdf /> Download PDF
        </button>
        <button
          onClick={handleDownloadExcel}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          <FaFileExcel /> Download Excel
        </button>
      </div>

      {/* Invoice Card */}
      <div ref={invoiceRef} className="p-4 border rounded">
        {/* Info Section */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <p><b>Chef:</b> {order.chefName}</p>
          <p><b>Status:</b>
            <span className="ml-2 px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs">
              {order.orderStatus}
            </span>
          </p>
          <p><b>Payment:</b>
            <span className={`ml-2 px-2 py-1 rounded text-xs ${
              order.paymentStatus === "paid"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}>
              {order.paymentStatus}
            </span>
          </p>
          <p><b>Date:</b> {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3">Meal</th>
                <th className="text-center p-3">Qty</th>
                <th className="text-right p-3">Price</th>
                <th className="text-right p-3">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3">{order.mealName}</td>
                <td className="p-3 text-center">{order.quantity}</td>
                <td className="p-3 text-right">${order.price}</td>
                <td className="p-3 text-right font-semibold">${total}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="flex justify-end mt-6">
          <div className="w-64 text-sm">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery</span>
              <span>$0</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
