document.addEventListener('DOMContentLoaded', function() {
    const menuNav = document.getElementById('menu');
    const sections = document.querySelectorAll('.redacao, .hero, .sobre');

    // 1. Definição de todos os links de navegação
    // ... (Seu código para definir e gerar links) ...

    // 2. Criação do HTML do Menu e Inserção
    // ... (Seu código para inserir o HTML do menu) ...

    // 3. Adição da Função de Scroll Suave
    // ... (Seu código de scroll suave) ...
    
    // ----------------------------------------------------
    // FUNÇÃO PRINCIPAL: Exibir Redação Completa (Modal)
    // ----------------------------------------------------
    
    // Anexa um event listener a cada seção de redação (cronica e ensaio)
    document.querySelectorAll('.cronica, .ensaio').forEach(section => {
        section.style.cursor = 'pointer'; // Indica que é clicável
        section.addEventListener('click', function() {
            const title = this.querySelector('.titulo-capitulo').innerText;
            const intro = this.querySelector('p').innerText;
            exibirRedacaoCompleta(title, intro);
        });
    });

    /**
     * Cria e exibe um modal/overlay com o conteúdo completo da redação.
     * @param {string} title - O título da redação.
     * @param {string} intro - A frase introdutória.
     */
    function exibirRedacaoCompleta(title, intro) {
        // ... (Seu código para gerar o modal HTML e inseri-lo no DOM) ...
        // ... (Seu código para adicionar eventos de fecharModal) ...
    }

    // Função para fechar o modal
    function fecharModal() {
        // ... (Seu código para remover o modal) ...
    }
    
    // 4. Efeito de Aparecimento (Intersection Observer)
    // ... (Seu código para Intersection Observer) ...
});