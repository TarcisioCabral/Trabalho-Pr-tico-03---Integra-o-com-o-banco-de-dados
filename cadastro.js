document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnCadastrar').addEventListener('click', function () {
        var form = document.getElementById('cadastroForm');
        var notification = document.getElementById('notification');

        var formData = new FormData(form);

        fetch('cadastro.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            // Limpeza dos campos do formulário
            form.reset();

            // Exibição da notificação de sucesso
            notification.innerHTML = '<div class="alert alert-success" role="alert">Produto cadastrado com sucesso!</div>';
        })
        .catch(error => {
            // Exibição da mensagem de erro
            notification.innerHTML = '<div class="alert alert-danger" role="alert">Erro ao cadastrar produto: ' + error + '</div>';
        });
    });
});
