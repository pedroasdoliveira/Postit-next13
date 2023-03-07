"use client";

import { Dispatch } from "react";

type ToggleProps = {
  deletePost: () => void;
  setToggle: Dispatch<boolean>;
};

const Toggle = ({ deletePost, setToggle }: ToggleProps) => {
  return (
    <section
      onClick={() => setToggle(true)}
      className="fixed bg-black/50 w-full h-full z-20 left-0 top-0"
    >
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <h2 className="text-xl">Você quer deletar esse Post?</h2>
        <button
          className="bg-red-600 text-sm text-white py-2 px-4 rounded-md"
          onClick={() => deletePost()}
        >
          Deletar
        </button>
      </div>
    </section>
  );
};

export default Toggle;
