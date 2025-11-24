import { useEffect, useState } from "react";
import { useOpenStore } from "@/stores/modalState";

export default function LocationModal({enviarPedido}) {
  const { open, setOpen, toggleOpen } = useOpenStore();

  // Verifica se já tem permissão ao carregar a página
  useEffect(() => {
    if (!navigator.permissions) return;

    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      console.log("Permissão atual:", result.state);

      // Se já tiver permitido antes → fecha
      if (result.state === "granted") setOpen(false);

      // Listener: quando permitir ou negar → fecha
      result.onchange = () => {
        console.log("Permissão mudou para:", result.state);
        setOpen(false); // FECHA EM QUALQUER CASO
      };
    });
  }, []);

  const handlePermit = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log("Usuário PERMITIU:", pos.coords);
        setOpen(false); // fecha ao permitir
        enviarPedido("normal"); // chama o envio do pedido
      },
      (error) => {
        console.log("Usuário NEGOU:", error);
        setOpen(false); // fecha ao negar
      }
    );
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-999">
          <div className="bg-white rounded-lg shadow-xl p-6 w-11/12 max-w-md">
            <h2 className="text-[1.7rem] text-center  font-bold text-orange-500 mb-2">
              Acesso à Localização
            </h2>

            <p className="text-gray-600 mb-2 text-[1rem]">
              Para continuar, precisamos acessar sua localização. Clique em{" "}
              <strong>“Permitir acesso”</strong> para confirmar.
            </p>
            <p className="text-gray-600 mb-6 text-[0.9rem]">
              Usamos sua localização só para encontrar seu endereço mais rápido
              e agilizar na entrega.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg text-gray-800"
              >
                Cancelar
              </button>

              <button
                onClick={handlePermit}
                className="px-4 py-2 bg-gradient-to-r from-orange-700 to-orange-500 text-white rounded-lg"
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
