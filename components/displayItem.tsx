import React from "react";

type props = {
  title: string;
  value?: string | number;
  color?: string;
};

export default function displaytItem({ title, value,color }: props) : React.ReactElement{
  return (
    <div className="flex space-x-2">
      <p className="text-xl font-semibold">{title} : </p>
      <p className={color?`${color}`: "text-lg"}>{value || "-"}</p>
    </div>
  );
}
