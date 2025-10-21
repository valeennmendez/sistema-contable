import React from "react";
import { useNavigate } from "react-router-dom";

function AtajoItem({ title, Icon, path }) {
  const navegador = useNavigate();

  return (
    <div>
      <div
        className="flex gap-2 border-1 px-4 py-3 w-full rounded-md border-base-content/20 items-center cursor-pointer"
        onClick={() => navegador(path)}
      >
        <Icon className="bg-base-content/70 rounded-sm text-base-300 size-7 p-1" />
        <span className="font-semibold">{title}</span>
      </div>
    </div>
  );
}

export default AtajoItem;
