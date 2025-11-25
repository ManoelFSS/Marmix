"use client";

import { useState } from "react";

// components 
import CardBag from "../CardBag/idex";
import LocationModal from "../LocationModal";
//icons 
import { AiFillCloseSquare } from "react-icons/ai";
import { GiShoppingBag } from "react-icons/gi";
import { TbBikeFilled } from "react-icons/tb";
//stores
import { useBagStore } from "@/stores/bagStore";
import { useBagState } from "@/stores/bagState";
import {gerarMensagemWhatsApp } from "./gerarMensagem";

import { useOpenStore } from "@/stores/modalState";
import toast from "react-hot-toast";


export default function Bag() {

  const [estrucaomodal, setEstrucaomodal] = useState(false);

  const {setOpen} = useOpenStore();
  const [name, setName] = useState("");
  const [enderess, setEnderess] = useState("");
  const [numero, setNumero] = useState("");
  const [pagamento, setPagamento] = useState("");
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [typepedido, setTypepedido] = useState("normal");

  const closeBag = useBagState((state) => state.closeBag);
  const setCloseBag = useBagState((state) => state.setCloseBag);

  const addToBag = useBagStore((state) => state.addToBag);
  const bag = useBagStore((state) => state.bag);
  console.log(bag.length);


 async function verificarPermissaoLocalizacao() {
   if (!navigator.permissions) {
     return { state: "unsupported", allowed: false };
   }

   try {
     const perm = await navigator.permissions.query({ name: "geolocation" });

     return {
       state: perm.state, // "granted" | "denied" | "prompt"
       allowed: perm.state === "granted",
     };
   } catch {
     return { state: "error", allowed: false };
   }
 }

const hendleresetForm = () => {
  setName("");
  setEnderess("");
  setNumero("");
  setPagamento("");
}


async function enviarPedido(tipo) {
  console.log(tipo);
  
  // Se for Retirada no Local, não precisa de localização nem dados do cliente
  if (tipo === "Retirar no local") {
    const mensagem = gerarMensagemWhatsApp({
      pedidos: bag,
      formaPagamento: "Na Retirada",
      tipoPedido: tipo, // sinaliza para gerar mensagem apropriada
    });

    const numero = "5574935050160";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    hendleresetForm();
    setFormModalOpen(false);
    setCloseBag(false);
    addToBag([]); // esvazia a sacola

    window.open(url, "_blank");
    return;
  }

  const res = await verificarPermissaoLocalizacao();

  // 1. Se usuário já negou → NÃO ABRIR MODAL → mostrar aviso
  if (res.state === "denied") {
    setFormModalOpen(false);
    setEstrucaomodal(true);
    hendleresetForm();
    return;
  }

  // 2. Se ainda não respondeu (prompt) → abrir modal de permissão
  if (res.state === "prompt") {
    setFormModalOpen(false);
    setOpen(true); // mantém modal aberto até aceitar ou negar
    return;
  }

  // 3. Se já permitiu → seguir fluxo normal
  if (res.state === "granted") {
    if (!name || !enderess || !numero || !pagamento) {
      toast.error("Por favor, preencha todos os campos do formulário.", {
        duration: 4000,
      });
      return;
    }

    const nomeCliente = name;
    const endereco = `${enderess}, Nº ${numero}`;
    const formaPagamento = pagamento;

    navigator.geolocation.getCurrentPosition((pos) => {
      const latitude = pos.coords.latitude;
      const longitude = pos.coords.longitude;

      const mensagem = gerarMensagemWhatsApp({
        pedidos: bag,
        nomeCliente,
        endereco,
        formaPagamento,
        latitude,
        longitude,
        typepedido:
          typepedido === "Retirar no local" ? "retirar_no_local" : "normal",
      });

      const numero = "5574935050160";
      const url = `https://wa.me/${numero}?text=${encodeURIComponent(
        mensagem
      )}`;

      hendleresetForm();
      setFormModalOpen(false);
      setCloseBag(false);
      addToBag([]); // esvazia a sacola
      window.open(url, "_blank");
    });
  }
}




  return (
    <aside
      className={` overflow-hidden h-[100svh]   flex flex-col justify-between border border-amber-500
      absolute top-0  right-0 z-90  bg-zinc-200
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
          <p className="text-orange-500 font-rubik font-extrabold text-[1.8rem]">
            {bag.length === 0
              ? "Sacola Vazia"
              : bag.reduce((acc, item) => acc + item.count, 0) === 1
              ? "Marmitex"
              : "Marmitex"}
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
        {bag.length > 0 && (
          <div className="h-20  flex gap-2  justify-center items-center">
            <button
              onClick={() => {
                setFormModalOpen(true);
              }}
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
              onClick={() => {
                enviarPedido("Retirar no local");
              }}
              className="text-white bg-zinc-700 border-1 border-black font-medium 
              transition-all duration-300 ease-in-out text-[1.2rem] p-3 pl-4 pr-4 
              rounded
              "
            >
              Retirar no local
            </button>
          </div>
        )}
      </div>
      {formModalOpen && (
        <form className=" text-black fixed top-0 h-full inset-0 bg-black/50 flex items-center justify-center p-4 z-999">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 animate-fadeIn">
            <h2 className="text-xl text-orange-500 font-bold mb-4 text-center">
              Dados do Pedido
            </h2>

            <div className="space-y-4">
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  value={name}
                  name="nome"
                  required
                  className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Digite seu Nome"
                />
              </div>

              {/* Endereço */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Endereço
                </label>
                <input
                  onChange={(e) => setEnderess(e.target.value)}
                  type="text"
                  value={enderess}
                  name="endereco"
                  required
                  className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Rua, bairro..."
                />
              </div>

              {/* Número */}
              <div>
                <label className="block text-sm font-medium mb-1">Número</label>
                <input
                  onChange={(e) => setNumero(e.target.value)}
                  value={numero}
                  name="numero"
                  type="number"
                  required
                  className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Ex: 123"
                />
              </div>

              {/* Forma de pagamento */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Forma de pagamento
                </label>

                <select
                  name="pagamento"
                  onChange={(e) => setPagamento(e.target.value)}
                  value={pagamento}
                  required
                  className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Selecione</option>
                  <option value="pix">Pix</option>
                  <option value="dinheiro">Dinheiro</option>
                  <option value="cartão">Cartão</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setFormModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  Cancelar
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    enviarPedido("normal");
                  }}
                  className="border-2 border-orange-500  bg-gradient-to-r from-orange-700 to-orange-500 
                  hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-700 
                  transition-all duration-300 ease-in-out text-white text-[1.2rem] p-3
                  pl-4 pr-4  rounded"
                >
                  Confirmar pedido
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      <LocationModal enviarPedido={enviarPedido} />
      {estrucaomodal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-8">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-4 animate-fadeIn">
            <h2 className="text-xl text-red-600 font-bold mb-3 text-center">
              Permissão Negada
            </h2>

            <div className="text-gray-700 text-[0.8rem] mb-4 leading-relaxed">
              <p>
                Você negou o acesso à localização. Para continuar usando o
                delivery, habilite manualmente:
              </p>
              <p className="mt-5">
                • Toque no cadeado ao lado do endereço do site
              </p>
              <p>
                • Entre em <strong>Permissões</strong>
              </p>
              <p>
                • Abra <strong>Localização</strong>
              </p>
              <p>
                • Escolha <strong>Permitir</strong>
              </p>
              <p>• Recarregue a página</p>
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={() => setEstrucaomodal(false)}
                className="px-6 py-2 bg-orange-500 text-white rounded-xl font-semibold 
            hover:bg-orange-600 transition-all"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}