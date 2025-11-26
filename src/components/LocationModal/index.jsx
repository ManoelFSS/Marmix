"use client";
import { useOpenStore } from "@/stores/modalState";
import toast from "react-hot-toast";

export default function LocationModal({ setFormModalOpen }) {
  const { open, setOpen } = useOpenStore();


  const handlePermit = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setOpen(false); // fecha ao permitir
        toast.success("Localização permitida! agora so clicar no botão pedir deleivery", { duration: 10000 });
      },
      (error) => {
        console.log("Usuário NEGOU:", error);
        setOpen(false); // fecha ao negar
        toast.error("Localização negada!", { duration: 10000 });
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
