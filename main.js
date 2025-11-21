document.addEventListener('DOMContentLoaded', function() {
    const menuNav = document.getElementById('menu');
    
    // --- Dados do Menu ---
    const links = [
        { nome: '🏰 Início', href: '#inicio' },
        { nome: '📜 Crônicas', href: '#cronicas' },
        { nome: '🖋️ Ensaios', href: '#ensaios' },
    ];
    
    // Adicionar links para cada redação (para o menu)
    for (let i = 1; i <= 10; i++) {
        links.push({ nome: `Crônica ${i.toString().padStart(2, '0')}`, href: `#cronica-${i.toString().padStart(2, '0')}` });
    }
    for (let i = 11; i <= 14; i++) {
        links.push({ nome: `Ensaio ${i.toString().padStart(2, '0')}`, href: `#ensaio-${i}` });
    }

    links.push({ nome: '🔍 Sobre o Sábio', href: '#sobre' });

    // --- 1. Criação do HTML do Menu e Inserção ---
    let menuHTML = '<ul class="lista-menu">';
    links.forEach(link => {
        menuHTML += `<li><a href="${link.href}" data-target="${link.href}" class="link-menu">${link.nome}</a></li>`;
    });
    menuHTML += '</ul>';
    menuNav.innerHTML = menuHTML;

    // --- 2. Scroll Suave ---
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
    
    // --- 3. Função Modal (Exibir Redação Completa) ---
    
    // Anexa o listener de clique a todas as crônicas e ensaios
    document.querySelectorAll('.cronica, .ensaio').forEach(article => {
        article.addEventListener('click', function() {
            const title = this.querySelector('.titulo-capitulo').innerText;
            const intro = this.querySelector('p').innerText;
            exibirRedacaoCompleta(title, intro);
        });
    });

    /**
     * Cria e exibe o modal com o conteúdo simulado da redação.
     */
    function exibirRedacaoCompleta(title, intro) {
        // Texto genérico longo para simular o corpo da redação
        const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. (Repetição para simular texto longo) Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        
        const modalHTML = `
            <div id="redacao-modal" class="redacao-modal">
                <div class="modal-content pergaminho-completo">
                    <button class="fechar-btn" aria-label="Fechar Redação Completa">&times;</button>
                    <h2 class="titulo-capitulo">${title}</h2>
                    <p class="introducao-modal">${intro}</p>
                    <hr class="linha-tinta">
                    <p class="corpo-texto">${lorem}</p>
                    <p class="corpo-texto">${lorem}</p>
                    <p class="corpo-texto">${lorem}</p>
                    <p class="corpo-texto">${lorem}</p>
                </div>
            </div>
        `;

        // Insere o modal e trava o scroll da página
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        document.body.style.overflow = 'hidden'; 
        
        // Adiciona eventos de fechamento
        const modal = document.getElementById('redacao-modal');
        modal.querySelector('.fechar-btn').addEventListener('click', fecharModal);
        
        // Fecha o modal ao clicar no overlay (fora do conteúdo)
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                fecharModal();
            }
        });
    }

    function fecharModal() {
        const modal = document.getElementById('redacao-modal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = ''; // Restaura o scroll
        }
    }

    // --- 4. Efeito de Aparecimento (Intersection Observer - Opcional) ---
    // Deixado aqui como um gancho para futuras animações de entrada
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                 // Adicione classes de animação aqui se desejar um fade-in.
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.redacao, .hero, .sobre').forEach(section => {
        observer.observe(section);
    });
});