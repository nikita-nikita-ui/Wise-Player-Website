import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { downloadInvoicePdf } from "../auth/apiservice";
const PaymentRedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [params, setParams] = useState(new URLSearchParams(location.search));

  useEffect(() => {
    const currentParams = new URLSearchParams(location.search);
    const status = currentParams.get("paymentStatus");

    if (status === "success") {
      setParams(currentParams);
      setShow(true);
    }
    // Note: We don't hide it automatically if status is missing to allow URL cleaning 
    // from other components like PurchaseCredit.jsx
  }, [location]);

  if (!show) return null;

  const invoiceNo = params.get("invoiceNo");
  const deviceId = params.get("deviceId");
  const isCreditPurchase = location.pathname.includes("purchase-credit");

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <div style={styles.icon}>✅</div>
        <h3 style={styles.title}>Success!</h3>
        <p style={styles.text}>
          {isCreditPurchase 
            ? "Credits have been added to your account successfully." 
            : "Payment Successful!"}
        </p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          
          {invoiceNo && (
            <button
              style={styles.button}
              onClick={async () => {
                const res = await downloadInvoicePdf(deviceId, invoiceNo);
                if (res.success) {
                  const url = window.URL.createObjectURL(new Blob([res.data]));
                  const link = document.createElement("a");
                  link.href = url;
                  link.setAttribute("download", `invoice_${invoiceNo}.pdf`);
                  document.body.appendChild(link);
                  link.click();
                  link.remove();
                } else {
                  alert("Download failed. Please try from dashboard.");
                }
              }}
            >
              Download Invoice
            </button>
          )}

          {/* <button
            style={{ ...styles.button, background: "#374151" }}
            onClick={() => {
              setShow(false);
              navigate("/dashboard");
            }}
          >
            Go to Dashboard
          </button> */}

          <button
            style={{ ...styles.button, background: "#999", padding: "8px" }}
            onClick={() => setShow(false)}
          >
            Close
          </button>

        </div>
      </div>
    </div>
  );
};


const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000,
    backdropFilter: "blur(4px)",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "20px",
    textAlign: "center",
    width: "350px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  icon: {
    fontSize: "50px",
    marginBottom: "15px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#111827",
  },
  text: {
    fontSize: "16px",
    color: "#4b5563",
    marginBottom: "25px",
    lineHeight: "1.5",
  },
  button: {
    padding: "12px 20px",
    background: "#059669",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "background 0.2s",
  },
};

export default PaymentRedirectHandler;




// import { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { downloadInvoicePdf } from "../auth/apiservice";

// const PaymentRedirectHandler = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [show, setShow] = useState(false);
//   const [params, setParams] = useState(new URLSearchParams(location.search));

//   useEffect(() => {
//     const currentParams = new URLSearchParams(location.search);
//     const status = currentParams.get("paymentStatus");

//     if (status === "success") {
//       setParams(currentParams);
//       setShow(true);
//     }
//   }, [location]);

//   if (!show) return null;

//   const invoiceNo = params.get("invoiceNo");
//   const deviceId = params.get("deviceId");
//   const isCreditPurchase = location.pathname.includes("purchase-credit");

//   return (
//     <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">

//       <div className="w-full max-w-md bg-white rounded-2xl p-8 text-center shadow-2xl">

//         {/* ICON */}
//         <div className="text-5xl mb-4">✅</div>

//         {/* TITLE */}
//         <h3 className="text-2xl font-bold text-gray-900 mb-2">
//           Success!
//         </h3>

//         {/* TEXT */}
//         <p className="text-gray-600 mb-6 leading-relaxed">
//           {isCreditPurchase
//             ? "Credits have been added to your account successfully."
//             : "Payment Successful!"}
//         </p>

//         {/* BUTTONS */}
//         <div className="flex flex-col gap-3">

//           {invoiceNo && (
//             <button
//               onClick={async () => {
//                 const res = await downloadInvoicePdf(deviceId, invoiceNo);
//                 if (res.success) {
//                   const url = window.URL.createObjectURL(new Blob([res.data]));
//                   const link = document.createElement("a");
//                   link.href = url;
//                   link.setAttribute("download", `invoice_${invoiceNo}.pdf`);
//                   document.body.appendChild(link);
//                   link.click();
//                   link.remove();
//                 } else {
//                   alert("Download failed. Please try from dashboard.");
//                 }
//               }}
//               className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition"
//             >
//               Download Invoice
//             </button>
//           )}

//           <button
//             onClick={() => {
//               setShow(false);
//               navigate("/dashboard");
//             }}
//             className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-semibold transition"
//           >
//             Go to Dashboard
//           </button>

//           <button
//             onClick={() => setShow(false)}
//             className="w-full text-gray-500 hover:text-gray-700 text-sm font-medium py-2 transition"
//           >
//             Close
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentRedirectHandler;