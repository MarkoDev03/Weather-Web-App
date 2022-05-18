import React from "react";
import "./home.css";

function Block({ icon, text, value, valuetype}) {
  return (
    <div className="block">
      <div className="d-flex justify-content-center align-items-center">
        {icon}
        <span className="txt">{text}</span>
      </div>
      <span>{value} {valuetype}</span>
    </div>
  );
}

export default Block;
