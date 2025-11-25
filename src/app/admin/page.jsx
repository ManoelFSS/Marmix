"use client";

import React, { useState, useEffect } from "react";
import { useMarmitex } from "@/context/MarmitexContext";

const categoriasDisponiveis = [
  "Feijão",
  "Macarrão",
  "Salada Crua",
  "Salada Cozida",
  "Carnes",
  "Arroz",
];

export default function MenuAdmin() {
  const { items, loading, addItem, editItem, removeItem, toggleStatus } =
    useMarmitex();

    

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // Form
  const [name, setName] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryText, setCategoryText] = useState("");
  const [status, setStatus] = useState(true);
  const [zIndex, setZIndex] = useState(1);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  /* -------------------------------------
       PREVIEW IMAGEM
  -------------------------------------- */
  useEffect(() => {
    if (!imageFile) {
      setPreview(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  /* -------------------------------------
       ABRIR MODAL (NOVO)
  -------------------------------------- */
  function openNew() {
    setEditing(null);
    setName("");
    setCategory([]);
    setCategoryText("");
    setStatus(true);
    setZIndex(1);
    setImageFile(null);
    setPreview(null);
    setModalOpen(true);
  }

  /* -------------------------------------
       ABRIR MODAL (EDITAR)
  -------------------------------------- */
  function openEdit(item) {
    setEditing(item);
    setName(item.name);
    setCategoryText(item.category.join(", "));
    setCategory(item.category);
    setStatus(item.status);
    setZIndex(item.zIndex);
    setPreview(item.imageURL);
    setImageFile(null);
    setModalOpen(true);
  }

  /* -------------------------------------
       SUBMIT (CREATE/UPDATE)
  -------------------------------------- */
  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      name,
      category, // 👈 use o estado category que vem dos checkboxes
      status,
      zIndex: Number(zIndex),
      imageFile,
    };

    if (editing) {
      await editItem(editing.id, data);
    } else {
      await addItem(data);
    }

    setModalOpen(false);
  }


  /* -------------------------------------
       DELETE
  -------------------------------------- */
  async function handleRemove(id) {
    if (confirm("Excluir item?")) {
      await removeItem(id);
    }
  }

  /* -------------------------------------
       TOGGLE STATUS
  -------------------------------------- */
  async function handleToggle(item) {
    await toggleStatus(item);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <header className="bg-white shadow p-4 mb-4 flex justify-between">
        <h1 className="text-2xl font-bold text-orange-600">Marmitex Admin</h1>
        <button
          onClick={openNew}
          className="bg-orange-600 text-white px-4 py-2 rounded"
        >
          + Novo
        </button>
      </header>

      {/* Lista */}
      <div className="flex flex-wrap justify-center gap-10">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="w-[300px] bg-white p-4 rounded-2xl shadow"
            >
              <img src={item.imageURL} alt="" className="h-40 m-auto rounded" />
              <h3 className="font-bold text-orange-500 mt-2">{item.name}</h3>
              <p className="text-sm text-gray-500">
                {item.category.join(", ")}
              </p>

              <div className="flex justify-between items-center mt-3">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    item.status
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.status ? "Disponível" : "Indisponível"}
                </span>

                {/* Toggle */}
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={item.status}
                    onChange={() => handleToggle(item)}
                  />

                  <div className="w-12 h-7 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-all duration-300"></div>
                  <div className="absolute left-0.5 top-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300 peer-checked:translate-x-5"></div>
                </label>
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => openEdit(item)}
                  className="flex-1 bg-blue-500 text-white py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="flex-1 bg-red-500 text-white py-1 rounded"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {modalOpen && 
        <div className="absolute flex inset-0 bg-black/40 pt-10">
          <div className="m-auto bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {editing ? "Editar Marmitex" : "Novo Marmitex"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
              {/* Nome */}
              <div>
                <label className="block font-medium mb-1">Nome do item</label>
                <input
                  className="w-full border p-2 rounded bg-gray-50"
                  placeholder="Ex: Feijoada"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Categorias */}
              <div>
                <label className="block font-medium mb-1">Categorias</label>
                <div className="grid grid-cols-2 gap-2">
                  {categoriasDisponiveis.map((cat) => (
                    <label key={cat} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={category.includes(cat)}
                        onChange={() => {
                          if (category.includes(cat)) {
                            setCategory(category.filter((c) => c !== cat));
                          } else {
                            setCategory([...category, cat]);
                          }
                        }}
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              {/* zIndex */}
              <div>
                <label className="block font-medium mb-1">Ordem (zIndex)</label>
                <input
                  type="number"
                  className="w-[100px] border p-2 rounded bg-gray-50"
                  placeholder="Ex: 1"
                  value={zIndex}
                  onChange={(e) => setZIndex(e.target.value)}
                  required
                />
              </div>

              {/* Disponível */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={status}
                  onChange={() => setStatus(!status)}
                  className="w-5 h-5"
                />
                <label className="font-medium">Disponível</label>
              </div>

              {/* Imagem */}
              <div>
                <label className="block font-medium mb-1">Imagem</label>
                <button
                  type="button"
                  onClick={() => document.getElementById("fileInput").click()}
                  className="px-4 py-2 bg-blue-600 text-white rounded shadow"
                >
                  Selecionar imagem
                </button>

                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    setImageFile(e.target.files[0]);
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  }}
                />

                {preview && (
                  <img
                    src={preview}
                    alt="Prévia"
                    className="w-32 h-32 mt-3 object-cover rounded border shadow"
                  />
                )}
              </div>

              {/* Botões */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 text-white rounded font-semibold"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  );
}
