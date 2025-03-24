import React, { useEffect } from "react";

function NoMatchPage() {
  useEffect(() => {
    document.title = "No Page Found - eCommerce";
  }, []);
  return <h1 className="text-danger">Page Not Found</h1>;
}

export default NoMatchPage;
