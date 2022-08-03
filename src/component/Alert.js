import React, { useEffect } from "react";

const Alert = ({ type, msg, remAlert ,list}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      remAlert();
    }, 5000);
    return () => clearTimeout(timeout);
  }, [list]);
  return (
    <div>
      <p className={`alert alert-${type}`}>{msg}</p>
    </div>
  );
};

export default Alert;
