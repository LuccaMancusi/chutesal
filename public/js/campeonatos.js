window.onload = atualizarCampeonatos;

function atualizarCampeonatos() {
  fetch("/campeonatos/dados")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let elementosCampeonato = "";

      let campeonatos = json;

      campeonatos.forEach((item) => {
        let elementoCampeonato = `<tr id="${item._id}">
          <td class="margin-right">${item.name}</td>
          <td class="margin-right">${item.inscricao?.substr(0, 10)}</td>
          <td class="margin-right">${item.divulgacao?.substr(0, 10)}</td>
          <td class="margin-right">${item.status}</td>
          <td style = "color: red; cursor: pointer" onclick="deletar(this)">X</td>
        </tr>`;
        elementosCampeonato += elementoCampeonato;
      });

      let tableHead =
        "<thead><tr id='table-head'><td>Nome</td><td>Período de Inscrição</td><td>Período de Divulgação</td><td>Status</td></tr><thead>";

      document.getElementById("teste").innerHTML =  tableHead + "<tbody>" + elementosCampeonato + "</tbody>"
    });
}

function deletar(e) {
  let tr = e.parentNode;
  let id = tr.id;

  let campeonato = { id };

  const options = {
    method: "DELETE",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(campeonato),
  };

  const url = "/campeonatos/dados/" + id;

  fetch(url, options).then((res) => {
    atualizarCampeonatos();
  });
}

// function deletarUnidades(id: Int) {
//   fetch("/unidades/dados/“ + id)
//    .then(
//       atualizarUnidades()
// )
