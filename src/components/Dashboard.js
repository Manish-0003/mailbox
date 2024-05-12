import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      Welcome to Expense Tracker App!
      <p>
        Your profile is incomplete!{" "}
        <Link to="/profile">
          <button>complete now!</button>
        </Link>
      </p>
    </div>
  );
}

export default Dashboard;