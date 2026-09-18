/* ==========================================
   DADOS DO CRONOGRAMA

   ATENÇÃO:
   Os dados abaixo são DEMONSTRATIVOS.
   Substitua pelos dados oficiais.
========================================== */

const ruas = [

    {
        nome: "Rua Principal",
        bairro: "Centro",
        dia: "segunda",
        diaNome: "Segunda-feira",
        horario: "07:00 às 11:00",
        tipo: "Coleta comum"
    },

    {
        nome: "Rua do Comércio",
        bairro: "Centro",
        dia: "terca",
        diaNome: "Terça-feira",
        horario: "07:00 às 11:00",
        tipo: "Coleta reciclável"
    },

    {
        nome: "Rua da Matriz",
        bairro: "Centro",
        dia: "quarta",
        diaNome: "Quarta-feira",
        horario: "07:00 às 11:00",
        tipo: "Coleta comum"
    },

    {
        nome: "Rua São José",
        bairro: "Centro",
        dia: "quinta",
        diaNome: "Quinta-feira",
        horario: "07:00 às 11:00",
        tipo: "Coleta reciclável"
    },

    {
        nome: "Rua Nova",
        bairro: "Centro",
        dia: "sexta",
        diaNome: "Sexta-feira",
        horario: "07:00 às 11:00",
        tipo: "Coleta comum"
    },

    {
        nome: "Rua da Liberdade",
        bairro: "Cohab",
        dia: "segunda",
        diaNome: "Segunda-feira",
        horario: "13:00 às 17:00",
        tipo: "Coleta comum"
    },

    {
        nome: "Rua Pernambuco",
        bairro: "Cohab",
        dia: "quarta",
        diaNome: "Quarta-feira",
        horario: "13:00 às 17:00",
        tipo: "Coleta comum"
    },

    {
        nome: "Rua Mirandiba",
        bairro: "Cohab",
        dia: "sexta",
        diaNome: "Sexta-feira",
        horario: "13:00 às 17:00",
        tipo: "Coleta reciclável"
    }

];


/* ==========================================
   ELEMENTOS
========================================== */

const cards =
    document.getElementById("cardsCronograma");

const resultado =
    document.getElementById("resultadoRua");

const campoRua =
    document.getElementById("campoRua");

const filtroBairro =
    document.getElementById("filtroBairro");

const proximaColeta =
    document.getElementById("proximaColeta");


/* ==========================================
   MOSTRAR CRONOGRAMA
========================================== */

function mostrarCronograma(lista = ruas) {

    cards.innerHTML = "";

    if (lista.length === 0) {

        cards.innerHTML = `
            <div class="resultado">
                Nenhuma rua encontrada.
            </div>
        `;

        return;
    }


    lista.forEach(rua => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `

            <div class="card-dia">
                📅 ${rua.diaNome.toUpperCase()}
            </div>

            <h3>
                📍 ${rua.nome}
            </h3>

            <p>
                🏘️ <strong>Bairro:</strong>
                ${rua.bairro}
            </p>

            <p>
                ⏰ <strong>Horário:</strong>
                ${rua.horario}
            </p>

            <p>
                ♻️ <strong>Tipo:</strong>
                ${rua.tipo}
            </p>

        `;

        cards.appendChild(card);

    });

}


/* ==========================================
   PREENCHER BAIRROS
========================================== */

function carregarBairros() {

    const bairros = [...new Set(
        ruas.map(rua => rua.bairro)
    )];

    bairros.forEach(bairro => {

        const option =
            document.createElement("option");

        option.value = bairro;

        option.textContent = bairro;

        filtroBairro.appendChild(option);

    });

}


/* ==========================================
   PESQUISAR RUA
========================================== */

function buscarRua() {

    const texto =
        campoRua.value
        .toLowerCase()
        .trim();


    if (texto === "") {

        resultado.innerHTML = `

            <div class="resultado-vazio">

                <span>⚠️</span>

                <h3>
                    Digite uma rua
                </h3>

                <p>
                    Informe o nome da rua para pesquisar.
                </p>

            </div>

        `;

        return;
    }


    const encontradas =
        ruas.filter(rua =>
            rua.nome
            .toLowerCase()
            .includes(texto)
        );


    mostrarResultado(encontradas);

}


/* ==========================================
   MOSTRAR RESULTADO
========================================== */

function mostrarResultado(lista) {

    if (lista.length === 0) {

        resultado.innerHTML = `

            <div class="resultado-vazio">

                <span>🔎</span>

                <h3>
                    Rua não encontrada
                </h3>

                <p>
                    Essa rua ainda não está cadastrada
                    no cronograma.
                </p>

            </div>

        `;

        return;
    }


    resultado.innerHTML = "";


    lista.forEach(rua => {

        const item =
            document.createElement("div");

        item.innerHTML = `

            <h3>
                📍 ${rua.nome}
            </h3>

            <p>
                🏘️ <strong>Bairro:</strong>
                ${rua.bairro}
            </p>

            <p>
                📅 <strong>Dia:</strong>
                ${rua.diaNome}
            </p>

            <p>
                ⏰ <strong>Horário:</strong>
                ${rua.horario}
            </p>

            <p>
                ♻️ <strong>Tipo:</strong>
                ${rua.tipo}
            </p>

            <hr>

        `;

        resultado.appendChild(item);

    });


    atualizarProximaColeta(lista[0]);

}


/* ==========================================
   FILTRAR BAIRRO
========================================== */

function filtrarBairro() {

    const bairro =
        filtroBairro.value;


    if (bairro === "todos") {

        mostrarCronograma();

        return;

    }


    const filtradas =
        ruas.filter(
            rua => rua.bairro === bairro
        );


    mostrarCronograma(filtradas);

}


/* ==========================================
   FILTRAR DIA
========================================== */

function filtrarDia(dia) {

    document
        .querySelectorAll(".filtro")
        .forEach(botao =>
            botao.classList.remove("ativo")
        );


    event.target.classList.add("ativo");


    if (dia === "todos") {

        mostrarCronograma();

        return;

    }


    const filtradas =
        ruas.filter(
            rua => rua.dia === dia
        );


    mostrarCronograma(filtradas);

}


/* ==========================================
   PRÓXIMA COLETA
========================================== */

function atualizarProximaColeta(rua) {

    proximaColeta.innerHTML = `

        ${rua.diaNome} — ${rua.horario}

        <br>

        <small>
            📍 ${rua.nome}
        </small>

    `;

}


/* ==========================================
   ENTER NA PESQUISA
========================================== */

campoRua.addEventListener(
    "keypress",
    function(event) {

        if (event.key === "Enter") {

            buscarRua();

        }

    }
);


/* ==========================================
   INICIAR SITE
========================================== */

mostrarCronograma();

carregarBairros();
