document.addEventListener('DOMContentLoaded', function() {
    const menuNav = document.getElementById('menu');
    
    // --- Mapeamento de Melhorias ---
    // A chave é o ID da Crônica (original), o valor é o ID do Ensaio (melhoria)
    const mapeamentoMelhorias = {
        'cronica-01': 'ensaio-11',
        'cronica-02': 'ensaio-12',
        'cronica-03': 'ensaio-13',
        'cronica-04': 'ensaio-14'
        // Crônicas 05 a 10 não têm melhoria correspondente neste exemplo
    };

    // --- Dados do Menu (Links e Estrutura) ---
    const links = [
        { nome: '🏰 Início', href: '#inicio' },
        { nome: '📜 Crônicas', href: '#cronicas' },
        { nome: '🖋️ Ensaios (Melhorias)', href: '#ensaios' },
    ];
    
    // Adiciona links para todos os 14 artigos
    for (let i = 1; i <= 10; i++) {
        links.push({ nome: `Crônica ${i.toString().padStart(2, '0')}`, href: `#cronica-${i.toString().padStart(2, '0')}` });
    }
    for (let i = 11; i <= 14; i++) {
        links.push({ nome: `Ensaio ${i}`, href: `#ensaio-${i}` });
    }
    links.push({ nome: '🔍 Sobre o Sábio', href: '#sobre' });

    // 1. Criação e Inserção do Menu (Lógica de Scroll Suave)
    let menuHTML = '<ul class="lista-menu">';
    links.forEach(link => {
        menuHTML += `<li><a href="${link.href}" data-target="${link.href}" class="link-menu">${link.nome}</a></li>`;
    });
    menuHTML += '</ul>';
    menuNav.innerHTML = menuHTML;

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
    
    // 3. Clique no Artigo -> Navegação para Leitura Completa
    
    document.querySelectorAll('.cronica, .ensaio').forEach(article => {
        article.addEventListener('click', function() {
            const articleId = this.id;
            const title = this.querySelector('.titulo-capitulo').innerText;
            const intro = this.querySelector('p').innerText;
            
            // Verifica se é uma Crônica com Melhoria Mapeada
            const ensaioId = mapeamentoMelhorias[articleId];
            
            // Obtém o corpo da Crônica
            const corpoCronica = generateCorpoTexto(articleId, title);

            let melhoriaHTML = '';
            if (ensaioId) {
                // Se houver Ensaio correspondente, pega seus dados para a melhoria
                const ensaioElement = document.getElementById(ensaioId);
                const ensaioTitle = ensaioElement.querySelector('.titulo-capitulo').innerText;
                const corpoEnsaio = generateCorpoTexto(ensaioId, ensaioTitle);
                
                melhoriaHTML = `
                    <h3 class="titulo-melhoria">✨ Ensaio Filosófico: A Versão Aprimorada</h3>
                    <p class="introducao-modal">O Ensaio a seguir reflete a revisão filosófica e técnica da redação original, incorporando maior profundidade e complexidade argumentativa.</p>
                    <h4 class="titulo-capitulo" style="font-size: 2em;">${ensaioTitle}</h4>
                    ${corpoEnsaio}
                `;
            }

            exibirRedacaoCompleta(title, intro, corpoCronica, melhoriaHTML);
        });
    });

    /**
     * Gera um texto de placeholder dinâmico baseado no ID (simula a busca do conteúdo).
     */
    function generateCorpoTexto(id, title) {
        // Texto genérico que varia um pouco por tipo/ID
        let baseText = `Esta é a redação completa para "${title}".`;
        
        if (id.startsWith('cronica')) {
            baseText += " O foco aqui é na narrativa e na descrição dos eventos, com a linguagem buscando evocar o drama e a ação do cenário medieval. Os fatos são apresentados como foram registrados na época, com uma subjetividade histórica evidente. A estrutura é simples e direta. (Repetição para simular texto longo) Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
        } else if (id.startsWith('ensaio')) {
            baseText += " O foco aqui é na argumentação, análise crítica e desenvolvimento de teses sobre os eventos descritos na Crônica original. A linguagem é formal e acadêmica, desprendendo-se da emoção para focar na lógica e na filosofia por trás dos acontecimentos. A estrutura é analítica, com introdução, desenvolvimento e conclusão bem definidos. (Repetição para simular texto longo) Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
        }
        
        return `<p>${baseText}</p><p>Mais parágrafos aqui...</p>`;
    }

    /**
     * Injeta o conteúdo (Crônica + Melhoria opcional) na seção de leitura e navega.
     */
    function exibirRedacaoCompleta(title, intro, corpoTexto, melhoriaHTML = '') {
        const areaLeitura = document.getElementById('area-leitura-completa');
        const containerLeitura = areaLeitura.querySelector('.container-leitura');
        
        const contentHTML = `
            <a href="#conteudo" id="btn-voltar-topo" class="btn-voltar">⬆️ Voltar à Lista de Crônicas</a>
            
            <h2 class="titulo-capitulo">${title} (Original)</h2>
            <p class="introducao-modal">${intro}</p>
            <hr class="linha-tinta">
            ${corpoTexto}
            
            ${melhoriaHTML} <a href="#conteudo" class="btn-voltar" style="margin-top: 50px;">⬆️ Voltar ao Topo da Lista</a>
        `;

        containerLeitura.innerHTML = contentHTML;
        areaLeitura.style.display = 'block';

        areaLeitura.scrollIntoView({
            behavior: 'smooth',
            block: 'start' 
        });

        // Adiciona evento de clique para o botão "Voltar à Lista"
        document.getElementById('btn-voltar-topo').addEventListener('click', function(e) {
            e.preventDefault();
            areaLeitura.style.display = 'none';
            document.getElementById('conteudo').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
});