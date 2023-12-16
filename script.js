// Classe para manipular produtos
class ProdutoManager {
    constructor() {
        this.produtos = [];
    }

    // Método para carregar produtos da API
    carregarProdutos() {
        const endpoint = "https://fakestoreapi.com/products";

        $.ajax({
            url: endpoint,
            method: "GET",
            success: (data) => {
                this.produtos = data;
                this.exibirProdutos();
            },
            error: (error) => {
                console.error("Erro ao carregar os dados da API:", error);
            }
        });
    }

    // Método para exibir produtos na página
    exibirProdutos() {
        $("#produtos-section").empty();
        this.produtos.forEach((produto, index) => {
            const produtoHtml = this.criarProdutoHtml(produto, index);
            $("#produtos-section").append(produtoHtml);
        });

        this.adicionarEventos();
    }

   // Método para criar HTML de produto
    criarProdutoHtml(produto, index) {
        const descricao = produto.description;
        const descricaoAbreviada = descricao.length > 100 ? descricao.slice(0, 100) + '...' : descricao;

        const rating = produto.rating ? produto.rating.rate.toFixed(1) : 'N/A';
        const ratingCount = produto.rating ? produto.rating.count : 'N/A';

        const produtoHtml = `
            <div class="card mb-7" style="max-width: 18rem; margin-bottom: 4px;">
                <img src="${produto.image}" class="card-img-top" alt="${produto.title}" style="max-height: 200px; object-fit: contain;">
                <div class="card-body">
                    <a href="#" class="text-primary h5 produto-link" data-id="${produto.id}" data-category="${produto.category}">${produto.title}</a>
                    <p class="card-text"><small class="text-muted">R$ ${produto.price.toFixed(2)}</small></p>
                    <p class="card-text"><small class="text-muted">Rating: ${rating} (Count: ${ratingCount})</small></p>
                    <p class="card-text"><strong>Category:</strong> ${produto.category}</p>
                    <p class="card-text descricao">${descricaoAbreviada}</p>
                    ${descricao.length > 100 ? `<button class="btn btn-link read-more" data-toggle="modal" data-target="#modalDescricao${index}" data-expanded="false">Ler mais</button>` : ''}
                </div>
            </div>
        `;

        // Criar modal para a descrição completa
        if (descricao.length > 100) {
            const modalHtml = `
                <div class="modal fade" id="modalDescricao${index}" tabindex="-1" aria-labelledby="modalDescricaoLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="modalDescricaoLabel">${produto.title}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>${descricao}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            $('body').append(modalHtml);
        }

        return produtoHtml;
    }

    // Método para adicionar eventos aos elementos da página
    adicionarEventos() {
        $('.read-more').on('click', (event) => {
            const index = $(event.target).data('target').replace('#modalDescricao', '');
            const isExpanded = $(event.target).data('expanded') === true;

            if (isExpanded) {
                $('.descricao').eq(index).text(this.produtos[index].description.slice(0, 100) + '...');
            } else {
                $('.descricao').eq(index).text(this.produtos[index].description);
            }

            $(event.target).data('expanded', !isExpanded);
        });
        
        // Corrigindo o evento de clique no link para a página de detalhes
        $("#produtos-section").on("click", ".produto-link", (event) => {
            event.preventDefault();
            const produtoId = $(event.target).data("id");
            window.location.href = `detalhes.html?id=${produtoId}`;
        });

        $(".category-link").on("click", (event) => {
            event.preventDefault();
            const categoria = $(event.target).data("category");
            this.filtrarPorCategoria(categoria);
        });

        $("#searchButton").on("click", (event) => {
            event.preventDefault();
            const searchTerm = $("#searchInput").val();
            this.filtrarPorTermo(searchTerm);
        });
    }

    // Método para filtrar produtos por categoria
    filtrarPorCategoria(categoria) {
        const produtosFiltrados = this.produtos.filter((produto) => produto.category === categoria);
        this.exibirProdutosFiltrados(produtosFiltrados, categoria);
    }

    // Método para filtrar produtos por termo de pesquisa
    filtrarPorTermo(termo) {
        const produtosFiltrados = this.produtos.filter((produto) => produto.title.toLowerCase().includes(termo.toLowerCase()));
        this.exibirProdutosFiltrados(produtosFiltrados, termo);
    }

    // Método para exibir produtos filtrados
    exibirProdutosFiltrados(produtosFiltrados, filtro) {
        $("#produtos-section").empty();

        produtosFiltrados.forEach((produto) => {
            const produtoHtml = this.criarProdutoHtml(produto, produto.id);
            $("#produtos-section").append(produtoHtml);
        });

        if (produtosFiltrados.length === 0) {
            $("#produtos-section").html(`<p>Nenhum produto encontrado para "${filtro}".</p>`);
        }
    }
}

// Instância da classe ProdutoManager
const produtoManager = new ProdutoManager();

$(document).ready(() => {
    // Instância da classe ProdutoManager
    const produtoManager = new ProdutoManager();

    // Aguarda o documento estar pronto para carregar os produtos
    produtoManager.carregarProdutos();

    // Adiciona um ouvinte de eventos para o link "navbar-brand offset-md-1"
    $(".navbar-brand.offset-md-1").on("click", (event) => {
        // Evita o comportamento padrão do link (neste caso, a página não será redirecionada)
        event.preventDefault();
        
        // Recarrega a página
        window.location.reload();
    });
});
