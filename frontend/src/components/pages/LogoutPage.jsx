import React from "react";
import "./auth.css";

const LogoutPage = () => {
  return (
    <div className="auth">
      <div className="logout-info">
        <p>
          Thank you for using our services! You are now <span>logged out</span>.
          Remember, your journey doesn't end here. Stay curious, explore, and
          embrace new experiences. Until we meet again, take care and{" "}
          <span>stay safe</span>!
        </p>
      </div>
    </div>
  );
};

export default LogoutPage;
