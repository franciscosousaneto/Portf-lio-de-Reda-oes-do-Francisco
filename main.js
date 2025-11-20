document.addEventListener('DOMContentLoaded', function() {
    const menuNav = document.getElementById('menu');
    const sections = document.querySelectorAll('.redacao, .hero, .sobre');

    // 1. Definição de todos os links de navegação
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
        menuHTML += `<a href="${link.href}" data-target="${link.href}">${link.nome}</a>`;
    });
    menuNav.innerHTML = menuHTML;

    // 3. Adição da Função de Scroll Suave (ir para cada área)
    document.querySelectorAll('#menu a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Previne o comportamento padrão (pular direto)
            e.preventDefault(); 
            
            // Pega o ID alvo (ex: '#cronica-01')
            const targetId = this.getAttribute('data-target');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Rola suavemente para a seção
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Alinha o topo da seção ao topo da viewport
                });
            }
        });
    });

    // 4. Efeito de Aparecimento (Opcional, mas mantém a animação)
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe 'show' (que não está no CSS atual, mas poderia ser usada para fade-in)
                // Vamos apenas garantir que ela esteja visível, caso o CSS original a escondesse.
                // entry.target.classList.add('show'); 
                // Removido para manter a simplicidade, mas o código original estava preparado.
            }
        });
    }, {
        threshold: 0.1 // 10% do elemento visível
    });

    // Observa todas as seções para a animação
    sections.forEach(section => {
        observer.observe(section);
    });
});