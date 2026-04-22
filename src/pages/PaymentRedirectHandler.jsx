import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { downloadInvoicePdf } from "../auth/apiservice";
const PaymentRedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("paymentStatus");

    if (status === "success") {
      setShow(true);



    } else {
      // ✅ If no success param → ensure popup hidden
      setShow(false);
    }
  }, [location]);

  if (!show) return null;

  return (
    <>
      {
        show && (
          <>
            <div style={styles.overlay}>
              <div style={styles.card}>
                <div style={styles.icon}>✅</div>
                <p style={styles.text}>
                  Payment Successful!
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>

                  <button
                    style={{ ...styles.button, background: "#999" }}
                    onClick={() => setShow(false)}
                  >
                    Cancel
                  </button>

                  <button
                    style={styles.button}
                    onClick={async () => {
                      const params = new URLSearchParams(location.search);
                      const invoiceNo = params.get("invoiceNo"); // URL se lena hoga
                      const deviceId = params.get("deviceId");   // URL se lena hoga

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
                        alert("Download failed");
                      }
                    }}
                  >
                    Download
                  </button>

                </div>
              </div>
            </div>
          </>
        )
      }
    </>
  );
};


const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    width: "320px",
  },
  icon: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  title: {
    marginBottom: "10px",
  },
  text: {
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default PaymentRedirectHandler;