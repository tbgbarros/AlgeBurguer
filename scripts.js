const menu = document.getElementById("menu")
const contadorCarrinho = document.getElementById("contador-carrinho")
const horario = document.getElementById("horario")
const modal = document.getElementById("modal")
const endereco = document.getElementById("endereco")
const semEndereco = document.getElementById("sem-endereco")
const fecharBotao = document.getElementById("fechar-botao")
const finalizarPedido = document.getElementById("finalizar-pedido")
const carrinho_itens = document.getElementById("carrinho-itens")
const carrinho_valor = document.getElementById("carrinho-valor")
const carrinho_botao = document.getElementById("carrinho-botao")
//carrinho-total
const carrinho_total = document.getElementById("carrinho-total")

let cart = [];

//multiplicacao de matriz para gerar o valor do lanche em cada mercado e ver qual e melhor comprar
//tabela de dois lanches
const lanches = [
    // [Pão de hamburguer, Hamburguer de carne, Queijo cheddar, Queijo muçarela, Catupiry, Tomate, Bacon]
    [1, 1, 0, 0.050, 0.050, 2, 0], // X-Burguer
    [1, 2, 0.080, 0.080, 0.080, 4, 0.10] // X-Burger especial
];

// Tabela de valor unitário nos supermercados
const valoresUnitarios = [
    // [Delta, Savegnago]
    [2.24, 1.74], // pao de hamburguer (unidade)
    [1.66, 1.46], // hamburguer de carne (unidade)
    [78.00, 117.01], // queijo cheddar (kg)
    [76.63, 74.66], // queijo muçarela (kg)
    [75.96, 69.40], // catupiry (kg)
    [0.55, 0.56], // tomate (rodela)
    [75.96, 79.80] // bacon (kg)
];

// funcao para multiplicacao de matrizes
function multiplicaMatrizes(matriz1, matriz2) {
    return matriz1.map((row) =>
        matriz2[0].map((_, j) =>
            row.reduce((sum, _, k) => sum + row[k] * matriz2[k][j], 0)
        )
    );
}
// Margem de lucro com custos menores de produtos não contabilizados e embalagens
const margemDeLucro = 1.5; // 150%


// Função para calcular o custo do lanche com a margem de lucro
function calcularCustoComMargemDeLucro() {
    // Multiplicar as matrizes lanches e valoresUnitarios para obter os custos em cada supermercado
    const custos = multiplicaMatrizes(lanches, valoresUnitarios);

    // Variáveis para armazenar o mercado mais barato e o custo do lanche nesse mercado
    let mercadoMaisBarato = '';
    let custoMaisBarato = Infinity;

    // Percorrer a matriz de custos para encontrar o mercado mais barato
    for (let j = 0; j < custos[0].length; j++) {
        let custoTotal = 0;
        for (let i = 0; i < custos.length; i++) {
            custoTotal += custos[i][j];
        }
        // Aplicar a margem de lucro ao custo total
        custoTotal *= (1 + margemDeLucro);
        if (custoTotal < custoMaisBarato) {
            custoMaisBarato = custoTotal;
            mercadoMaisBarato = j === 0 ? 'Delta' : 'Savegnago';
        }
    }

    // Exibir os custos
    console.log("Custos dos lanches em diferentes supermercados:");
    console.log("-------------------------------------------------");
    console.log("Lanche\t\tDelta\t\tSavegnago");
    console.log("-------------------------------------------------");
    console.log("X-Burguer\tR$" + custos[0][0].toFixed(2) + "\t\tR$" + custos[0][1].toFixed(2));
    console.log("X-Burger E\tR$" + custos[1][0].toFixed(2) + "\t\tR$" + custos[1][1].toFixed(2));
    console.log("O mercado mais barato é:", mercadoMaisBarato);
    console.log("O custo do lanche nesse mercado é: $" + custoMaisBarato.toFixed(2));
}

// Chamar a função on load 
window.addEventListener('load', calcularCustoComMargemDeLucro);


//abrir carrinho
carrinho_botao.addEventListener("click", function () {
    modal.style.display = "flex"
})

//fecha o modal quando clica fora
modal.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
})

//fechar-botao
fecharBotao.addEventListener("click", function () {
    modal.style.display = "none"
})

//menu adicionar-carrinho
menu.addEventListener("click", function (event) {
    // console.log(event.target)
    let botao = event.target.closest(".adicionar-carrinho")
    if (botao) {
        const name = botao.getAttribute("data-name")
        const price = parseFloat(botao.getAttribute("data-price"))

        //adicionar no carrinho
        addToCard(name, price)

    }

}
)

// //funcao para adicionar no carrinho
function addToCard(name, price) {
    //aumentar a quantidade dos itens quando adicionar
    const existeItem = cart.find(item => item.name === name)
    if (existeItem) {
        existeItem.qtd += 1;
    } else {
        cart.push({ name, price, qtd: 1 })
    }
    updateCart()
}

// //atualizar o carrinho
function updateCart() {
    carrinho_itens.innerHTML = "";
    let total = 0;


    cart.forEach(item => {
        console.log(item)
        const cartItemElement = document.createElement("div")
        cartItemElement.classList.add("flex", "justify-brtween", "mb-4", "flex-col")
        cartItemElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-bold">${item.name}</p>
                    <p class="font-light"> R$ ${item.price.toFixed(2)}</p>
                    <p class="font-medium mt-2">Qtd: ${item.qtd}</p>
                </div>
                    <button class="remover-item bg-green-500 text-white px-4 py-1 rounded" data-name="${item.name}">Remover</button>
            </div>
        `
        total += item.price * item.qtd;
        carrinho_itens.appendChild(cartItemElement)
    }
    )
    carrinho_total.textContent = total.toLocaleString("pt-br", { style: "currency", currency: "BRL" })
    contadorCarrinho.innerHTML = cart.length;
}

//testes envio

//remover item carrinho
carrinho_itens.addEventListener("click", function (event) {
    let botao = event.target.closest(".remover-item")
    if (botao) {
        const name = botao.getAttribute("data-name")
        removeFromCard(name)
    }
})

//funcao para remover item do carrinho
function removeFromCard(name) {
    const index = cart.findIndex(item => item.name === name)
    if (index !== -1) {
        const item = cart[index]
        if (item.qtd > 1) {
            item.qtd -= 1
            updateCart()
            return;
        }
        cart.splice(index, 1);
        updateCart();
    }
}

//endereco da pessoa
endereco.addEventListener("input", function (event) {
    let valor = event.target.value;
    //sem valor vazio
    if (valor !== "") {
        semEndereco.classList.add("hidden")
        endereco.classList.remove("border-red-500")
    }

})



//finalizar pedido
finalizarPedido.addEventListener("click", function () {
    if (cart.length === 0) {
        alert("Não há itens no carrinho")
        return;
    }
    if (endereco.value === "") {
        semEndereco.classList.remove("hidden")
        endereco.classList.add("border-red-500")
    }
    //parte para enviar pedido via whatsapp com as info digitadas e escolhidas
    // const carrinho_itens = cart.map((item) => {
    //     return `
    //         ${item.name} Quantidade:  (${item.qtd}) Preço: R$ ${item.price} |
    //         `}).join("")

    // const mensagem = encodeURIComponent(carrinho_itens)
    // const telefone = "19994139474"

    // window.open(`https://wa.me/${telefone}?text=${mensagem} Endereço: ${endereco.value}`, "_blank")
    const carrinho_itens = cart.map((item) => {
        return `
            🍔 ${item.name} 
            Quantidade: ${item.qtd} 
            Preço: R$ ${item.price.toFixed(2)} 
            ---------------------
            `;
    }).join("");

    const mensagem = encodeURIComponent(`Olá! Aqui estão os itens do meu carrinho: \n\n${carrinho_itens} \n\nEndereço: ${endereco.value}`);
    const telefone = "19994139474";

    window.open(`https://wa.me/${telefone}?text=${mensagem}`, "_blank");

    cart.length = 0;
    updateCart();
})