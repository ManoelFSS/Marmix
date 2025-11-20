import Image from "next/image";
import Link from "next/link";
//comonents
import Banner from "@/components/Banner";

export default function Home() {
  return (
    <section className="flex flex-col h-full w-full xs:h-[87vh] xs:justify-between bg-white rounded-xl shadow-lg font-rubik ">
      <Banner />
      <div className="pt-2 flex flex-col items-center">
        <h2 className="text-black text-center text-[1.5rem] md:text-[1.5rem]">
          Bem Vindo ao
        </h2>
        <h1 className="uppercase text-orange-500 text-[1.4rem] xl:text-[2.6rem] text-center   font-extrabold">
          Restaurante Comida Boa
        </h1>
      </div>
      <p className="text-black text-center text-[1.2rem] pt-2 pb-2">
        Av central Norte N° 10 Trindade-PE
      </p>
      <p className="text-black text-center text-[1rem] ">
        Prox: Hotel Grande Serra
      </p>
      <div className="text-center  flex flex-col gap-3  items-center pb-2">
        <Link href="/cardapio">
          <button className="text-white text-[1.1rem] p-3 font-bold pr-10 pl-10 mt-8 rounded-full  bg-gradient-to-r from-orange-700 to-orange-500 cursor-pointer hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-700 animate-bounce ">
            Ver Cardápio
          </button>
        </Link>
      </div>
    </section>
  );
}
