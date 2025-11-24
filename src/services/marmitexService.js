import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import {db, storage} from "@/firebase/firebaseConfig";
import { v4 as uuidv4 } from "uuid";

const COLLECTION = "marmitex";

/* -------------------------------------------
   🔼 UPLOAD DE IMAGEM
-------------------------------------------- */
export async function uploadImageFile(file, folder = "marmitex") {
  if (!file) return null;

  const id = uuidv4();
  const ext = file.name.split(".").pop();
  const path = `${folder}/${id}.${ext}`;

  const ref = storageRef(storage, path);
  await uploadBytes(ref, file);

  const url = await getDownloadURL(ref);

  return { url, path };
}

/* -------------------------------------------
   🗑️ DELETAR IMAGEM
-------------------------------------------- */
export async function deleteImage(path) {
  if (!path) return;
  try {
    const ref = storageRef(storage, path);
    await deleteObject(ref);
  } catch (err) {
    console.error("Erro ao excluir imagem:", err);
  }
}

/* -------------------------------------------
   🟢 CREATE
-------------------------------------------- */
export async function createMarmitex(data) {
  const { name, category, zIndex, status, imageFile } = data;

  let imageURL = "";
  let imagePath = "";

  if (imageFile) {
    const uploaded = await uploadImageFile(imageFile);
    imageURL = uploaded.url;
    imagePath = uploaded.path;
  }

  const docRef = await addDoc(collection(db, COLLECTION), {
    name,
    category,
    zIndex,
    status,
    imageURL,
    imagePath,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

/* -------------------------------------------
   🔵 UPDATE
-------------------------------------------- */
export async function updateMarmitex(id, updates) {
  const docRef = doc(db, COLLECTION, id);

  let dataToUpdate = { ...updates, updatedAt: serverTimestamp() };

  // Se trocar imagem → exclui antiga + envia nova
  if (updates.imageFile) {
    const snap = await getDoc(docRef);
    const old = snap.data();

    if (old?.imagePath) {
      await deleteImage(old.imagePath);
    }

    const uploaded = await uploadImageFile(updates.imageFile);
    dataToUpdate.imageURL = uploaded.url;
    dataToUpdate.imagePath = uploaded.path;

    delete dataToUpdate.imageFile;
  }

  await updateDoc(docRef, dataToUpdate);
}

/* -------------------------------------------
   🔴 DELETE
-------------------------------------------- */
export async function deleteMarmitex(id) {
  const docRef = doc(db, COLLECTION, id);

  const snap = await getDoc(docRef);
  const data = snap.data();

  if (data?.imagePath) {
    await deleteImage(data.imagePath);
  }

  await deleteDoc(docRef);
}

/* -------------------------------------------
   🟡 REALTIME LISTENER
-------------------------------------------- */
export function listenMarmitex(callback) {
  const col = collection(db, COLLECTION);

  const unsub = onSnapshot(col, (snapshot) => {
    const list = snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (a.zIndex ?? 0) - (b.zIndex ?? 0));

    callback(list);
  });

  return unsub; // permite remover listener
}
