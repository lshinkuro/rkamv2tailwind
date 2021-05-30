import React from "react";

type ButtonProps = {
  onClick: any;
  label: string;
  negative?: boolean;
};

const index: React.FC<ButtonProps> = ({ label, negative, ...rest }) => {
  if (negative) {
    return (
      <button
        className="bg-red-600 h-10 hover:bg-red-700 text-white font-md focus:outline-none  py-1 px-4 rounded"
        {...rest}
      >
        {label}
      </button>
    );
  }
  return (
    <button
      className="bg-blue-500 h-10 hover:bg-blue-700 text-white font-md focus:outline-none  py-1 px-4 rounded"
      {...rest}
    >
      {label}
    </button>
  );
};

export default index;
