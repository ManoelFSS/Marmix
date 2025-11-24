// export function gerarMensagemWhatsApp({
//   pedidos,
//   nomeCliente,
//   endereco,
//   formaPagamento,
//   latitude,
//   longitude,
// }) {
//   const header = `\n\n*Marmitex Comida Boa*\n\n`;
//   const clienteInfo = `*Cliente:* ${nomeCliente}\n*Endereço:* ${endereco}\n\n`;
//   const rota = `*Rota:* https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}\n\n`;

//   let mensagemPedidos = "";

  
//   pedidos.forEach((pedido, index) => {
//     mensagemPedidos +=
//       "-----------------------------------------------------------\n";

//     mensagemPedidos += `*Pedido ${index + 1}:*\n`;

//     // "02 Marmitex de R$ 10,00"
//     mensagemPedidos += `${String(pedido.count).padStart(
//       2,
//       "0"
//     )} Marmitex de R$ ${pedido.price.toFixed(2)}\n`;

//     // Primeiro as carnes em negrito
//     const carnes = pedido.itens.filter((i) => i.category.includes("Carnes"));
//     const outros = pedido.itens.filter((i) => !i.category.includes("Carnes"));
    
//     // Carnes no topo
//     carnes.forEach((c) => {
//       mensagemPedidos += `- *${c.name}*\n`;
//     });

//     // Depois os outros itens
//     outros.forEach((o) => {
//       mensagemPedidos += `- ${o.name}\n`;
//     });
//     mensagemPedidos += "\n";
//     // mensagemPedidos += `Valor unitário: R$ ${pedido.price.toFixed(2)}\n`;
//     mensagemPedidos += `Valor Total do pedido ${index + 1} : R$ ${pedido.valorTotal.toFixed(2)}\n`;
//     mensagemPedidos +=
//       "-----------------------------------------------------------\n\n";
//   });

//   const totalGeral = pedidos.reduce((acc, p) => acc + p.valorTotal, 0);

//   const final = `*Valor Total dos Pedidos:* R$ ${totalGeral.toFixed(
//     2
//   )}\n*Forma de Pagamento:* ${formaPagamento}\n${
//     formaPagamento === "pix" ?
//     "\nChave PIX: (74) 98816-1999\nNeuma Maria de souza\nPor favor enviar comprovante!\n" : ""
//   }\n\n*Obrigado pela preferação!* 🍽️😊\n`;

//   return header + clienteInfo + rota + mensagemPedidos + final;
// }





// export function gerarMensagemWhatsApp({
//   pedidos,
//   nomeCliente,
//   endereco,
//   formaPagamento,
//   latitude,
//   longitude,
//   tipoPedido = "normal", // novo parâmetro
// }) {
//   // Header
//   const header = `\n\n*${
//     tipoPedido === "retirar_no_local"
//       ? "Retirada no Local"
//       : "Marmitex Comida Boa"
//   }*\n\n`;

//   // Cliente info e rota só se não for retirada no local
//   const clienteInfo =
//     tipoPedido === "retirar_no_local"
//       ? ""
//       : `*Cliente:* ${nomeCliente}\n*Endereço:* ${endereco}\n\n`;

//   const rota =
//     tipoPedido === "retirar_no_local"
//       ? ""
//       : `*Rota:* https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}\n\n`;

//   // Monta os pedidos
//   let mensagemPedidos = "";
//   pedidos.forEach((pedido, index) => {
//     mensagemPedidos +=
//       "-----------------------------------------------------------\n";
//     mensagemPedidos += `*Pedido ${index + 1}:*\n`;
//     mensagemPedidos += `${String(pedido.count).padStart(
//       2,
//       "0"
//     )} Marmitex de R$ ${pedido.price.toFixed(2)}\n`;

//     const carnes = pedido.itens.filter((i) => i.category.includes("Carnes"));
//     const outros = pedido.itens.filter((i) => !i.category.includes("Carnes"));

//     carnes.forEach((c) => {
//       mensagemPedidos += `- *${c.name}*\n`;
//     });
//     outros.forEach((o) => {
//       mensagemPedidos += `- ${o.name}\n`;
//     });

//     mensagemPedidos += `\nValor Total do pedido ${
//       index + 1
//     }: R$ ${pedido.valorTotal.toFixed(2)}\n`;
//     mensagemPedidos +=
//       "-----------------------------------------------------------\n\n";
//   });

//   // Total geral e forma de pagamento
//   const totalGeral = pedidos.reduce((acc, p) => acc + p.valorTotal, 0);

//   const final = `*Valor Total dos Pedidos:* R$ ${totalGeral.toFixed(
//     2
//   )}\n*Forma de Pagamento:* ${formaPagamento}\n${
//     formaPagamento === "pix"
//       ? "\nChave PIX: (74) 98816-1999\nNeuma Maria de Souza\nPor favor enviar comprovante!\n"
//       : ""
//   }\n\n*Obrigado pela preferência!* 🍽️😊\n`;

//   return header + clienteInfo + rota + mensagemPedidos + final;
// }
export function gerarMensagemWhatsApp({
  pedidos,
  nomeCliente,
  endereco,
  formaPagamento,
  latitude,
  longitude,
  tipoPedido, // "normal" ou "Retirar no local"
}) {
  const header = `\n\n*Marmitex Comida Boa*\n\n`;

  // Cliente info (somente para entrega)
  const clienteInfo =
    tipoPedido === "Retirar no local"
      ? "*Tipo venda:* Retirada no Local\n\n"
      : `*Cliente:* ${nomeCliente}\n*Endereço:* ${endereco}\n\n`;

  // Rota (somente para entrega)
  const rota =
    tipoPedido === "Retirar no local"
      ? ""
      : `*Rota:* https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}\n\n`;

  let mensagemPedidos = "";

  pedidos.forEach((pedido, index) => {
    mensagemPedidos +=
      "-----------------------------------------------------------\n";

    mensagemPedidos += `*Pedido ${index + 1}:*\n`;

    mensagemPedidos += `${String(pedido.count).padStart(
      2,
      "0"
    )} Marmitex de R$ ${pedido.price.toFixed(2)}\n`;

    const carnes = pedido.itens.filter((i) => i.category.includes("Carnes"));
    const outros = pedido.itens.filter((i) => !i.category.includes("Carnes"));

    carnes.forEach((c) => {
      mensagemPedidos += `- *${c.name}*\n`;
    });

    outros.forEach((o) => {
      mensagemPedidos += `- ${o.name}\n`;
    });

    mensagemPedidos += "\n";
    mensagemPedidos += `Valor Total do pedido ${
      index + 1
    } : R$ ${pedido.valorTotal.toFixed(2)}\n`;
    mensagemPedidos +=
      "-----------------------------------------------------------\n\n";
  });

  const totalGeral = pedidos.reduce((acc, p) => acc + p.valorTotal, 0);

  const final = `*Valor Total dos Pedidos:* R$ ${totalGeral.toFixed(
    2
  )}\n*Forma de Pagamento:* ${formaPagamento}\n${
    formaPagamento === "pix"
      ? "\nChave PIX: (74) 98816-1999\nNeuma Maria de souza\nPor favor enviar comprovante!\n"
      : ""
  }\n\n*Obrigado pela preferência!* 🍽️😊\n`;

  // Montagem completa
  return header + clienteInfo + rota + mensagemPedidos + final;
}
