const produtos = [
    { nome: "Produto 1", preco: 10.0, quantidade: 5 },
    { nome: "Produto 2", preco: 20.0, quantidade: 3 },
    { nome: "Produto 3", preco: 15.0, quantidade: 10 },
    { nome: "Produto 4", preco: 30.0, quantidade: 7 },
    { nome: "Produto 5", preco: 5.0, quantidade: 2 }
];

let carrinho = [];

function exibirProdutos() {
    const divProdutos = document.getElementById('produtos');
    divProdutos.innerHTML = '';
    produtos.forEach(produto => {
        divProdutos.innerHTML += `<p>${produto.nome} - R$${produto.preco} (Estoque: ${produto.quantidade})</p>`;
    });
}

function exibirCarrinho() {
    const divCarrinho = document.getElementById('carrinho');
    divCarrinho.innerHTML = '';
    carrinho.forEach((item, indice) => {
        divCarrinho.innerHTML += `<p>${item.nome} - R$${item.preco} <button onclick="removerDoCarrinho(${indice})">Remover</button></p>`;
    });
    atualizarTotal();
}

function adicionarAoCarrinho() {
    const nomeProduto = document.getElementById('nomeProduto').value;
    const produto = produtos.find(p => p.nome.toLowerCase() === nomeProduto.toLowerCase());

    if (produto && produto.quantidade > 0) {
        carrinho.push({ nome: produto.nome, preco: produto.preco });
        produto.quantidade--;
        exibirProdutos();
        exibirCarrinho();
    } else {
        alert('Produto não encontrado ou sem estoque.');
    }
}

function removerDoCarrinho(indice) {
    const produtoRemovido = carrinho.splice(indice, 1)[0];
    const produtoEstoque = produtos.find(p => p.nome === produtoRemovido.nome);
    produtoEstoque.quantidade++;
    exibirProdutos();
    exibirCarrinho();
}

function atualizarTotal() {
    const total = carrinho.reduce((acumulador, item) => acumulador + item.preco, 0);
    document.getElementById('valorTotal').innerText = total.toFixed(2);
}

function ordenarCarrinho() {
    carrinho.sort((a, b) => a.preco - b.preco);
    exibirCarrinho();
}

exibirProdutos();
