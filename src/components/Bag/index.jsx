"use client";

import { useState } from "react";
// components 
import CardBag from "../CardBag/idex";
//icons 
import { AiFillCloseSquare } from "react-icons/ai";
import { GiShoppingBag } from "react-icons/gi";
import { TbBikeFilled } from "react-icons/tb";
//stores
import { useBagStore } from "@/stores/bagStore";
import { useBagState } from "@/stores/bagState";



export default function Bag() {
  const closeBag = useBagState((state) => state.closeBag);
  const setCloseBag = useBagState((state) => state.setCloseBag);

  const bag = useBagStore((state) => state.bag);
  console.log(bag.length);

  return (
    <aside
      className={`overflow-hidden h-[100svh]   flex flex-col justify-between border border-amber-500
      absolute top-0  right-0 z-50  bg-zinc-300
      rounded-lg shadow-2xs transition-all duration-400 ease-in-out
      ${closeBag ? "w-full xs:w-[420px]  opacity-100" : "w-0  opacity-0"}
    `}
    >
      <div
        className="relative flex  items-center justify-between px-6 py-2 border-b
         border-gray-300 
         "
      >
        <div
          className={`relative  flex items-center gap-2 ${
            bag.length > 0 ? "text-green-800 " : ""
          }`}
        >
          <GiShoppingBag className={`text-[3.5rem] text-black`} />
          <span
            className={`text-[1.3rem] text-white absolute  
                ${bag.length > 0 ? "top-4 left-4.5" : "top-4 left-5.5"}
              `}
          >
            {bag.reduce((acc, item) => acc + item.count, 0) <= 9 &&
            bag.reduce((acc, item) => acc + item.count, 0) > 0
              ? "0" + bag.reduce((acc, item) => acc + item.count, 0)
              : bag.reduce((acc, item) => acc + item.count, 0)}
          </span>
          <p className="text-black text-[1.5rem]">
            {bag.length === 0
              ? "Sacola Vazia"
              : bag.reduce((acc, item) => acc + item.count, 0) === 1
              ? "Pedido"
              : "Pedidos"}
          </p>
        </div>
        <AiFillCloseSquare
          onClick={() => {
            setCloseBag(false);
          }}
          className="text-red-600 text-[2rem] cursor-pointer hover:text-red-800 transition-all duration-300 ease-in-out "
        />
      </div>

      <section
        className="p-2 h-full  overflow-auto bg-white
          custom-scroll overflow-y-scroll
        "
      >
        {bag.map((pedido) => (
          <CardBag bag={bag} key={pedido.id} pedido={pedido} />
        ))}
      </section>

      <div>
        <div
          className="bg-white p-2 border-t-2 border-gray-200 flex gap-2 items-center 
            pl-2 
          "
        >
          <p className="text-black text-[1.4rem] font-bold ">Total</p>
          <p className="text-amber-600 text-[1.4rem] font-bold  ">
            {bag
              .reduce((acc, item) => acc + item.valorTotal, 0)
              .toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
          </p>
        </div>
        <div className="h-20  flex gap-2  justify-center items-center">
          <button
            className=" flex items-center border-2 border-orange-500  bg-gradient-to-r from-orange-700 to-orange-500 
            hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-700 
            transition-all duration-300 ease-in-out text-white text-[1.2rem] p-3
            pl-4 pr-4  rounded
            "
          >
            <TbBikeFilled className="text-[1.5rem] mr-3" />
            Pedir delivery
          </button>

          <button
            className="text-white bg-zinc-700 border-1 border-black font-medium 
             transition-all duration-300 ease-in-out text-[1.2rem] p-3 pl-4 pr-4 
             rounded
             "
          >
            Retirar no local
          </button>
        </div>
      </div>
    </aside>
  );
}