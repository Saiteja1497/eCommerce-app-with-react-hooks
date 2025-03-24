import React, { useEffect, useState } from "react";

let Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard - eCommerce";
  }, []);
  return <div>Dashboard</div>;
};

export default Dashboard;
