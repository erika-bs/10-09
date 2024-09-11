document.addEventListener('DOMContentLoaded', () => {
    const estadoSelect = document.getElementById('estado');
    const cidadeSelect = document.getElementById('cidade');

    // Função para preencher o <select> de estados
    const loadEstados = async () => {
        try {
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
            const estados = await response.json();
            
            estadoSelect.innerHTML = '<option value="">Selecione um estado</option>';
            estados.forEach(estado => {
                const option = document.createElement('option');
                option.value = estado.sigla;
                option.textContent = estado.nome;
                estadoSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar estados:', error);
        }
    };

    // Função para preencher o <select> de cidades
    const loadCidades = async (estadoSigla) => {
        try {
            const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSigla}/municipios`);
            const cidades = await response.json();

            cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>';
            cidades.forEach(cidade => {
                const option = document.createElement('option');
                option.value = cidade.id;
                option.textContent = cidade.nome;
                cidadeSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar cidades:', error);
        }
    };

    // Carregar estados quando a página carregar
    loadEstados();

    // Adicionar um listener para quando o estado for selecionado
    estadoSelect.addEventListener('change', (event) => {
        const estadoSigla = event.target.value;
        if (estadoSigla) {
            loadCidades(estadoSigla);
        } else {
            cidadeSelect.innerHTML = '<option value="">Selecione uma cidade</option>';
        }
    });
});
