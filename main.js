document.addEventListener('DOMContentLoaded', function() {
    const menuNav = document.getElementById('menu');
    
    // --- Dados do Menu (Links e Estrutura) ---
    const links = [
        { nome: '🏰 Início', href: '#inicio' },
        { nome: '📜 Crônicas', href: '#cronicas' },
        { nome: '🖋️ Ensaios', href: '#ensaios' },
    ];
    
    // Adiciona links para cada redação individual
    for (let i = 1; i <= 10; i++) {
        links.push({ nome: `Crônica ${i.toString().padStart(2, '0')}`, href: `#cronica-${i.toString().padStart(2, '0')}` });
    }
    for (let i = 11; i <= 14; i++) {
        links.push({ nome: `Ensaio ${i.toString().padStart(2, '0')}`, href: `#ensaio-${i}` });
    }
    links.push({ nome: '🔍 Sobre o Sábio', href: '#sobre' });

    // 1. Criação e Inserção do Menu
    let menuHTML = '<ul class="lista-menu">';
    links.forEach(link => {
        menuHTML += `<li><a href="${link.href}" data-target="${link.href}" class="link-menu">${link.nome}</a></li>`;
    });
    menuHTML += '</ul>';
    menuNav.innerHTML = menuHTML;

    // 2. Scroll Suave para o Menu
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
            const title = this.querySelector('.titulo-capitulo').innerText;
            const intro = this.querySelector('p').innerText;
            
            const corpoTexto = generateCorpoTexto(); 
            
            exibirRedacaoCompleta(title, intro, corpoTexto);
        });
    });

    /**
     * Gera um texto longo de placeholder para simular o corpo da redação.
     */
    function generateCorpoTexto() {
        const lorem = "Em tempos de escuridão e névoa, a coragem era a única moeda. A Cidade Murada jazia sob um cerco espectral, e apenas o som da água pingando nas galerias subterrâneas quebrava o silêncio. A lenda contava que, nas profundezas da Masmorra de Leitura, estava o grimório com a chave para quebrar o feitiço, mas a cada passo, a escuridão se aprofundava e as muralhas pareciam se fechar. Os sussurros dos antigos guardiões ecoavam, testando a sanidade e a força de vontade do escrivão que ousasse descer. \n\n O ferro frio das grades era a única companhia. Não havia pergaminho, apenas a rocha escura. O desafio não era apenas transcrever, mas sobreviver à própria experiência, transformando o medo em tinta. O Desafio da Cidade Murada não era uma batalha de espadas, mas uma guerra de nervos contra a solidão e o peso da história enterrada. A cada palavra registrada, uma fresta de luz se abria, provando que a pena, de fato, era a espada mais poderosa. \n\n A esperança residia no topo, mas a verdade estava abaixo, selada nas profundezas do esquecimento. O grimório, quando encontrado, não continha palavras mágicas, mas sim a história simples e cruel dos homens que construíram o muro. E ao registrar esse fato, o feitiço foi quebrado, não por magia, mas por conhecimento. A luz da razão finalmente penetrou a escuridão da masmorra, e o escrivão pôde finalmente descansar.";
        return `<p>${lorem.replace(/\n\n/g, '</p><p>')}</p>`;
    }

    /**
     * Injeta o conteúdo na seção de leitura e navega até ela.
     */
    function exibirRedacaoCompleta(title, intro, corpoTexto) {
        const areaLeitura = document.getElementById('area-leitura-completa');
        const containerLeitura = areaLeitura.querySelector('.container-leitura');
        
        const contentHTML = `
            <a href="#conteudo" id="btn-voltar-topo" class="btn-voltar">⬆️ Voltar à Lista de Crônicas</a>
            <h2 class="titulo-capitulo">${title}</h2>
            <p class="introducao-modal">${intro}</p>
            <hr class="linha-tinta">
            ${corpoTexto}
            <a href="#conteudo" class="btn-voltar" style="margin-top: 30px;">⬆️ Voltar ao Topo da Lista</a>
        `;

        containerLeitura.innerHTML = contentHTML;
        areaLeitura.style.display = 'block';

        // Navega suavemente para a área de leitura
        areaLeitura.scrollIntoView({
            behavior: 'smooth',
            block: 'start' 
        });

        // Adiciona evento de clique para o botão "Voltar à Lista"
        document.getElementById('btn-voltar-topo').addEventListener('click', function(e) {
            e.preventDefault();
            
            // Oculta a área de leitura e rola para a lista principal
            areaLeitura.style.display = 'none';
            document.getElementById('conteudo').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
});