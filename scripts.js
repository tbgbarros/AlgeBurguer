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
            <div>
                <div>
                    <p class="font-bold">${item.name}</p>
                    <p class="font-light"> R$ ${item.price}</p>
                    <p class="font-medium mt-2">Qtd: ${item.qtd}</p>
                </div>
                <div>
                    <button class="remover-item">Remover</button>
                </div>
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