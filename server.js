const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Em ambiente local, serve arquivos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Dados em memória para rapidez (carregados do JSON)
let alunosData = [];
try {
    const filePath = path.join(__dirname, 'server_data', 'alunos.json');
    const data = fs.readFileSync(filePath, 'utf8');
    alunosData = JSON.parse(data);
    console.log(`Carregados ${alunosData.length} alunos.`);
} catch (err) {
    console.error('Erro ao carregar alunos.json:', err);
}

// Exportar para o Vercel
module.exports = app;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}

const cursos = {
    // Recife
    medicina_recife: { corte: 78.74, campus: "Recife" },
    engenharia_comp_recife: { corte: 74.74, campus: "Recife" },
    direito_recife: { corte: 73.32, campus: "Recife" },
    odontologia_recife: { corte: 63.24, campus: "Recife" },
    ciencias_biologicas_recife: { corte: 59.91, campus: "Recife" },
    enfermagem_recife: { corte: 55.61, campus: "Recife" },
    saude_coletiva_recife: { corte: 46.84, campus: "Recife" },
    terapia_ocupacional_recife: { corte: 61.50, campus: "Recife" },
    educacao_fisica_recife: { corte: 47.79, campus: "Recife" },
    ciencias_sociais_recife: { corte: 55.30, campus: "Recife" },
    administracao_recife: { corte: 56.64, campus: "Recife" },
    engenharia_civil_recife: { corte: 53.99, campus: "Recife" },
    engenharia_automacao_controle_recife: { corte: 59.91, campus: "Recife" },
    engenharia_eletrica_eletrotecnica_recife: { corte: 50.64, campus: "Recife" },
    engenharia_telecom_recife: { corte: 32.91, campus: "Recife" },
    engenharia_eletrica_recife: { corte: 60.44, campus: "Recife" },
    engenharia_mecanica_recife: { corte: 63.50, campus: "Recife" },
    fisica_material_recife: { corte: 56.69, campus: "Recife" },
  
    // Caruaru
    sistemas_informacao_caruaru: { corte: 60.33, campus: "Caruaru" },
    administracao_caruaru: { corte: 49.29, campus: "Caruaru" },
  
    // Nazaré da Mata
    ciencia_computacao_nazare: { corte: 57.41, campus: "Nazaré da Mata" },
    ciencias_biologicas_nazare: { corte: 43.84, campus: "Nazaré da Mata" },
    geografia_nazare: { corte: 37.17, campus: "Nazaré da Mata" },
    historia_nazare: { corte: 48.25, campus: "Nazaré da Mata" },
    letras_port_ing_nazare: { corte: 50.42, campus: "Nazaré da Mata" },
    letras_port_esp_nazare: { corte: 38.44, campus: "Nazaré da Mata" },
    matematica_nazare: { corte: 48.39, campus: "Nazaré da Mata" },
    pedagogia_nazare: { corte: 42.03, campus: "Nazaré da Mata" },
    tecnologia_logistica_nazare: { corte: 38.37, campus: "Nazaré da Mata" },
  
    // Garanhuns
    medicina_garanhuns: { corte: 75.45, campus: "Garanhuns" },
    psicologia_garanhuns: { corte: 60.01, campus: "Garanhuns" },
    engenharia_software_garanhuns: { corte: 64.96, campus: "Garanhuns" },
    computacao_garanhuns: { corte: 45.71, campus: "Garanhuns" },
    historia_garanhuns: { corte: 44.36, campus: "Garanhuns" },
    letras_port_garanhuns: { corte: 46.51, campus: "Garanhuns" },
    matematica_garanhuns: { corte: 47.89, campus: "Garanhuns" },
    pedagogia_garanhuns: { corte: 41.03, campus: "Garanhuns" },
    geografia_garanhuns: { corte: 31.77, campus: "Garanhuns" },
    ciencias_biologicas_l_garanhuns: { corte: 44.64, campus: "Garanhuns" },
  
    // Petrolina
    fisioterapia_petrolina: { corte: 54.24, campus: "Petrolina" },
    enfermagem_petrolina: { corte: 26.46, campus: "Petrolina" },
    ciencias_biologicas_l_petrolina: { corte: 44.34, campus: "Petrolina" },
    nutricao_petrolina: { corte: 52.86, campus: "Petrolina" },
    pedagogia_petrolina: { corte: 35.59, campus: "Petrolina" },
    historia_petrolina: { corte: 27.10, campus: "Petrolina" },
    geografia_petrolina: { corte: 30.52, campus: "Petrolina" },
    letras_port_esp_petrolina: { corte: 32.53, campus: "Petrolina" },
    letras_port_ing_petrolina: { corte: 42.53, campus: "Petrolina" },
    matematica_petrolina: { corte: 47.82, campus: "Petrolina" },
  
    // Arcoverde
    direito_arcoverde: { corte: 61.04, campus: "Arcoverde" },
    odontologia_arcoverde: { corte: 61.04, campus: "Arcoverde" },
  
    // Serra Talhada
    medicina_serratalhada: { corte: 74.09, campus: "Serra Talhada" },
  
    // Surubim
    engenharia_software_surubim: { corte: 57.06, campus: "Surubim" },
    sistemas_informacao_surubim: { corte: 48.11, campus: "Surubim" },
  
    // Palmares
    administracao_palmares: { corte: 28.76, campus: "Palmares" },
    servico_social_palmares: { corte: 27.31, campus: "Palmares" },
  
    // Ouricuri
    enfermagem_ouricuri: { corte: 45.66, campus: "Ouricuri" },
  
    // Salgueiro
    administracao_salgueiro: { corte: 40.24, campus: "Salgueiro" }
};

// Endpoint para buscar alunos (retorna HTML pronto para o frontend)
app.get('/api/alunos', (req, res) => {
    const term = req.query.q ? req.query.q.toUpperCase() : '';
    if (term.length < 3) return res.send('');
    
    const matches = alunosData.filter(a => a.nome.includes(term)).slice(0, 10);
    const html = matches.map(a => {
        // Properly escape special characters for JavaScript strings
        const nomeEscapado = a.nome
            .replace(/\\/g, '\\\\')
            .replace(/'/g, "\\'")
            .replace(/"/g, '\\"')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t');
        return `
          <div class="search-item" onclick="selecionarAluno('${nomeEscapado}', ${a.ssa1}, ${a.ssa2}, '${a.pos}')">
            ${a.nome.replace(/\n/g, ' ').replace(/\r/g, '')}
          </div>
        `;
    }).join('');
    res.send(html);
});

// Endpoint para cálculo (Retorna o HTML PRONTO - Proteção total da lógica)
app.post('/api/calcular', (req, res) => {
    const { nota1, nota2, notaRedacao, cursoId } = req.body;

    if (!cursos[cursoId]) {
        return res.status(400).send("Curso não encontrado.");
    }

    const { corte, campus } = cursos[cursoId];
    
    // Lógica TOTALMENTE PROTEGIDA NO SERVIDOR
    const N1 = corte * 10;
    const N2 = parseFloat(nota1) + parseFloat(nota2);
    const N3 = 3 * N2;
    const N4 = N1 - N3;
    const N5 = N4 - parseFloat(notaRedacao);
    const nota3Necessaria = Math.max(0, N5 / 3);
    const questoesNecessarias = Math.max(0, Math.ceil(nota3Necessaria / 1.053));

    // O servidor já manda o HTML formatado. O navegador só exibe.
    const htmlResultado = `
        <div class="result-title">Sua nota na prova objetiva deve ser:</div>
        <div class="result-value">${nota3Necessaria.toFixed(2)}</div>
        <div class="result-subtitle">Você precisa acertar <strong>${questoesNecessarias}</strong> questões no SSA-3</div>
    `;

    const status = nota3Necessaria <= 100 ? "Aprovado" : "Reprovado";
    const statusColor = nota3Necessaria <= 100 ? "#27ae60" : "#e74c3c";

    const htmlDetalhes = `
        <h2>Detalhamento das Notas</h2>
        <p>Nota da prova objetiva (SSA-3): <span>${nota3Necessaria.toFixed(2)}</span></p>
        <p>Média Final no SSA-3: <span>${corte.toFixed(2)}</span></p>
        <p>Nota de corte do curso: <span>${corte.toFixed(2)}</span></p>
        <p>Classificação: <span style="color: ${statusColor}; font-weight: bold;">${status}</span></p>
    `;

    res.json({
        resultado: htmlResultado,
        detalhes: htmlDetalhes
    });
});

