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

function calcularNota3() {
  const nota1Input = document.getElementById("nota1");
  const nota2Input = document.getElementById("nota2");
  const notaRedacaoInput = document.getElementById("notaRedacao");
  const nota3Input = document.getElementById("nota3");
  const cursoSelecionado = document.getElementById("curso").value;
  const resultadoDiv = document.getElementById("resultado");

  if (!cursoSelecionado) {
    resultadoDiv.innerHTML = "Por favor, selecione um curso.";
    resultadoDiv.style.display = "block";
    return;
  }

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

      const nota3Arredondada = Math.max(0, nota3Necessaria);
      const questoesNecessarias = Math.max(0, Math.ceil(nota3Necessaria / 1.053));
      
      resultadoDiv.innerHTML = `
        <div class="result-title">Sua nota na prova objetiva deve ser:</div>
        <div class="result-value">${nota3Arredondada.toFixed(2)}</div>
        <div class="result-subtitle">Você precisa acertar <strong>${questoesNecessarias}</strong> questões no SSA-3</div>
      `;
      resultadoDiv.style.display = "block";

      // Mostrar detalhamento
      const mediaFinal = corte; // A nota necessária é justamente para atingir o corte
      mostrarDetalhes(nota1, nota2, notaRedacao, nota3Arredondada, corte, mediaFinal, campus);

      // Scroll suave até o resultado
      setTimeout(() => {
        resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);

  } else {
      resultadoDiv.innerHTML = "Curso não encontrado.";
      nota3Input.value = "";
      resultadoDiv.style.display = "block";
  }
}

function mostrarDetalhes(nota1, nota2, notaRedacao, nota3, notaCorte, mediaFinal, campus) {
  const detalhesDiv = document.getElementById("detalhes");
  const nota3Detalhe = document.getElementById("nota3Detalhe");
  const notaFinalDetalhe = document.getElementById("notaFinal");
  const notaCorteDetalhe = document.getElementById("notaCorteCurso");
  const classificacaoDetalhe = document.getElementById("classificacao");

  if (nota3Detalhe) nota3Detalhe.innerText = nota3.toFixed(2);
  if (notaCorteDetalhe) notaCorteDetalhe.innerText = notaCorte.toFixed(2);
  if (notaFinalDetalhe) notaFinalDetalhe.innerText = mediaFinal.toFixed(2);

  if (classificacaoDetalhe) {
      if (nota3 > 100) {
          classificacaoDetalhe.innerText = "Reprovado (Impossível passar, nota necessária > 100)";
          classificacaoDetalhe.style.color = "#d32f2f";
          classificacaoDetalhe.style.background = "transparent";
      } else {
          classificacaoDetalhe.innerText = "Aprovado!";
          classificacaoDetalhe.style.color = "#2e7d32";
          classificacaoDetalhe.style.background = "transparent";
      }
  }

  detalhesDiv.style.display = "block";
}

function limparResultado() {
  // Limpa campos de resultado e detalhamento
  document.getElementById("resultado").innerHTML = "";
  document.getElementById("resultado").style.display = "none";
  document.getElementById("detalhes").style.display = "none";
  
  // Limpa nota da redação e volta o curso para a opção padrão
  document.getElementById("notaRedacao").value = "";
  document.getElementById("curso").selectedIndex = 0;
  
  // Mantém o nome e as notas do SSA1/SSA2
}

function reiniciarTudo() {
  // Limpa tudo e volta para a tela inicial
  document.getElementById("searchNome").value = "";
  document.getElementById("searchResults").innerHTML = "";
  document.getElementById("searchResults").style.display = "none";
  
  document.getElementById("nota1").value = "";
  document.getElementById("nota2").value = "";
  document.getElementById("notaRedacao").value = "";
  document.getElementById("curso").selectedIndex = 0;
  document.getElementById("nota3").value = "";
  
  document.getElementById("resultado").innerHTML = "";
  document.getElementById("resultado").style.display = "none";
  document.getElementById("detalhes").style.display = "none";
  
  // Voltar para o passo 1
  document.getElementById("passo1").style.display = "block";
  document.getElementById("passo2").style.display = "none";
}

