"use client";
import { useState, useEffect } from "react";
import { menuItems } from "@/app/(pedidos)/cardapio/data";
import { GiShoppingBag } from "react-icons/gi";
// stores
import { useBagStore } from "@/stores/bagStore";
import { useBagState } from "@/stores/bagState";

import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";

import LocationModal from "@/components/LocationModal";




export default function Cardapio() {
  const setCloseBag = useBagState((state) => state.setCloseBag);
  const addToBag = useBagStore((state) => state.addToBag);
  const bag = useBagStore((state) => state.bag);

  const [marmitaItens, setMarmitaItens] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(1);

  const [slotImage01, setSlotImage01] = useState("");
  const [slotImage02, setSlotImage02] = useState("");

  

  const handleAddItem = (item) => {
    const categories = Array.isArray(item.category)
      ? item.category
      : [item.category];

    const exists = marmitaItens.find((i) => i.id === item.id);

    // Se já existe, remove
    if (exists) {
      setMarmitaItens((prev) => prev.filter((i) => i.id !== item.id));
      setSelectedItems((prev) => prev.filter((name) => name !== item.name));
      return;
    }

    const categoryLimits = {
      "Feijão": 1,
      "Arroz": 1,
      "Macarrão": 1,
      "Salada Crua": 1,
      "Salada Cozida": 1,
      "Carnes": 2,
    };

    // 🔥 Verifica TODAS as categorias do item
    for (const category of categories) {
      const limit = categoryLimits[category] || 999;
      const countInCategory = marmitaItens.filter((i) => {
        const cat = Array.isArray(i.category) ? i.category : [i.category];
        return cat.includes(category);
      }).length;

      if (countInCategory >= limit) {
        return toast.error(
          `Você só pode ter ${limit} item da categoria ${category}`,
          { duration: 4000 }
        );
      }
    }

    // Se passou por todas as validações, adiciona
    setMarmitaItens((prev) => [...prev, item]);
    setSelectedItems((prev) => [...prev, item.name]);
  };


  const handleSacola = () => {
    if( marmitaItens.length <= 2 ) return toast.error("Por favor, escolha no minimo 3 itens do cardápio para o Marmitex.", { duration: 6000 });

    if (price === 0) return toast.error("Por favor, escolha um valor para a Marmitex.", { duration: 4000 });

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
    toast.success("Marmitex adicionada à sacola!", { duration: 4000 });
  };

  useEffect(() => {
    console.log("bag", bag);
    console.log("marmitaItens", marmitaItens);

    const getCarnes = marmitaItens.filter((i) => i.category.includes("Carnes"));
   
    if (getCarnes) {
      setSlotImage01(getCarnes[0] || {});
      setSlotImage02(getCarnes[1] || {});
    }

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
            className=" w-[250px] xs:w-[270px] sm:w-[320px] lg:w-[325px] lg:h-[320px]  2xl:w-[400px] 2xl:h-[400px] "
          />
          {marmitaItens
            .filter((item) => !item.category.includes("Carnes"))
            .map((item, index) => (
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

          <img
            src={slotImage01.image}
            alt=""
            className="absolute rounded-full
            w-[120px] h-[120px]
            xs:w-[120px] xs:h-[120px]
            sm:w-[150px] sm:h-[150px]
            lg:w-[150px] lg:h-[150px]
            2xl:w-[200px] 2xl:h-[200px]
            z-90
            top-6  sm:top-5
            mr-20
            "
          />
          <img
            src={slotImage02.image}
            alt=""
            className="absolute rounded-full
            w-[120px] h-[120px]
            xs:w-[120px] xs:h-[120px]
            sm:w-[150px] sm:h-[150px]
            lg:w-[150px] lg:h-[150px]
            2xl:w-[200px] 2xl:h-[200px]
            z-90
             top-19  md:top-25 2xl:top-34
             mr-15
            "
          />
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
                 sm:top-8 sm:right-8
                ${bag.length > 0 ? "top-4 right-4" : "top-4 right-5.5"}
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
          h-[130px] x:h-[100px] xxs:h-[180px] sm:h-[170px] lg:h-[150px] 2xl:h-[200px]  
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
      <LocationModal />
      
    </section>
  );
}
