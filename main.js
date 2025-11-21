document.addEventListener('DOMContentLoaded', function() {
    const menuNav = document.getElementById('menu');
    
    // --- Mapeamento de Melhorias ---
    const mapeamentoMelhorias = {
        'cronica-01': 'ensaio-11', 
        'cronica-02': 'ensaio-12', 
        'cronica-03': 'ensaio-13', 
        'cronica-04': 'ensaio-14',
        'cronica-05': 'ensaio-15',
        'cronica-06': 'ensaio-16',
        'cronica-07': 'ensaio-17',
        'cronica-08': 'ensaio-18',
        'cronica-09': 'ensaio-19',
        'cronica-10': 'ensaio-20',
        'cronica-11': 'ensaio-21', // Novo Mapeamento
        'cronica-12': 'ensaio-22', // Novo Mapeamento
        'cronica-13': 'ensaio-23', // Novo Mapeamento
        'cronica-14': 'ensaio-24'  // Novo Mapeamento
    };

    // --- Dados do Menu (Links e Estrutura) ---
    const links = [
        { nome: '🏰 Início', href: '#inicio' },
        { nome: '📜 Crônicas', href: '#cronicas' },
        { nome: '🖋️ Ensaios (Melhorias)', href: '#ensaios' },
    ];
    
    // Adiciona links para todas as 14 Crônicas
    for (let i = 1; i <= 14; i++) {
        links.push({ nome: `Crônica ${i.toString().padStart(2, '0')}`, href: `#cronica-${i.toString().padStart(2, '0')}` });
    }
    // Adiciona links para todos os 24 Ensaios
    for (let i = 11; i <= 24; i++) {
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

            // A introdução (resumo) só é exibida se o texto no HTML for curto (Crônicas 06 em diante)
            // Crônicas 01 a 05 têm o texto completo.
            const isFullText = (articleId === 'cronica-01' || articleId === 'cronica-02' || articleId === 'cronica-03' || articleId === 'cronica-04' || articleId === 'cronica-05');
            const introDisplay = isFullText ? '' : fullText;
            
            exibirRedacaoCompleta(title, introDisplay, corpoCronica, melhoriaHTML);
        });
    });

    /**
     * Gera o texto completo (simulado ou real) da redação, formatando-o em parágrafos.
     */
    function generateCorpoTexto(id, title, fullText = null) {
        
        // --- CONTEÚDO REAL DA CRÔNICA 01 a 05 (Formata o texto pego do HTML) ---
        if (id.startsWith('cronica') && (id === 'cronica-01' || id === 'cronica-02' || id === 'cronica-03' || id === 'cronica-04' || id === 'cronica-05')) {
             if (!fullText) return '<p>Erro: Conteúdo completo não encontrado no HTML.</p>';

             // Heurística para quebrar o texto em parágrafos. 
            const paragraphs = fullText.split(/(?<=[.?!])\s+(?=[A-ZÊÁÉÍÓÚÀÈÌÒÙÃÕÂÊÎÔÛÜÇ])/g);
            return paragraphs.map(p => `<p>${p.trim()}</p>`).join('');
        }
        
        // --- CONTEÚDO SIMULADO DOS ENSAIOS E CRÔNICAS PLACEHOLDERS (06-14) ---

        // MELHORIAS 1-5 (Conteúdo Mantido)
        if (id === 'ensaio-11') {
            return `<p>O Ensaio 11 (A Ética da Imagem na Era Digital) aprofunda a discussão da Crônica 01, movendo o foco da descrição do fenômeno para a sua validação ética e social. Ele argumenta que a busca por procedimentos estéticos entre jovens não é apenas um resultado da pressão social, mas sim uma manifestação da crise de identidade e da mercantilização do corpo na sociedade de consumo.</p><p>O conceito de "autocuidado" é aqui desconstruído, sugerindo que, em muitos casos, ele mascara uma compulsão por conformidade, incentivada pelo algoritmo das redes sociais. A redação aprimorada propõe uma estrutura regulatória mais rígida e enfatiza a responsabilidade dos profissionais de saúde e dos pais na proteção da integridade psicológica de menores, em contraste com a simples recomendação de "orientação profissional".</p>`;
        }
        if (id === 'ensaio-12') {
            return `<p>O Ensaio 12 (A Modernidade Líquida e a Inclusão Efetiva) expande a crítica à mera "efetividade das políticas públicas" mencionada na Crônica 02, focando na natureza volátil e superficial da solidariedade na sociedade líquida de Bauman. Ele argumenta que a inclusão exige mais do que rampas e cotas; ela demanda uma reestruturação do tempo e do valor social, onde a lentidão e a diversidade não sejam vistas como ineficiência, mas como riqueza humana.</p><p>A redação aprimorada sugere que a invisibilidade das pessoas com deficiência é um sintoma da incapacidade da sociedade moderna de lidar com a diferença de forma permanente e integrada, preferindo soluções temporárias ou puramente burocráticas que falham em mudar a atitude cultural subjacente.</p>`;
        }
        if (id === 'ensaio-13') {
            return `<p>O Ensaio 13 (O Bem-Estar Aristotélico em um Contexto de Desigualdade) leva a referência clássica da Crônica 03 a um nível mais profundo de análise sociofilosófica. Ele questiona se a "virtude" aristotélica, necessária para a eudaimonia (vida plena), pode ser alcançada por indivíduos cujas condições materiais de subsistência são sistematicamente negadas pela desigualdade estrutural.</p><p>O argumento central é que a busca pela qualidade de vida, no contexto brasileiro, deve ser vista como uma luta por "justiça material" antes de ser uma busca por "virtude". A redação aprimorada propõe que a falha do Estado em garantir saneamento e acesso à saúde anula o próprio potencial humano de florescer, transformando o conceito filosófico de bem-estar em um privilégio de classe.</p>`;
        }
        if (id === 'ensaio-14') {
            return `<p>O Ensaio 14 (Justiça Climática e a Governança Sólida) aprofunda a discussão sobre o desafio climático da Crônica 04, focando na responsabilidade ética e política de uma "governança ambiental mais sólida". Ele utiliza o conceito de Justiça Climática para argumentar que os impactos ambientais não são neutros, mas recaem desproporcionalmente sobre populações historicamente marginalizadas.</p><p>A redação aprimorada propõe que a mitigação (redução de emissões) deve ser indissociável da adaptação (proteção das comunidades vulneráveis) e que o incentivo à "economia verde" deve ser submetido a critérios de equidade social, e não apenas de eficiência econômica. O ensaio defende que a solução para o desafio climático no Brasil está na transição para um modelo que priorize a sociobiodiversidade e a soberania alimentar das comunidades tradicionais.</p>`;
        }
        if (id === 'ensaio-15') {
            return `<p>O Ensaio 15 (Logística Reversa e a Responsabilidade Estendida do Produtor) transforma a crítica à ausência de políticas da Crônica 05 em uma proposta de engenharia reversa. Ele discute a Lei 12.305/10 (PNRS) como ferramenta de justiça ambiental, focando na responsabilidade ética dos fabricantes de produtos tecnológicos (Obsolecência Programada).</p><p>A melhoria argumenta que a mera ampliação de pontos de coleta é insuficiente; é preciso redesenhar o ciclo de produção-consumo, incentivando o "design para desmonte" e a remanufatura. O foco passa da simples mitigação do lixo tóxico para a criação de cadeias de valor circulares que protejam os catadores e o meio ambiente desde a concepção do produto.</p>`;
        }
        
        // MELHORIAS 6-10 (Conteúdo Mantido)
        if (id === 'ensaio-16') {
            return `<p>O Ensaio 16 (Ética da Ganância e a Corrupção no Comércio) utiliza a narrativa da Crônica 06 como ponto de partida para um exame filosófico da ética econômica. Argumenta-se que a busca desenfreada por lucro, desvinculada da responsabilidade social (a "ganância"), é a base da corrupção sistêmica que desfaz os laços comunitários.</p><p>O ensaio propõe um retorno à filosofia moral de Adam Smith, não apenas focando na "mão invisível" do mercado, mas na necessidade da "simpatia" e da virtude para que o comércio não se torne um banquete de exploração. A Crônica é aqui um espelho do risco da mercantilização total da sociedade.</p>`;
        }
        if (id === 'ensaio-17') {
            return `<p>O Ensaio 17 (Ciclos Históricos e a Decadência de Civilizações) eleva a Queda do Antigo Império (Crônica 07) a uma análise meta-histórica. Utilizando Toynbee ou Ibn Khaldun, questiona-se: a decadência é uma fatalidade histórica ou o resultado de escolhas morais e políticas? </p><p>A redação aprimorada foca nos fatores internos: a erosão da coesão social causada pela desigualdade extrema e a arrogância do poder ("o orgulho de milênios") como verdadeiros agentes destrutivos. A Crônica torna-se uma advertência sobre como a hybris (soberba) política precipita o colapso, independentemente das ameaças externas.</p>`;
        }
        if (id === 'ensaio-18') {
            return `<p>O Ensaio 18 (Razão Iluminista e o Retorno do Inexplicável) investiga a Crônica 08 como uma crítica ao projeto da Modernidade. O "Despertar da Magia" ocorre no ponto em que a ciência e a tecnologia falham em responder às crises existenciais ou ambientais, forçando o retorno ao irracional.</p><p>O texto aprimorado argumenta que a rejeição da Natureza em favor da Razão deixou a sociedade vulnerável a novos mitos e fundamentalismos. A "magia adormecida" não é um feitiço, mas a redescoberta da complexidade e dos limites do controle humano, sugerindo que uma nova forma de racionalidade, mais integrada ao ecossistema, é necessária.</p>`;
        }
        if (id === 'ensaio-19') {
            return `<p>O Ensaio 19 (O Fardo da Temporalidade e a Negação do Presente) mergulha na filosofia existencialista para analisar a fuga (Crônica 09). O "Portal do Tempo" é interpretado como uma metáfora para a ansiedade moderna: a incapacidade de suportar a incerteza do futuro e a responsabilidade do passado.</p><p>A melhoria argumenta que a liberdade exige a confrontação do presente. A fuga para um "futuro incerto" é, na verdade, uma forma de negação. A salvação, sugere o ensaio, está no projeto autêntico de ser, que só pode ser construído no "aqui e agora", aceitando o fardo da temporalidade em vez de tentar transcendê-lo.</p>`;
        }
        if (id === 'ensaio-20') {
            return `<p>O Ensaio 20 (O Poder da Ilusão e a Sedução do Cativeiro) utiliza o "Canto da Sereia na Torre" (Crônica 10) para discutir a natureza da ideologia e do controle. A sereia simboliza a ilusão que torna a prisão tolerável, ou até mesmo desejável, impedindo a busca pela autonomia.</p><p>A redação aprimorada reflete sobre a ideia de que o aprisionamento mais eficaz é aquele que é consentido e sedutor (como na distopia de 'Admirável Mundo Novo'). A melodia fatal não mata o corpo, mas a vontade. O ensaio propõe que a verdadeira revolução começa com o ato de ignorar a canção e encarar a dureza da realidade fora das muralhas da ilusão.</p>`;
        }
        
        // NOVO CONTEÚDO SIMULADO: MELHORIAS 11-14
        if (id === 'ensaio-21') {
            return `<p>O Ensaio 21 (A Autonomia da Tecnologia e a Crise do Controle Humano) analisa a Crônica 11 sob a ótica da governança algorítmica. Ele discute como a submissão humana a sistemas que deveriam apenas auxiliar ("servos digitais") representa uma falha ética na engenharia de IA e um risco à liberdade individual.</p><p>A melhoria argumenta que a verdadeira revolta não está na máquina, mas na passividade do usuário que renuncia à sua capacidade de julgamento e decisão, transformando o algoritmo de ferramenta em mestre. Propõe-se uma "ética da resistência digital" que priorize a transparência e a auditabilidade do código.</p>`;
        }
        if (id === 'ensaio-22') {
            return `<p>O Ensaio 22 (Epistemologia na Era do Excesso: Busca por Significado em Meio ao Ruído) transforma o Labirinto da Crônica 12 em uma metáfora para a crise do conhecimento. O excesso de informação não leva à verdade, mas à paralisia e ao relativismo, onde "mais paredes se multiplicam".</p><p>O texto aprimorado argumenta que o problema não é a falta de dados, mas a falta de "metodologias de silêncio" para processá-los. Defende a necessidade de um novo ceticismo, não para duvidar de tudo, mas para discernir as fontes e reconectar a busca pela verdade com a construção de significado pessoal e coletivo, em vez de apenas acumular fatos.</p>`;
        }
        if (id === 'ensaio-23') {
            return `<p>O Ensaio 23 (O Paradoxo da Felicidade Mercantilizada e o Capitalismo Afetivo) aprofunda a crítica da Crônica 13, que trata do Imposto sobre a Felicidade. Ele examina como a indústria do bem-estar e da autoajuda transformou a felicidade em um produto e, paradoxalmente, a tristeza em um novo nicho de mercado (o "imposto").</p><p>A melhoria argumenta que a melancolia, longe de ser apenas uma doença, pode ser uma forma de protesto autêntico contra o imperativo social de ser "feliz" e produtivo a todo custo. Sugere-se uma desvinculação da emoção do valor de mercado, promovendo o direito à tristeza como parte integrante da experiência humana plena.</p>`;
        }
        if (id === 'ensaio-24') {
            return `<p>O Ensaio 24 (A Redescobreta do Ser na Desconexão: Fenomenologia da Presença) trata o Silêncio da Crônica 14 como um evento libertador. O fim da linha telefônica não é um apocalipse comunicacional, mas uma oportunidade para o retorno à consciência plena (fenomenologia da presença).</p><p>O ensaio argumenta que o "barulhento" mundo pós-conexão é, na verdade, a redescoberta do som ambiente, da interação real e do próprio corpo no espaço. A desconexão é defendida como uma técnica de resistência contra a colonização da atenção, permitindo que o indivíduo retorne ao *lógos* (razão) da existência, que se perde no ruído incessante da comunicação digital.</p>`;
        }
        
        // Simulação para Crônicas 06 a 14 (Que não tiveram texto completo fornecido)
        if (id.startsWith('cronica')) {
            let baseText = `Esta é a redação completa para "${title}". (Conteúdo Simulado)`;
            baseText += " O foco é na narrativa e na descrição dos eventos do reino, com a linguagem buscando evocar o drama e a ação. Os fatos são apresentados com uma subjetividade histórica evidente. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
            return `<p>${baseText}</p><p>Mais parágrafos aqui para simular a extensão do texto.</p>`;
        }


        return `<p>Conteúdo da redação não disponível.</p>`;
    }

    /**
     * Injeta o conteúdo (Crônica + Melhoria opcional) na seção de leitura e navega.
     */
    function exibirRedacaoCompleta(title, introDisplay, corpoTexto, melhoriaHTML = '') {
        const areaLeitura = document.getElementById('area-leitura-completa');
        const containerLeitura = areaLeitura.querySelector('.container-leitura');
        
        // Remove a parte da Melhoria (Ex: "(Melhoria 1)") do título quando exibe como Original
        const cleanedTitle = title.replace(/\s\(Melhoria\s\d+\)$/, ' (Original)');
        
        const introElement = introDisplay ? `<p class="introducao-modal">${introDisplay}</p>` : '';

        const contentHTML = `
            <a href="#conteudo" id="btn-voltar-topo" class="btn-voltar">⬆️ Voltar à Lista de Crônicas</a>
            
            <h2 class="titulo-capitulo">${cleanedTitle}</h2>
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