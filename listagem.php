<!-- listagem.php -->
<?php
include "conexao.php";

// Lógica para recuperar e exibir os produtos do banco de dados

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST["editar"])) {
        $produtoId = $_POST["produtoId"];
        header("Location: edita.php?id=$produtoId");
        exit();
    } elseif (isset($_POST["excluir"])) {
        $produtoId = $_POST["produtoId"];
        // Lógica para excluir o produto no banco de dados
        $sql = "DELETE FROM produtos WHERE id = $produtoId";
        if ($conn->query($sql) === TRUE) {
            // Redireciona de volta para a listagem após excluir
            header("Location: listagem.php");
            exit();
        } else {
            echo "Erro ao excluir produto: " . $conn->error;
        }
    }
}

$conn->close();
?>

<!-- HTML para exibir a lista de produtos -->
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <!-- Adicione os metadados, links de estilo, etc., conforme necessário -->
</head>

<body>
    <!-- Exibição da lista de produtos -->
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            <?php
            // Lógica para recuperar e exibir os produtos do banco de dados
            // Substitua isso pela lógica real para obter os produtos do banco de dados

            echo "<tr>
                    <td>1</td>
                    <td>Produto 1</td>
                    <td>Descrição do Produto 1</td>
                    <td>10.00</td>
                    <td>Categoria 1</td>
                    <td>
                        <form method='post'>
                            <input type='hidden' name='produtoId' value='1'>
                            <button type='submit' name='editar'>Editar</button>
                            <button type='submit' name='excluir'>Excluir</button>
                        </form>
                    </td>
                </tr>";
            ?>
        </tbody>
    </table>

    <!-- Adicione scripts JavaScript conforme necessário -->
</body>

</html>
