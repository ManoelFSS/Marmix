"use client";
import { useState, useEffect } from "react";
import { menuItems } from "@/app/(pedidos)/cardapio/data";
import { GiShoppingBag } from "react-icons/gi";
// stores
import { useBagStore } from "@/stores/bagStore";
import { useBagState } from "@/stores/bagState";

import { v4 as uuidv4 } from "uuid";


export default function Cardapio() {
  const setCloseBag = useBagState((state) => state.setCloseBag);
  const addToBag = useBagStore((state) => state.addToBag);
  const bag = useBagStore((state) => state.bag);

  const [marmitaItens, setMarmitaItens] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sacola, setSacola] = useState([]);
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(1);

 
  const handleAddItem = (item) => {
    const category = item.category;

    const exists = marmitaItens.find((i) => i.id === item.id);

    // Se já existe → REMOVE
    if (exists) {
      setMarmitaItens((prev) => prev.filter((i) => i.id !== item.id));
      setSelectedItems((prev) => prev.filter((name) => name !== item.name));
      return;
    }

    const categoryLimits = {
      "Feijão": 1,
      "Macarrão": 1,
      "Salada Crua": 1,
      "Salada Cozida": 1,
      "Carnes": 2,
      "Arroz": 1,
    };

    const count = marmitaItens.filter((i) => i.category === category).length;
    const limit = categoryLimits[category] || 999;

    if (count >= limit) {
      alert(`Você só pode adicionar ${limit} item(s) da categoria ${category}`);
      return;
    }

    // adiciona item no estado geral
    setMarmitaItens((prev) => [...prev, item]);
    // marca o checkbox
    setSelectedItems((prev) => [...prev, item.name]);
  };

  const handleSacola = () => {
    if (price === 0) return console.log("Nenhuma valor selecionado");

    addToBag((prev) => [
      ...prev,
      {
        itens: [...marmitaItens],
        count,
        price,
        valorTotal: price * count,
        id: uuidv4(),
      },
    ]);
    setMarmitaItens([]);
    setSelectedItems([]);
    setPrice(0);
    setCount(1);
  };

  useEffect(() => {
    console.log("bag", bag);
    console.log("marmitaItens", marmitaItens);

  }, [marmitaItens, bag]);

  return (
    <section className="relative flex flex-col w-full h-full justify-between bg-white rounded-xl shadow-lg ">
      <div
        className=" relative flex justify-center items-center h-70 sm:h-80       lg:h-82  2xl:h-100
          rounded-xl   shadow-lg bg-gradient-to-r from-orange-700 to-orange-500 
       "
      >
        <div
          className={`relative transition duration-500 ${
            price === 15 ? "scale-110" : ""
          } flex justify-center items-center relative`}
        >
          {/* imagem base */}
          <img
            src="/mix.png"
            alt="Restaurante"
            className=" w-[250px] xs:w-[270px] sm:w-[320px] lg:w-[350px] lg:h-[320px]  2xl:w-[400px] 2xl:h-[400px] "
          />
          {marmitaItens.map((item, index) => (
            <img
              key={item.id}
              src={item.image}
              alt={item.name}
              style={{ zIndex: item.zIndex }} // controla quem fica por cima
              className="
                absolute rounded-full
                w-[180px] h-[180px]
                xs:w-[200px] xs:h-[200px]
                sm:w-[240px] sm:h-[240px]
                lg:w-[260px] lg:h-[240px]
                2xl:w-[310px] 2xl:h-[310px]
              "
            />
          ))}
        </div>

        <div
          onClick={() => setCloseBag(true)}
          className="flex flex-col  items-center text-black text-[1.5rem] px-5 py-1 pb-3  absolute  right-0 bottom-0  "
        >
          <div
            className={`relative ${
              bag.length > 0 ? "text-green-800 animate-bounce" : ""
            }`}
          >
            <GiShoppingBag className={`text-[3.5rem] sm:text-[5rem]`} />
            <span
              className={`text-[1.3rem] text-white absolute 
                top-4 right-4 sm:top-8 sm:right-8
              `}
            >
              {bag?.reduce((acc, item) => acc + item.count, 0) > 0 &&
              bag?.reduce((acc, item) => acc + item.count, 0) <= 9
                ? "0" + bag?.reduce((acc, item) => acc + item.count, 0)
                : bag?.reduce((acc, item) => acc + item.count, 0)}
            </span>
          </div>
          <p className={`text-[1rem] text-white font-medium`}>
            {bag
              ?.reduce((acc, item) => acc + item.valorTotal, 0)
              .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
        </div>
      </div>
      <div className="bg-white p-1 border-b border-gray-400">
        <p className="text-black text-center text-[1.2rem] font-bold ">
          Escolha o Valor
        </p>
        <div className="flex gap-10 p-1 justify-center text-[1rem]">
          <button
            onClick={() => setPrice(10)}
            className={`rounded-[5px] px-5 py-1 border  border-black text-black
              ${
                price === 10
                  ? "bg-orange-500 text-white border-0"
                  : "bg-white text-black"
              }
            `}
          >
            R$ 10,00
          </button>
          <button
            onClick={() => setPrice(15)}
            className={`rounded-[8px] px-5 py-1 border  border-black text-black
              ${
                price === 15
                  ? "bg-orange-500 text-white border-0"
                  : "bg-white text-black"
              }
            `}
          >
            R$ 15,00
          </button>
        </div>
      </div>
      <div className=" bg-white p-2 pt-1 pb-2 ">
        <div className="flex gap-5 ">
          <p className="text-black text-[1.1rem] font-bold">Cardápio</p>
          <p className="text-black text-[1rem] pb-2">
            Monte sua marmita a baixo
          </p>
        </div>

        <section
          className=" flex flex-wrap gap-1  p-1  overflow-auto custom-scroll overflow-y-scroll
          border border-amber-600 justify-center items-center  
          h-[180px] x:h-[170px] xxs:h-[200px] sm:h-[170px] lg:h-[150px] 2xl:h-[200px]  
          rounded-lg 
         "
        >
          {menuItems.map((item, index) => (
            <div
              onClick={() => handleAddItem(item)}
              key={index}
              className="h-7 mb-1 flex  gap-1 pl-1  bg-zinc-100 w-[160px]
              
               items-center  "
            >
              <input
                className="h-4 w-4"
                type="checkbox"
                id={item.name}
                checked={selectedItems.includes(item.name)}
                readOnly
              />
              <label
                onClick={(e) => e.stopPropagation()}
                className="text-black text-[0.9rem]"
                htmlFor={item.name}
              >
                {item.name}
              </label>
            </div>
          ))}
        </section>
      </div>

      <div className="bg-white flex gap-20 items-center justify-end p-1 pr-15 border-t-2">
        <div className=" flex gap-5 items-center pr-2">
          <p className="text-black text-[1.3rem] font-bold">Total</p>
          <p className="text-black text-[1.3rem]">
            {(count * price).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-700 to-orange-500  flex items-center justify-center gap-1 ">
        <div className="pl-2 pt-2 pb-2">
          <button
            onClick={() => handleSacola()}
            className="font-bold text-[1rem] rounded-[5px] text-black px-3 py-2 bg-white"
          >
            Adicionar a Sacola
          </button>
        </div>
        <div className=" flex gap-2 justify-center items-center text-white pl-5 pr-5">
          <p
            onClick={() => setCount(count === 1 ? 1 : count - 1)}
            className="rounded-[5px] flex justify-center items-center text-[2rem] font-bold border  w-8 h-8 pb-2  "
          >
            -
          </p>
          <p className="text-[1.5rem] font-bold flex justify-center items-center w-[60px] ">
            {count}
          </p>
          <p
            onClick={() => setCount(count + 1)}
            className="rounded-[5px] flex justify-center items-center text-[2rem] font-bold  border w-8 h-8 pb-1  "
          >
            +
          </p>
        </div>
      </div>
    </section>
  );
}
