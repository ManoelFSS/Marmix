"use client";

import { useState } from "react";
// components 
import CardBag from "../CardBag/idex";
//icons 
import { AiFillCloseSquare } from "react-icons/ai";
import { GiShoppingBag } from "react-icons/gi";
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
      className={`
      absolute top-0 right-0 z-50 h-full bg-white border border-gray-300 
      rounded-lg shadow-2xs transition-all duration-300 ease-in-out

      ${closeBag ? "w-full translate-x-0 opacity-100" : "w-0 translate-x-full opacity-0 hidden"}
    `}
    >
      <div>
        <div
          className="flex items-center justify-between px-6 py-2 border-b
         border-gray-300 
         "
        >
          <div
            className={`relative ${
              bag.length > 0 ? "text-green-800 " : ""
            }`}
          >
            <GiShoppingBag className={`text-[3rem]`} />
            <span
              className={`text-[1.3rem] text-white absolute top-3 right-4.5 z-20 `}
            >
              {bag.reduce((acc, item) => acc + item.count, 0)}
            </span>
          </div>
          <AiFillCloseSquare
            onClick={() => {
              setCloseBag(false);
            }}
            className="text-red-600 text-[2rem]"
          />
        </div>
        <CardBag />
      </div>
    </aside>
  );
}