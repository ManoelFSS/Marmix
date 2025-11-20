"use client";
import {useState, useEffect} from "react";
import { menuItems } from "@/app/(pedidos)/cardapio/data";
import { GiShoppingBag } from "react-icons/gi";
// stores
import { useBagStore } from "@/stores/bagStore";
import { useBagState } from "@/stores/bagState";

export default function Cardapio() {
  const setCloseBag = useBagState((state) => state.setCloseBag);
  const addToBag = useBagStore((state) => state.addToBag);
  const [marmitaItens, setMarmitaItens] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sacola, setSacola] = useState([]);
  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(1);

  const arrozImage = marmitaItens.find(
    (item) =>
      item.category === "Arroz"
  )?.image;

  const feijaoImage = marmitaItens.find(
    (item) => item.category === "Feijão"
  )?.image;

  const macarraoImage = marmitaItens.find(
    (item) => item.category === "Macarrão"
  )?.image;



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
   if(price === 0) return console.log("Nenhuma valor selecionado");

    setSacola((prev) => [
      ...prev,
      {
        itens: [...marmitaItens],
        count,
        price,
        valorTotal: price * count,
        id: Date.now(),
      },
    ]);
    setMarmitaItens([]);
    setSelectedItems([]);
    setPrice(0);
    setCount(1);
 }  



  useEffect(() => {
    addToBag(sacola);
    console.log(marmitaItens);
    console.log(sacola);
  }, [marmitaItens, sacola]);

   return (
     <section className=" flex flex-col h-full w-full justify-between bg-white rounded-xl shadow-lg ">
       <div
         className="relative flex justify-center items-center h-70 sm:h-105 2xl:h-120
         w-full rounded-xl   shadow-lg bg-gradient-to-r from-orange-700 to-orange-500 
       "
       >
         <div
           className={`transition duration-500 ${
             price === 15 ? "scale-115" : ""
           } flex justify-center items-center relative`}
         >
           {/* imagem base */}
           <img
             src="/mix.png"
             alt="Restaurante"
             className=" w-[250px] xs:w-[270px] sm:w-[400px]   2xl:w-[450px] 2xl:h-[450px] "
           />
           <img
             className="absolute rounded-full w-[180px] h-[180px]
             xs:w-[200px] xs:h-[200px]
             sm:w-[300px] sm:h-[300px] 2xl:w-[330px] 2xl:h-[330px]
             "
             src={arrozImage}
             alt="#"
           />
           <img
             className="absolute rounded-full w-[180px] h-[180px]
             xs:w-[200px] xs:h-[200px]
             sm:w-[300px] sm:h-[300px] 2xl:w-[330px] 2xl:h-[330px]
             "
             src={feijaoImage}
             alt="#"
           />
           <img
             className="absolute bottom-0 rotate-12 rounded-full w-[140px] h-[140px] 
             xs:w-[150px] xs:h-[150px]
             sm:w-[250px] sm:h-[250px] 2xl:w-[300px] 2xl:h-[300px]
             "
             src={macarraoImage}
             alt="#"
           />
         </div>

         <div onClick={()=> setCloseBag(true)} className="flex flex-col  items-center text-black text-[1.5rem] px-5 py-1 pb-3  absolute right-0 bottom-0  ">
           <div
             className={`relative ${
               sacola.length > 0 ? "text-green-800 animate-bounce" : ""
             }`}
           >
             <GiShoppingBag className={`text-[3rem]`} />
             <span
               className={`text-[1.3rem] text-white absolute top-3 right-4.5 `}
             >
               {sacola.reduce((acc, item) => acc + item.count, 0)}
             </span>
           </div>
           <p className={`text-[1rem] text-white font-medium`}>
             {sacola.reduce((acc, item) => acc + item.valorTotal, 0).toLocaleString("pt-BR",{ style: "currency",currency: "BRL",}
             )}
           </p>
         </div>
       </div>
       <div className="bg-white p-1 border-b border-gray-400">
         <p className="text-black text-center text-[1.2rem] font-bold ">
           Escolha o Valor
         </p>
         <div className="flex gap-4 p-1 justify-between text-[1rem]">
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
         <div className="flex gap-10 ">
           <p className="text-black text-[1.1rem] font-bold">Cardápio</p>
           <p className="text-black text-[1rem] pb-2">
             Monte sua marmita a baixo
           </p>
         </div>

         <section
           className=" flex flex-wrap gap-1 h-[150px] 2xl:h-[100px]  w-full p-1  overflow-auto 
            rounded-lg 
         "
         >
           {menuItems.map((item, index) => (
             <div
               onClick={() => handleAddItem(item)}
               key={index}
               className="h-7 mb-1 flex  gap-1 pl-1  bg-zinc-100 w-[160px] items-center  "
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

       <div className="bg-gradient-to-r from-orange-700 to-orange-500  flex items-center  ">
         <div className="pl-2 pt-2 pb-2">
           <button
             onClick={() => handleSacola()}
             className="font-bold text-[1rem] rounded-[5px] text-black px-3 py-2 bg-white"
           >
             Adicionar a Sacola
           </button>
         </div>
         <div className="flex-1 flex gap-2 justify-center items-center text-white pl-5 pr-5">
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