import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentRedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [countdown, setCountdown] = useState(5);
  const [show, setShow] = useState(false);
useEffect(() => {
  const params = new URLSearchParams(location.search);
  const status = params.get("paymentStatus");

  if (status === "success") {
    setShow(true);
    setCountdown(5);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);

          setShow(false); // ✅ CLOSE POPUP
          navigate("/dashboard", { replace: true });

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  } else {
    // ✅ If no success param → ensure popup hidden
    setShow(false);
  }
}, [location]);

  // If no payment success → render nothing
  if (!show) return null;

  return (
    <>
   {
    show && (
        <>
         <div style={styles.overlay}>
      <div style={styles.card}>
        <div style={styles.icon}>✅</div>
        <h2 style={styles.title}>Payment Successful</h2>
        <p style={styles.text}>
          Redirecting to dashboard in <b>{countdown}</b> seconds...
        </p>

        <button
          style={styles.button}
          onClick={() => navigate("/dashboard", { replace: true })}
        >
          Go Now
        </button>
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