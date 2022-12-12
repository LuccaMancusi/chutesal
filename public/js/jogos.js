window.onload = atualizarJogos;

function atualizarJogos() {
  let selectElements = "";
  fetch("/campeonatos/dados")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let campeonatos = json;

      campeonatos.forEach((item) => {
        let option = `<option value="${item.name}">${item.name}</option>`;
        selectElements += option;
      });

      document.getElementById("unidades-select").innerHTML = selectElements;
    });
  fetch("/jogos/dados")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let elementosUnidade = "";

      let jogos = json;

      jogos.forEach((item) => {
        let elementoUnidade = `<tr id="${item._id}">
          <td onclick="popup(this)" style="cursor: pointer" class="margin-right">${
            item.team1
          }</td>
          <td class="margin-right">${item.team2}</td>
          <td class="margin-right">${item.score}</td>
          <td class="margin-right">${item.date?.substr(0, 10)}</td>
          <td class="margin-right">${item.time}</td>
          <td class="margin-right">${item.campeonato}</td>
          <td style = "color: red; cursor: pointer" onclick="deletar(this)">X</td>
        </tr>`;
        elementosUnidade += elementoUnidade;
      });
      let tableHead =
        "<thead><tr id='table-head'><td>Time 1</td><td>Time 2</td><td>Placar</td><td>Data</td><td>Horário</td><td>Campeonato</td></tr><thead>";

      document.getElementById("teste").innerHTML =
        tableHead + "<tbody>" + elementosUnidade + "</tbody>";
    });
}

function deletar(e) {
  let tr = e.parentNode;
  let id = tr.id;

  let unidade = { id };

  const options = {
    method: "DELETE",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(unidade),
  };

  const url = "/jogos/dados/" + id;

  fetch(url, options).then((res) => {
    atualizarJogos();
  });
}
