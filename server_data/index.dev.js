let alunosData = [];

// Carregar dados dos alunos via API
async function buscarAlunos(termo) {
  if (termo.length < 3) return [];
  try {
    const response = await fetch(`/api/alunos?q=${encodeURIComponent(termo)}`);
    if (!response.ok) throw new Error('Falha ao buscar alunos');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    return [];
  }
}

const searchInput = document.getElementById('searchNome');
const searchResults = document.getElementById('searchResults');
const passo1 = document.getElementById('passo1');
const passo2 = document.getElementById('passo2');
const nomeAlunoSelecionado = document.getElementById('nomeAlunoSelecionado');

searchInput.addEventListener('input', async (e) => {
  const term = e.target.value.toUpperCase();
  if (term.length < 3) {
    searchResults.style.display = 'none';
    return;
  }

  const matches = await buscarAlunos(term);
  
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

async function calcularNota3() {
  const nota1Input = document.getElementById("nota1");
  const nota2Input = document.getElementById("nota2");
  const notaRedacaoInput = document.getElementById("notaRedacao");
  const cursoSelecionado = document.getElementById("curso").value;
  const resultadoDiv = document.getElementById("resultado");

  if (!cursoSelecionado) {
    resultadoDiv.innerHTML = "Por favor, selecione um curso.";
    resultadoDiv.style.display = "block";
    return;
  }

  const payload = {
    nota1: parseFloat(nota1Input.value) || 0,
    nota2: parseFloat(nota2Input.value) || 0,
    notaRedacao: parseFloat(notaRedacaoInput.value) || 0,
    cursoId: cursoSelecionado
  };

  try {
    const response = await fetch('/api/calcular', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('Falha no cálculo');

    const data = await response.json();
    
    resultadoDiv.innerHTML = `
      <div class="result-title">Sua nota na prova objetiva deve ser:</div>
      <div class="result-value">${data.nota3Necessaria.toFixed(2)}</div>
      <div class="result-subtitle">Você precisa acertar <strong>${data.questoesNecessarias}</strong> questões no SSA-3</div>
    `;
    resultadoDiv.style.display = "block";

    // Mostrar detalhamento
    mostrarDetalhes(payload.nota1, payload.nota2, payload.notaRedacao, data.nota3Necessaria, data.corte, data.mediaFinal, data.campus);

    // Scroll suave até o resultado
    setTimeout(() => {
      resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

  } catch (error) {
    console.error('Erro ao calcular:', error);
    resultadoDiv.innerHTML = "Erro ao realizar o cálculo. Tente novamente.";
    resultadoDiv.style.display = "block";
  }
}

function mostrarDetalhes(nota1, nota2, notaRedacao, nota3, corte, mediaFinal, campus) {
  const detalhesDiv = document.getElementById('detalhes');
  document.getElementById('nota3Detalhe').innerText = nota3.toFixed(2);
  document.getElementById('notaFinal').innerText = mediaFinal.toFixed(2);
  document.getElementById('notaCorteCurso').innerText = corte.toFixed(2);
  
  const classificacao = document.getElementById('classificacao');
  classificacao.innerText = "Dentro das vagas (Baseado no corte de 2024 - Campus " + campus + ")";
  classificacao.style.color = "#27ae60";

  detalhesDiv.style.display = 'block';
}

function limparResultado() {
    document.getElementById('notaRedacao').value = '';
    document.getElementById('resultado').style.display = 'none';
    document.getElementById('detalhes').style.display = 'none';
}

function reiniciarTudo() {
    location.reload();
}
