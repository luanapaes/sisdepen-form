const perguntas = [

    {
        id: "capacidade",
        titulo: "Capacidade da unidade",
        tipo: "numero"
    },

    {
        id: "custodiados",
        titulo: "Quantidade de pessoas custodiadas",
        tipo: "numero",
        regras: {
            unidade: ["penitenciaria"]
        }
    },

    {
        id: "entradas",
        titulo: "Entradas no período",
        tipo: "numero",
        regras: {
            unidade: ["triagem"]
        }
    },

    {
        id: "avaliacao",
        titulo: "Realiza avaliação criminológica?",
        tipo: "checkbox",
        regras: {
            unidade: ["triagem"]
        }
    },

    {
        id: "biblioteca",
        titulo: "Possui biblioteca?",
        tipo: "checkbox",
        regras: {
            unidade: ["penitenciaria"]
        }
    },

    {
        id: "oficinas",
        titulo: "Possui oficinas de trabalho?",
        tipo: "checkbox",
        regras: {
            unidade: ["penitenciaria"]
        }
    },

    {
        id: "bercario",
        titulo: "Possui berçário?",
        tipo: "checkbox",
        regras: {
            sexo: ["feminino", "misto"],
            unidade: ["penitenciaria"]
        }
    },

    {
        id: "creche",
        titulo: "Possui creche?",
        tipo: "checkbox",
        regras: {
            sexo: ["feminino", "misto"],
            unidade: ["penitenciaria"]
        }
    },

    {
        id: "producao",
        titulo: "Possui produção agrícola?",
        tipo: "checkbox",
        regras: {
            unidade: ["colonia"]
        }
    },

    {
        id: "trabalhoExterno",
        titulo: "Possui trabalho externo?",
        tipo: "checkbox",
        regras: {
            unidade: ["colonia"]
        }
    },

    {
        id: "leitos",
        titulo: "Quantidade de leitos",
        tipo: "numero",
        regras: {
            unidade: ["hospital"]
        }
    },

    {
        id: "consultorio",
        titulo: "Possui consultório médico?",
        tipo: "checkbox",
        regras: {
            unidade: ["hospital"]
        }
    },

    {
        id: "odontologia",
        titulo: "Possui consultório odontológico?",
        tipo: "checkbox",
        regras: {
            unidade: ["hospital"]
        }
    }

];

const sexoSelect =
    document.getElementById("sexo");

const tipoSelect =
    document.getElementById("tipo");

const container =
    document.getElementById("perguntas");

function deveExibir(pergunta) {

    const sexo =
        sexoSelect.value;

    const unidade =
        tipoSelect.value;

    if (!unidade) return false;

    if (pergunta.regras?.sexo) {

        if (
            !pergunta.regras.sexo.includes(sexo)
        ) {
            return false;
        }

    }

    if (pergunta.regras?.unidade) {

        if (
            !pergunta.regras.unidade.includes(unidade)
        ) {
            return false;
        }

    }

    return true;
}

function renderizar() {

    container.innerHTML = "";

    perguntas.forEach(pergunta => {

        if (!deveExibir(pergunta))
            return;

        const div =
            document.createElement("div");

        div.className = "pergunta";

        if (pergunta.tipo === "numero") {

            div.innerHTML = `
                <label>${pergunta.titulo}</label>
                <input
                    type="number"
                    id="${pergunta.id}"
                    min="0"
                >
            `;

        }

        if (pergunta.tipo === "checkbox") {

            div.innerHTML = `
                <label class="checkbox">
                    <input
                        type="checkbox"
                        id="${pergunta.id}"
                    >
                    ${pergunta.titulo}
                </label>
            `;

        }

        container.appendChild(div);

    });

}

sexoSelect.addEventListener(
    "change",
    renderizar
);

tipoSelect.addEventListener(
    "change",
    renderizar
);

document
    .getElementById("salvar")
    .addEventListener("click", () => {

        const dados = {

            sexo: sexoSelect.value,
            unidade: tipoSelect.value

        };

        perguntas.forEach(pergunta => {

            if (!deveExibir(pergunta)) {

                dados[pergunta.id] =
                    "nao_se_aplica";

                return;
            }

            const campo =
                document.getElementById(
                    pergunta.id
                );

            if (!campo)
                return;

            if (pergunta.tipo === "checkbox") {

                dados[pergunta.id] =
                    campo.checked;

            } else {

                dados[pergunta.id] =
                    campo.value;

            }

        });

        localStorage.setItem(
            "sisdepen",
            JSON.stringify(
                dados,
                null,
                2
            )
        );

        console.log(dados);

        alert("Salvo com sucesso.");

    });

document
    .getElementById("limpar")
    .addEventListener("click", () => {

        localStorage.removeItem(
            "sisdepen"
        );

        alert("Storage limpo.");

    });