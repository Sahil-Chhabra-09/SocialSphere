import React from "react";

function FlexBetween({ style, children, className }) {
  return (
    <div
      className={`flex justify-between items-center ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export default FlexBetween;
