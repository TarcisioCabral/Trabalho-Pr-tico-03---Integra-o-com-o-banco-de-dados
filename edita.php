<!-- edita.php -->
<?php
include "conexao.php";

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["id"])) {
    $produtoId = $_GET["id"];
    // Lógica para recuperar os detalhes do produto do banco de dados
    $sql = "SELECT * FROM produtos WHERE id = $produtoId";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $produto = $result->fetch_assoc();
    } else {
        echo "Produto não encontrado.";
        exit();
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lógica para atualizar o produto no banco de dados
    $produtoId = $_POST["produtoId"];
    $titulo = $_POST["titulo"];
    $descricao = $_POST["descricao"];
    $preco = $_POST["preco"];
    $categoria = $_POST["categoria"];

    $sql = "UPDATE produtos SET titulo='$titulo', descricao='$descricao', preco='$preco', categoria='$categoria' WHERE id = $produtoId";

    if ($conn->query($sql) === TRUE) {
        echo "Produto atualizado com sucesso!";
    } else {
        echo "Erro ao atualizar produto: " . $conn->error;
    }
}

$conn->close();
?>

<!-- edita.html -->
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <!-- Adicione os metadados, links de estilo, etc., conforme necessário -->
</head>

<body>
    <h2>Editar Produto</h2>
    <form action="edita.php" method="post">
        <input type="hidden" name="produtoId" value="<?php echo $produtoId; ?>">
        <div>
            <label for="titulo">Título:</label>
            <input type="text" id="titulo" name="titulo" value="<?php echo $produto['titulo']; ?>" required>
        </div>
        <div>
            <label for="descricao">Descrição:</label>
            <textarea id="descricao" name="descricao" required><?php echo $produto['descricao']; ?></textarea>
        </div>
        <div>
            <label for="preco">Preço:</label>
            <input type="number" id="preco" name="preco" step="0.01" min="0" value="<?php echo $produto['preco']; ?>" required>
        </div>
        <div>
            <label for="categoria">Categoria:</label>
            <select id="categoria" name="categoria" required>
                <option value="Electronics" <?php echo ($produto['categoria'] == 'Electronics') ? 'selected' : ''; ?>>Electronics</option>
                <option value="Jewelery" <?php echo ($produto['categoria'] == 'Jewelery') ? 'selected' : ''; ?>>Jewelery</option>
                <option value="MensClothing" <?php echo ($produto['categoria'] == 'MensClothing') ? 'selected' : ''; ?>>Men's Clothing</option>
                <option value="WomensClothing" <?php echo ($produto['categoria'] == 'WomensClothing') ? 'selected' : ''; ?>>Women's Clothing</option>
            </select>
        </div>
        <button type="submit">Atualizar Produto</button>
    </form>
</body>

</html>
