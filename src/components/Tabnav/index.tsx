import React, { useState } from "react";

type props = {
  onClick?: any;
  param: any[];
  goFunction?: any;
};

const Tabnav: React.FC<props> = ({ param, goFunction }) => {
  const [Active, setActive] = useState<any>(param[0])
  return (
    <div className="w-full flex flex-row h-12 items-end mt-2">
      {param.map((e: string) => {
        if (e === Active) {
          return (
            <div
              onClick={() => {
                setActive(e)
                goFunction(e)
              }}
              className="mr-1 mb-0 text-white md:font-semibold p-2 bg-blue-500 flex  border-b-2 items-center justify-center cursor-pointer"
            >
              {e}
            </div>
          );
        }
        return (
          <div
            onClick={() => {
              setActive(e)
              goFunction(e)
            }}
            className="mr-1 mb-0   md:font-semibold p-2  flex border-b-2 b items-center justify-center cursor-pointer"
          >
            {e}
          </div>
        );
      })}
    </div>
  );
};

export default Tabnav;
