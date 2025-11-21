"use client";
import { useEffect } from "react";
import { useBagStore } from "@/stores/bagStore";
import { MdDeleteForever } from "react-icons/md";


export default function CardBag({ pedido }) {

  const addToBag = useBagStore((state) => state.addToBag);
  const bag = useBagStore((state) => state.bag);

  useEffect(() => {
    console.log("item do pedido", pedido);
    console.log("Bag:", bag);
  }, [bag]);
  

  const handlePlusItem = (id) => {
    const newBag = bag.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          count: item.count + 1,
          valorTotal: item.price * (item.count + 1),
        };
      }

      return item;
    });

    if (newBag.length > 0) {
      addToBag(newBag);
    }

  };

   const handleCloseItem = (id) => {
     const newBag = bag.map((item) => {
       if (item.id === id && item.count > 1) {
         return {
           ...item,
           count: item.count - 1,
           valorTotal: item.price * (item.count - 1),
         };
       }

       return item;
     });

     if (newBag.length > 0) {
       addToBag(newBag);
     }
   };

  return (
    <section className="flex bg-gray-100  py-1 rounded-lg shadow-md mb-3 ">
      <div className=" min-w-[130px]  flex flex-col items-center justify-center relative border-r border-gray-400  ">
        {/* Imagem base */}
        <img
          src="/mix.png"
          alt="Restaurante"
          className=" w-[110px] h-[110px]"
        />
        {/* Itens escolhidos pelo usuário */}
        {pedido.itens.map((item, index) => (
          <img
            key={item.id}
            src={item.image}
            alt={item.name}
            style={{ zIndex: item.zIndex }}
            className={`top-5 left-7 absolute rounded-full w-[74px] h-[74px]`}
          />
        ))}
        <div className="text-center">
          <div>
            <p className="text-black text-[0.9rem]">Preço Unitário</p>
            <p className="text-black text-[0.9rem]">
              {pedido.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
          <div className="flex gap-2 py-2">
            <p className="text-black font-bold">Total</p>
            <p className=" text-black text-orange-600 font-bold ">
              {pedido.valorTotal?.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
        </div>
      </div>
      <div className="flex  flex-wrap items-center  flex-1 justify-between pl-2">
        <ul className=" text-black w-full  ">
          {pedido.itens.map((item) => (
            <li key={item.id} className=" font-bold text-[1.1rem] ml-1 ">
              {item.category === "Carnes" && item.name}
            </li>
          ))}
        </ul>
        <ul className=" text-black h-27 pt-4 w-full ">
          {pedido.itens.map((item) => (
            <li key={item.id} className="text-[0.8rem] inline-block ml-1.5">
              {item.category !== "Carnes" && item.name + ","}
            </li>
          ))}
        </ul>
        <div className="relativeh-10 flex gap-2 justify-center  items-center text-black pl-2 pr-2 w-full  ">
          <div className="flex ">
            <p
              onClick={() => handleCloseItem(pedido.id)}
              className="rounded-[5px] flex justify-center items-center text-[2rem] font-bold border  w-8 h-8 pb-2  "
            >
              -
            </p>
            <p className="text-[1.5rem] font-bold flex justify-center items-center w-[60px] ">
              {pedido.count}
            </p>
            <p
              onClick={() => handlePlusItem(pedido.id)}
              className="rounded-[5px] flex justify-center items-center text-[2rem] font-bold  border w-8 h-8 pb-1  "
            >
              +
            </p>
          </div>
          <MdDeleteForever
            onClick={() => {
              const newBag = bag.filter((item) => item.id !== pedido.id);
              addToBag(newBag);
            }}
            className="xxs:absolute  right-3 text-[2rem] text-red-500  hover:text-red-800 transition-all duration-300 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
}
