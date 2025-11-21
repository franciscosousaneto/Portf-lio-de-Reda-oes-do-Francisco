document.addEventListener('DOMContentLoaded', function() {
    const menuNav = document.getElementById('menu');
    const sections = document.querySelectorAll('.redacao, .hero, .sobre');

    // 1. Definição de todos os links de navegação
    // (Código do seu menu existente)
    const links = [
        { nome: '🏰 Início', href: '#inicio' },
        { nome: '📜 Crônicas', href: '#cronicas' },
        { nome: '🖋️ Ensaios', href: '#ensaios' },
    ];
    
    // Adicionar links para cada uma das 14 redações
    for (let i = 1; i <= 10; i++) {
        links.push({ nome: `Crônica ${i.toString().padStart(2, '0')}`, href: `#cronica-${i.toString().padStart(2, '0')}` });
    }
    for (let i = 11; i <= 14; i++) {
        links.push({ nome: `Ensaio ${i.toString().padStart(2, '0')}`, href: `#ensaio-${i}` });
    }

    links.push({ nome: '🔍 Sobre o Sábio', href: '#sobre' });

    // 2. Criação do HTML do Menu e Inserção
    let menuHTML = '';
    links.forEach(link => {
        // Usamos o atributo 'data-target' para o scroll e o 'href' para fallback
        menuHTML += `<a href="${link.href}" data-target="${link.href}">${link.nome}</a>`;
    });
    menuNav.innerHTML = menuHTML;

    // 3. Adição da Função de Scroll Suave
    document.querySelectorAll('#menu a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); 
            const targetId = this.getAttribute('data-target');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' 
                });
            }
        });
    });
    
    // ----------------------------------------------------
    // FUNÇÃO PRINCIPAL: Exibir Redação Completa
    // ----------------------------------------------------
    
    // Anexa um event listener a cada seção de redação (cronica e ensaio)
    document.querySelectorAll('.cronica, .ensaio').forEach(section => {
        section.style.cursor = 'pointer'; // Indica que é clicável
        section.addEventListener('click', function() {
            // Pega o título e a primeira frase da seção clicada
            const title = this.querySelector('.titulo-capitulo').innerText;
            const intro = this.querySelector('p').innerText;
            
            // Chama a função para criar e mostrar o overlay
            exibirRedacaoCompleta(title, intro);
        });
    });

    /**
     * Cria e exibe um modal/overlay com o conteúdo completo da redação.
     * @param {string} title - O título da redação.
     * @param {string} intro - A frase introdutória.
     */
    function exibirRedacaoCompleta(title, intro) {
        // Conteúdo longo simulado
        const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. (Repetição para simular texto longo) Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        
        // Estrutura do Modal
        const modalHTML = `
            <div id="redacao-modal" class="redacao-modal">
                <div class="modal-content pergaminho-completo">
                    <button class="fechar-btn">&times;</button>
                    <h2 class="titulo-capitulo">${title}</h2>
                    <p class="introducao-modal">${intro}</p>
                    <hr class="linha-tinta">
                    <p class="corpo-texto">${lorem}</p>
                    <p class="corpo-texto">${lorem}</p>
                    <p class="corpo-texto">${lorem}</p>
                </div>
            </div>
        `;

        // Insere o modal no corpo do documento
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        document.body.style.overflow = 'hidden'; // Impede o scroll na página principal
        
        // Adiciona o evento para fechar o modal
        const modal = document.getElementById('redacao-modal');
        modal.querySelector('.fechar-btn').addEventListener('click', fecharModal);
        
        // Fecha o modal ao clicar fora dele
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                fecharModal();
            }
        });
    }

    // Função para fechar o modal
    function fecharModal() {
        const modal = document.getElementById('redacao-modal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = ''; // Restaura o scroll
        }
    }
    
    // 4. Efeito de Aparecimento (Intersection Observer - Deixado aqui por completude)
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                 // Esta parte ficaria inativa se você não tiver classes de animação CSS
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});