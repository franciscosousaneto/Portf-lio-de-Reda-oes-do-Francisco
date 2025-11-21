document.addEventListener('DOMContentLoaded', function() {
    const menuNav = document.getElementById('menu');
    
    // --- Mapeamento de Melhorias ---
    const mapeamentoMelhorias = {
        'cronica-01': 'ensaio-11', // NOVO TEMA
        'cronica-02': 'ensaio-12',
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
     * Gera o texto completo (simulado ou real) da redação.
     */
    function generateCorpoTexto(id, title) {
        // --- CONTEÚDO REAL DA CRÔNICA 01 ---
        if (id === 'cronica-01') {
             const textoCompleto = `
                Nós últimos anos, tem se tornado cada vez mais comum ver jovens, inclusive menores de idade, realizando diversos tipos de procedimentos estéticos como harmonização facial, rinoplastia e botox. Esse fenômeno é impulsionado, principalmente, pela influência das redes sociais, que idealizam padrões de beleza muitas vezes inatingíveis. Filtros e edições de imagem criam modelos artificiais, levando muitos a acreditar que precisam de mudanças corporais para poder se valorizem dentro da sociedade contemporânea.
                
                Outro fator que contribui para essa tendência é a maior acessibilidade aos procedimentos. Avanços tecnológicos permitiram intervenções menos evasivas, com recuperação rápida e custos mais baixos. Com isso, a estética deixou de ser vista como algo restrito a celebridades, passando a ser recebido como parte do "autocuidado". Portanto, essa normalização pode fazer com que os riscos físicos e psicológicos cresçam, sobretudo entre aqueles que estão em formação de identidade. 
                
                Do ponto de vista da saúde mental, a pressão pra atender aos padrões estéticos pode gerar sérias consequências. A ONU para o aumento de casos de ansiedade, depressão e distúrbios alimentares relacionados a autoimagem, especialmente entre os jovens. A insatisfação c o próprio corpo, alimentada por comparações, pode levar por uma busca compulsiva por procedimentos, muitas vezes sem a necessidade médica.
                
                Desse forma, o crescimento da procura por intervenções médicas entre os jovens é resultado de um contexto sociocultural que valoriza excessivamente a aparência. Para evitar essa problemática, é essencial promover a educação midiática, incentivar a aceitação da diversidade corporal e garantir que qualquer procedimento seja feito com orientação profissional, priorizando sempre o bem-estar físico e mental.
            `;
            // Formata o texto em parágrafos HTML
            return textoCompleto.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('');
        }
        
        // --- CONTEÚDO SIMULADO DO ENSAIO 11 (MELHORIA 1) ---
        if (id === 'ensaio-11') {
            return `
                <p>O Ensaio 11 (A Ética da Imagem na Era Digital) aprofunda a discussão da Crônica 01, movendo o foco da descrição do fenômeno para a sua validação ética e social. Ele argumenta que a busca por procedimentos estéticos entre jovens não é apenas um resultado da pressão social, mas sim uma manifestação da crise de identidade e da mercantilização do corpo na sociedade de consumo.</p>
                <p>O conceito de "autocuidado" é aqui desconstruído, sugerindo que, em muitos casos, ele mascara uma compulsão por conformidade, incentivada pelo algoritmo das redes sociais. A redação aprimorada propõe uma estrutura regulatória mais rígida e enfatiza a responsabilidade dos profissionais de saúde e dos pais na proteção da integridade psicológica de menores, em contraste com a simples recomendação de "orientação profissional".</p>
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
    function exibirRedacaoCompleta(title, intro, corpoTexto, melhoriaHTML = '') {
        const areaLeitura = document.getElementById('area-leitura-completa');
        const containerLeitura = areaLeitura.querySelector('.container-leitura');
        
        const contentHTML = `
            <a href="#conteudo" id="btn-voltar-topo" class="btn-voltar">⬆️ Voltar à Lista de Crônicas</a>
            
            <h2 class="titulo-capitulo">${title.replace('(Melhoria 1)', '(Original)')}</h2>
            <p class="introducao-modal">${intro}</p>
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