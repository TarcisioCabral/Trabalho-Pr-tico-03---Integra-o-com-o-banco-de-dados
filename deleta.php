<?php
include "conexao.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $produtoId = $_POST["produtoId"];

    $sql = "DELETE FROM produtos WHERE id = $produtoId";

    if ($conn->query($sql) === TRUE) {
        echo "Produto deletado com sucesso!";
    } else {
        echo "Erro ao deletar produto: " . $conn->error;
    }
}

$conn->close();
?>
