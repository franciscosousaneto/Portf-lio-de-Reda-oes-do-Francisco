document.addEventListener('DOMContentLoaded', function() {
    const menuNav = document.getElementById('menu');
    
    // --- Mapeamento de Melhorias ---
    const mapeamentoMelhorias = {
        'cronica-01': 'ensaio-11', 
        'cronica-02': 'ensaio-12', // ATUALIZADO
        'cronica-03': 'ensaio-13',
        'cronica-04': 'ensaio-14'
        // Crônicas 05 a 10 não têm melhoria correspondente
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
            const fullText = this.querySelector('p').innerText.trim(); 
            
            const ensaioId = mapeamentoMelhorias[articleId];
            
            // Obtém o corpo da Crônica
            const corpoCronica = generateCorpoTexto(articleId, title, fullText);

            let melhoriaHTML = '';
            if (ensaioId) {
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

            // A introdução só é exibida se for curta (ou seja, se não for a Crônica 01 ou 02)
            // Se for Crônica 01 ou 02, o corpoTexto já é o texto completo, então a intro fica vazia.
            const introDisplay = (articleId === 'cronica-01' || articleId === 'cronica-02') ? '' : fullText;
            
            exibirRedacaoCompleta(title, introDisplay, corpoCronica, melhoriaHTML);
        });
    });

    /**
     * Gera o texto completo (simulado ou real) da redação, formatando-o em parágrafos.
     */
    function generateCorpoTexto(id, title, fullText = null) {
        
        // --- CONTEÚDO REAL DA CRÔNICA 01 e 02 (Formata o texto pego do HTML) ---
        if (id === 'cronica-01' || id === 'cronica-02') {
             if (!fullText) return '<p>Erro: Conteúdo completo não encontrado no HTML.</p>';

             // Heurística para quebrar o texto em parágrafos para melhor visualização
            const paragraphs = fullText.split(/(?<=[.?!])\s+(?=[A-ZÊÁÉÍÓÚÀÈÌÒÙÃÕÂÊÎÔÛÜÇ])/g);
            return paragraphs.map(p => `<p>${p.trim()}</p>`).join('');
        }
        
        // --- CONTEÚDO SIMULADO DO ENSAIO 11 (MELHORIA 1) ---
        if (id === 'ensaio-11') {
            return `
                <p>O Ensaio 11 (A Ética da Imagem na Era Digital) aprofunda a discussão da Crônica 01, movendo o foco da descrição do fenômeno para a sua validação ética e social. Ele argumenta que a busca por procedimentos estéticos entre jovens não é apenas um resultado da pressão social, mas sim uma manifestação da crise de identidade e da mercantilização do corpo na sociedade de consumo.</p>
                <p>O conceito de "autocuidado" é aqui desconstruído, sugerindo que, em muitos casos, ele mascara uma compulsão por conformidade, incentivada pelo algoritmo das redes sociais. A redação aprimorada propõe uma estrutura regulatória mais rígida e enfatiza a responsabilidade dos profissionais de saúde e dos pais na proteção da integridade psicológica de menores, em contraste com a simples recomendação de "orientação profissional".</p>
            `;
        }
        
        // --- CONTEÚDO SIMULADO DO ENSAIO 12 (MELHORIA 2) ---
        if (id === 'ensaio-12') {
            return `
                <p>O Ensaio 12 (A Modernidade Líquida e a Inclusão Efetiva) expande a crítica à mera "efetividade das políticas públicas" mencionada na Crônica 02, focando na natureza volátil e superficial da solidariedade na sociedade líquida de Bauman. Ele argumenta que a inclusão exige mais do que rampas e cotas; ela demanda uma reestruturação do tempo e do valor social, onde a lentidão e a diversidade não sejam vistas como ineficiência, mas como riqueza humana.</p>
                <p>A redação aprimorada sugere que a invisibilidade das pessoas com deficiência é um sintoma da incapacidade da sociedade moderna de lidar com a diferença de forma permanente e integrada, preferindo soluções temporárias ou puramente burocráticas que falham em mudar a atitude cultural subjacente.</p>
            `;
        }

        // --- OUTRAS CRÔNICAS E ENSAIOS SIMULADOS ---
        let baseText = `Esta é a redação completa para "${title}". (Conteúdo Simulado)`;
        
        if (id.startsWith('cronica')) {
            baseText += " O foco é na narrativa e na descrição dos eventos do reino, com a linguagem buscando evocar o drama e a ação. Os fatos são apresentados com uma subjetividade histórica evidente. (Repetição para simular texto longo) Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
        } else if (id.startsWith('ensaio')) {
            baseText += " O foco é na argumentação, análise crítica e desenvolvimento de teses sobre os eventos da Crônica original. A linguagem é formal e acadêmica, focando na lógica e na filosofia. A estrutura é analítica. (Repetição para simular texto longo) Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
        }
        
        return `<p>${baseText}</p><p>Mais parágrafos aqui...</p>`;
    }

    /**
     * Injeta o conteúdo (Crônica + Melhoria opcional) na seção de leitura e navega.
     */
    function exibirRedacaoCompleta(title, introDisplay, corpoTexto, melhoriaHTML = '') {
        const areaLeitura = document.getElementById('area-leitura-completa');
        const containerLeitura = areaLeitura.querySelector('.container-leitura');
        
        const introElement = introDisplay ? `<p class="introducao-modal">${introDisplay}</p>` : '';

        const contentHTML = `
            <a href="#conteudo" id="btn-voltar-topo" class="btn-voltar">⬆️ Voltar à Lista de Crônicas</a>
            
            <h2 class="titulo-capitulo">${title.replace('(Melhoria 1)', '(Original)').replace('(Melhoria 2)', '(Original)')}</h2>
            ${introElement}
            <hr class="linha-tinta">
            ${corpoTexto}
            
            ${melhoriaHTML} 

            <a href="#conteudo" class="btn-voltar" style="margin-top: 50px;">⬆️ Voltar ao Topo da Lista</a>
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