"use client";
import {useState, useEffect} from "react";
import { menuItems } from "@/app/(pedidos)/cardapio/data";
import { GiShoppingBag } from "react-icons/gi";

export default function Cardapio() {
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
    console.log(marmitaItens);
    console.log(sacola);
  }, [marmitaItens, sacola]);

   return (
     <section className=" flex flex-col ">
       <div
         className="flex justify-center items-center h-70 
         w-full rounded-xl   shadow-lg bg-gradient-to-r from-orange-700 to-orange-500 
      "
       >
         <div
           className={`transition duration-500 ${
             price === 15 ? "scale-115" : ""
           } flex justify-center items-center relative`}
         >
           <img
             src="/mix.png"
             alt="Restaurante"
             className=" w-[250px] xs:w-[270px] sm:w-[400px] lg:w-[550px] lg:h-[300px] xl:w-[560px] 2xl:w-[700px] 2xl:h-[400px] "
           />
           <img
             className="absolute rounded-full w-[180px] h-[180px]"
             src={arrozImage}
             alt="#"
           />
           <img
             className="absolute rounded-full w-[180px] h-[180px]"
             src={feijaoImage}
             alt="#"
           />
           <img
             className="absolute bottom-0 rotate-12 rounded-full w-[180px] h-[180px]"
             src={macarraoImage}
             alt="#"
           />
         </div>
       </div>
       <div className="bg-white p-2 border-b border-gray-400">
         <p className="text-black text-center text-[1.2rem] font-bold ">
           Escolha o Valor
         </p>
         <div className="flex gap-4 p-2 justify-between text-[1.2rem]">
           <button
             onClick={() => setPrice(10)}
             className={`rounded-[8px] px-5 py-1 border  border-black text-black
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
         <p className="text-black text-[1.1rem] font-bold">Cardápio</p>
         <p className="text-black text-[1rem] pb-2">
           Monte sua marmita a baixo
         </p>
         <section
           className="  w-full p-1 flex justify-evenly flex-wrap gap-2 overflow-auto h-55 rounded-lg 
         "
         >
           {menuItems.map((item, index) => (
             <div
               key={index}
               className="p-1 bg-zinc-100 w-[161px] flex gap-2 items-center "
             >
               <input
                 onClick={() => handleAddItem(item)}
                 className="h-4 w-4"
                 type="checkbox"
                 id={item.name}
                 checked={selectedItems.includes(item.name)}
                 readOnly
               />
               <label className="text-black text-[0.9rem]" htmlFor={item.name}>
                 {item.name}
               </label>
             </div>
           ))}
         </section>
       </div>

       <div className="bg-white flex gap-20 items-center justify-center p-2 border-t-2">
         <div className="flex flex-col  items-center text-black text-[1.5rem] px-5 py-1  relative  ">
           <GiShoppingBag
             className={`${
               sacola.length > 0 ? "text-green-700 animate-pulse" : ""
             } text-[3rem]`}
           />
           <p
             className={`text-[1.3rem] 
              ${sacola.length > 0 ? "text-green-700 " : ""}
            `}
           >
             <span className="text-white absolute left-15 top-4 ">{sacola.length}</span>
             {"Ver Sacola"}
           </p>
         </div>
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