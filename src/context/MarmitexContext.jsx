"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import {
  createMarmitex,
  updateMarmitex,
  deleteMarmitex,
  listenMarmitex,
} from "@/services/marmitexService";
import toast from "react-hot-toast";

const MarmitexContext = createContext({});

export function MarmitexProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ref para guardar o estado anterior e comparar mudanças
  const prevItemsRef = useRef([]);

  useEffect(() => {
    const unsub = listenMarmitex((list) => {
      // Verifica mudanças de status para disparar toast
      list.forEach((item) => {
        const prevItem = prevItemsRef.current.find((i) => i.id === item.id);
        if (prevItem && prevItem.status !== item.status) {
          if (item.status) {
            toast.success(`Item "${item.name}" disponível`, { duration: 6000 });
          } else {
            toast.error(`Item "${item.name}" indisponível`, { duration: 6000 });
          }
        }
      });

      prevItemsRef.current = list; // Atualiza o estado anterior
      setItems(list);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const addItem = async (data) => {
    try {
      await createMarmitex(data);
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
    }
  };

  const editItem = async (id, data) => {
    try {
      await updateMarmitex(id, data);
    } catch (error) {
      console.error("Erro ao editar item:", error);
    }
  };

  const removeItem = async (id) => {
    try {
      await deleteMarmitex(id);
    } catch (error) {
      console.error("Erro ao remover item:", error);
    }
  };

  const toggleStatus = async (item) => {
    try {
      await updateMarmitex(item.id, { status: !item.status });
      // Não dispara toast aqui, agora o listener vai cuidar disso
    } catch (error) {
      console.error("Erro ao alternar status:", error);
    }
  };

  return (
    <MarmitexContext.Provider
      value={{
        items,
        loading,
        addItem,
        editItem,
        removeItem,
        toggleStatus,
      }}
    >
      {children}
    </MarmitexContext.Provider>
  );
}

export const useMarmitex = () => useContext(MarmitexContext);
