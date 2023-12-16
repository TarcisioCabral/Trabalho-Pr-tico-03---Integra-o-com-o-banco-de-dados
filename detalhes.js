// Defina a classe Produto
function Produto(id, image, title, description, price) {
    this.id = id;
    this.image = image;
    this.title = title;
    this.description = description;
    this.price = price;
}

// Adicione um método ao protótipo para atualizar os detalhes do produto no DOM
Produto.prototype.atualizarDetalhesNoDOM = function () {
    var cardImg = $(".card-img-top");
    cardImg.attr("src", this.image).css({
        "max-width": "100%",
        "display": "block",
        "margin": "0 auto",
        "margin-top": "20px",
        "margin-bottom": "20px",
        "margin-left": "15px"
        
    });

    $(".card-title").text(this.title).css({
        "margin-top": "20px"
    });
    
    $(".card-text").eq(1).text(this.description);
    $(".card-text").eq(0).text("R$ " + this.price);
    // Adicione a avaliação do produto
    $(".rating span").text(this.rating);

    // Adicione eventos para os botões
    $("#btnComprar").on("click", function () {
        // Lógica para a ação de comprar
        console.log("Botão Comprar clicado");
    });

    $("#btnAddToCart").on("click", function () {
        // Lógica para a ação de adicionar ao carrinho
        console.log("Botão Adicionar ao Carrinho clicado");
    });

};

$(document).ready(function () {
    var productId = new URLSearchParams(window.location.search).get('id');
    var productEndpoint = "https://fakestoreapi.com/products/" + productId;

    $.ajax({
        url: productEndpoint,
        method: "GET",
        success: function (productDetails) {
            console.log("Product Details:", productDetails);

            // Crie uma instância da classe Produto com os detalhes recebidos
            var produto = new Produto(
                productDetails.id,
                productDetails.image,
                productDetails.title,
                productDetails.description,
                productDetails.price
            );

            // Atualize os detalhes do produto no DOM
            produto.atualizarDetalhesNoDOM();
        },
        error: function (error) {
            console.error("Erro ao carregar detalhes do produto:", error);
        }
    });
});

// Aguarde o documento estar pronto para executar o código
$(document).ready(function () {
    $("#redirectLink").on("click", function (event) {
        event.preventDefault();
        window.location.href = "index1.html";
    });

    // Outras funcionalidades específicas para detalhes.html podem ser adicionadas aqui
});
