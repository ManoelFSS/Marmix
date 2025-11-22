"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LocationModal() {
  const [open, setOpen] = useState(false);

  // Verifica se já tem permissão ao carregar a página
  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        console.log("Estado da permissão:", result.state);

        if (result.state === "granted") {
          // Já possui permissão → não abre o modal
          setOpen(false);
        } else {
          // prompt (ainda não pediu) ou denied (negado)
          setOpen(true);
        }

        // Ouvinte: se mudar o estado, atualiza automaticamente
        result.onchange = () => {
          if (result.state === "granted") {
            setOpen(false);
          } else {
            setOpen(true);
          }
        };
      });
    } else {
      // Se permissions API não existir (iOS Safari), apenas abre o modal
      setOpen(true);
    }
  }, []);

  const handlePermit = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log("Localização permitida:", pos.coords);
        setOpen(false);
      },
      (error) => {
        console.log("Erro ao solicitar geolocalização:", error);
        // Se negar, o modal NÃO fecha
        setOpen(true);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-11/12 max-w-md">
            <h2 className="text-[1.7rem] text-center  font-bold text-orange-500 mb-2">
              Permitir localização
            </h2>

            <p className="text-gray-600 mb-2 text-[1rem]">
              Para continuar, precisamos acessar sua localização. Clique em{" "}
              <strong>“Permitir acesso”</strong> para confirmar.
            </p>
            <p className="text-gray-600 mb-6 text-[0.9rem]">
              Usamos sua localização só para encontrar seu endereço mais rápido
              e agilizar a entrega.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setOpen(false)
                  toast.error("Você precisa permitir o acesso à localização para continuar.", { duration: 6000 });
                }}
                className="px-4 py-2 bg-gray-400 rounded-lg text-white"
              >
                Cancelar
              </button>

              <button
                onClick={handlePermit}
                className="px-4 py-2 bg-gradient-to-r from-orange-700 to-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-700 text-white rounded-lg"
              >
                Permitir acesso
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
