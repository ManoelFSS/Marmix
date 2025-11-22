export function gerarMensagemWhatsApp({
  pedidos,
  nomeCliente,
  endereco,
  formaPagamento,
  latitude,
  longitude,
}) {
  const header = `\n\n*Marmitex Comida Boa*\n\n`;
  const clienteInfo = `*Cliente:* ${nomeCliente}\n*Endereço:* ${endereco}\n\n`;
  const rota = `*Rota:* https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}\n\n`;

  let mensagemPedidos = "";

  
  pedidos.forEach((pedido, index) => {
    mensagemPedidos +=
      "-----------------------------------------------------------\n";

    mensagemPedidos += `*Pedido ${index + 1}:*\n`;

    // "02 Marmitex de R$ 10,00"
    mensagemPedidos += `${String(pedido.count).padStart(
      2,
      "0"
    )} Marmitex de R$ ${pedido.price.toFixed(2)}\n`;

    // Primeiro as carnes em negrito
    const carnes = pedido.itens.filter((i) => i.category === "Carnes");
    const outros = pedido.itens.filter((i) => i.category !== "Carnes");

    // Carnes no topo
    carnes.forEach((c) => {
      mensagemPedidos += `- *${c.name}*\n`;
    });

    // Depois os outros itens
    outros.forEach((o) => {
      mensagemPedidos += `- ${o.name}\n`;
    });
    mensagemPedidos += "\n";
    // mensagemPedidos += `Valor unitário: R$ ${pedido.price.toFixed(2)}\n`;
    mensagemPedidos += `Valor Total do pedido ${index + 1} : R$ ${pedido.valorTotal.toFixed(2)}\n`;
    mensagemPedidos +=
      "-----------------------------------------------------------\n\n";
  });

  const totalGeral = pedidos.reduce((acc, p) => acc + p.valorTotal, 0);

  const final = `*Valor geral:* R$ ${totalGeral.toFixed(
    2
  )}\n*Pagamento:* ${formaPagamento}\n`;

  return header + clienteInfo + rota + mensagemPedidos + final;
}
