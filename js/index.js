let alunosData = [];

// Carregar dados dos alunos
async function carregarAlunos() {
  try {
    const response = await fetch('js/alunos.json');
    if (!response.ok) throw new Error('Falha ao carregar alunos.json');
    alunosData = await response.json();
    console.log('Alunos carregados:', alunosData.length);
  } catch (error) {
    console.error('Erro ao carregar alunos:', error);
    // Fallback caso o fetch falhe (ex: rodando via file://)
    console.warn('Dica: O navegador bloqueia fetch em arquivos locais (file://). Use o Live Server.');
  }
}

carregarAlunos();

const searchInput = document.getElementById('searchNome');
const searchResults = document.getElementById('searchResults');
const passo1 = document.getElementById('passo1');
const passo2 = document.getElementById('passo2');
const nomeAlunoSelecionado = document.getElementById('nomeAlunoSelecionado');

searchInput.addEventListener('input', (e) => {
  const term = e.target.value.toUpperCase();
  if (term.length < 3) {
    searchResults.style.display = 'none';
    return;
  }

  const matches = alunosData.filter(a => a.nome.includes(term)).slice(0, 10);
  
  if (matches.length > 0) {
    searchResults.innerHTML = matches.map(a => `
      <div class="search-item" onclick="selecionarAluno('${a.nome}', ${a.ssa1}, ${a.ssa2})">
        ${a.nome}
      </div>
    `).join('');
    searchResults.style.display = 'block';
  } else {
    searchResults.style.display = 'none';
  }
});

function selecionarAluno(nome, ssa1, ssa2) {
  // Guardar dados nos inputs ocultos
  document.getElementById('nota1').value = ssa1;
  document.getElementById('nota2').value = ssa2;
  
  // Mostrar nome e notas anteriores na tela
  nomeAlunoSelecionado.innerText = "Olá, " + nome + "!";
  document.getElementById('valNota1').innerText = ssa1.toFixed(2);
  document.getElementById('valNota2').innerText = ssa2.toFixed(2);
  
  // Trocar de passo
  passo1.style.display = 'none';
  passo2.style.display = 'block';
  
  // Focar na pergunta da redação
  document.getElementById('notaRedacao').focus();
}

// Permitir calcular ao apertar Enter na nota da redação
document.getElementById('notaRedacao').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        calcularNota3();
    }
});

const cursos = {
  // Recife
  medicina_recife: { corte: 79.15, campus: "Recife" },
  engenharia_comp_recife: { corte: 73.86, campus: "Recife" },
  direito_recife: { corte: 70.90, campus: "Recife" },
  odontologia_recife: { corte: 61.21, campus: "Recife" },
  ciencias_biologicas_recife: { corte: 58.79, campus: "Recife" },
  enfermagem_recife: { corte: 54.49, campus: "Recife" },
  saude_coletiva_recife: { corte: 42.75, campus: "Recife" },
  terapia_ocupacional_recife: { corte: 61.29, campus: "Recife" },
  educacao_fisica_recife: { corte: 46.71, campus: "Recife" },
  ciencias_sociais_recife: { corte: 54.59, campus: "Recife" },
  administracao_recife: { corte: 54.98, campus: "Recife" },
  engenharia_civil_recife: { corte: 52.80, campus: "Recife" },
  engenharia_automacao_controle_recife: { corte: 57.66, campus: "Recife" },
  engenharia_eletrica_eletrotecnica_recife: { corte: 44.65, campus: "Recife" },
  engenharia_telecom_recife: { corte: 33.80, campus: "Recife" },
  engenharia_eletrica_recife: { corte: 61.09, campus: "Recife" },
  engenharia_mecanica_recife: { corte: 62.78, campus: "Recife" },
  fisica_material_recife: { corte: 62.99, campus: "Recife" },

  // Caruaru
  sistemas_informacao_caruaru: { corte: 58.76, campus: "Caruaru" },
  administracao_caruaru: { corte: 51.25, campus: "Caruaru" },

  // Nazaré da Mata 
  ciencia_computacao_nazare: { corte: 56.36, campus: "Nazré da Mata" },
  ciencias_biologicas_nazare: { corte: 42.45, campus: "Nazré da Mata" },
  geografia_nazare: { corte: 36.11, campus: "Nazré da Mata" },
  historia_nazare: { corte: 48.28, campus: "Nazré da Mata" },
  letras_port_esp_nazare: { corte: 48.75, campus: "Nazré da Mata" },
  letras_port_ing_nazare: { corte: 38.72, campus: "Nazré da Mata" },
  matematica_nazare: { corte: 48.53, campus: "Nazré da Mata" },
  pedagogia_nazare: { corte: 40.52, campus: "Nazré da Mata" },
  tecnologia_logistica_nazare: { corte: 38.26, campus: "Nazré da Mata" },

  // Garanhuns
  medicina_garanhuns: { corte: 74.39, campus: "Garanhuns" },
  psicologia_garanhuns: { corte: 59.07, campus: "Garanhuns" },
  engenharia_software_garanhuns: { corte: 62.99, campus: "Garanhuns" },
  computacao_garanhuns: { corte: 44.40, campus: "Garanhuns" },
  historia_garanhuns: { corte: 44.93, campus: "Garanhuns" },
  letras_port_garanhuns: { corte: 47.03, campus: "Garanhuns" },
  matematica_garanhuns: { corte: 44.86, campus: "Garanhuns" },
  pedagogia_garanhuns: { corte: 39.73, campus: "Garanhuns" },
  geografia_garanhuns: { corte: 30.16, campus: "Garanhuns" },
  ciencias_biologicas_l_garanhuns: { corte: 43.47, campus: "Garanhuns" },

  // Petrolina
  fisioterapia_petrolina: { corte: 53.64, campus: "Petrolina" },
  enfermagem_petrolina: { corte: 52.91, campus: "Petrolina" },
  ciencias_biologicas_l_petrolina: { corte: 42.06, campus: "Petrolina" },
  nutricao_petrolina: { corte: 53.32, campus: "Petrolina" },
  pedagogia_petrolina: { corte: 36.97, campus: "Petrolina" },
  geografia_petrolina: { corte: 34.95, campus: "Petrolina" },
  letras_port_esp_petrolina: { corte: 31.84, campus: "Petrolina" },
  letras_port_ing_petrolina: { corte: 37.95, campus: "Petrolina" },
  matematica_petrolina: { corte: 45.67, campus: "Petrolina" },

  // Arcoverde
  direito_arcoverde: { corte: 59.62, campus: "Arcoverde" },
  odontologia_arcoverde: { corte: 58.51, campus: "Arcoverde" },

  // Serratalhada
  medicina_serratalhada: { corte: 73.81, campus: "Serratalhada" },

  // Surubim
  engenharia_software_surubim: { corte: 55.52, campus: "Surubim" },
  sistemas_informacao_surubim: { corte: 45.34, campus: "Surubim" },

  // Palmares
  administracao_palmares: { corte: 29.80, campus: "Palmares" },
  servico_social_palmares: { corte: 29.23, campus: "Palmares" },

  // Ouricuri
  enfermagem_ouricuri: { corte: 46.12, campus: "Ouricuri" },

  // Salgueiro
  administracao_salgueiro: { corte: 40.42, campus: "Salgueiro" }
};

function calcularNota3() {
  const nota1Input = document.getElementById("nota1");
  const nota2Input = document.getElementById("nota2");
  const notaRedacaoInput = document.getElementById("notaRedacao");
  const nota3Input = document.getElementById("nota3");
  const cursoSelecionado = document.getElementById("curso").value;
  const resultadoDiv = document.getElementById("resultado");

  const nota1 = parseFloat(nota1Input.value) || 0;
  const nota2 = parseFloat(nota2Input.value) || 0;
  const notaRedacao = parseFloat(notaRedacaoInput.value) || 0;

  if (cursos.hasOwnProperty(cursoSelecionado)) {
      const { corte, campus } = cursos[cursoSelecionado];
      const notaMinima = corte;

      const N1 = notaMinima * 10;
      const N2 = nota1 + nota2;
      const N3 = 3 * N2;
      const N4 = N1 - N3;
      const N5 = N4 - notaRedacao;
      const nota3Necessaria = N5 / 3;

      const questoesNecessarias = Math.max(0, Math.ceil(nota3Necessaria / 1.053));
      nota3Input.value = "";
      resultadoDiv.innerHTML = 'Você precisa acertar ' + questoesNecessarias + ' questões no SSA-3';
          resultadoDiv.style.fontSize = "20px";
          resultadoDiv.style.fontWeight = "bold";
      resultadoDiv.style.display = "block";

  } else {
      resultadoDiv.innerHTML = "Curso não encontrado.";
      nota3Input.value = "";
      resultadoDiv.style.display = "block";
  }
}

function mostrarDetalhes(nota1, nota2, notaRedacao, nota3, notaCorte, mediaFinal, campus) {
  const detalhesDiv = document.getElementById("detalhes");
  const nota1Detalhe = document.getElementById("nota1Detalhe");
  const nota2Detalhe = document.getElementById("nota2Detalhe");
  const notaRedacaoDetalhe = document.getElementById("notaRedacaoDetalhe");
  const nota3Detalhe = document.getElementById("nota3Detalhe");
  const notaFinalDetalhe = document.getElementById("notaFinal");
  const notaCorteDetalhe = document.getElementById("notaCorteCurso");
  const classificacaoDetalhe = document.getElementById("classificacao");

  const notaFinal = ((nota1 + nota2 + notaRedacao + nota3) / 4).toFixed(2);

  nota1Detalhe.innerText = nota1.toFixed(2);
  nota2Detalhe.innerText = nota2.toFixed(2);
  notaRedacaoDetalhe.innerText = notaRedacao.toFixed(2);
  nota3Detalhe.innerText = nota3.toFixed(2);
  notaCorteDetalhe.innerText = notaCorte.toFixed(2);
  notaFinalDetalhe.innerText = mediaFinal.toFixed(2);

  if (nota3 > 100) {
      classificacaoDetalhe.innerText = "Reprovado (Impossível passar, nota necessária > 100)";
  } else {
      classificacaoDetalhe.innerText = "Aprovado!";
  }

  detalhesDiv.style.display = "block";
}

function limparTudo() {
  document.getElementById("searchNome").value = "";
  document.getElementById("nota1").value = "";
  document.getElementById("nota2").value = "";
  document.getElementById("notaRedacao").value = "";
  document.getElementById("nota3").value = "";
  document.getElementById("resultado").innerHTML = "";
  document.getElementById("resultado").style.display = "none";
  document.getElementById("detalhes").style.display = "none";
  
  // Voltar para o passo 1
  document.getElementById("passo1").style.display = "block";
  document.getElementById("passo2").style.display = "none";
}

