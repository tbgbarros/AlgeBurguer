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
    //parte para enviar pedido via whatsapp com as info digitadas e escolhidas
    const carrinho_itens = cart.map((item) => {
        return `
        ${item.name} Quantidade:  (${item.qtd}) Preço: R$ ${item.price} |
        `}).join("")

    const mensagem = encodeURIComponent(carrinho_itens)
    const telefone = "19994139474"

    window.open(`https://wa.me/${telefone}?text=${mensagem} Endereço: ${endereco.value}`, "_blank")

    cart.length = 0;
    updateCart();
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
})