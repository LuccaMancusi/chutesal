window.onload = atualizarCampeonatos;

function atualizarCampeonatos() {
  // let selectElements = "";
  // fetch("/unidades/dados")
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((json) => {
  //     let elementosUnidade = "";

  //     let unidades = json;

  //     unidades.forEach((item) => {
  //       let option = `<option value="${item.name}">${item.name}</option>`;
  //       selectElements += option;
  //     });

  //     document.getElementById("select-unidades").innerHTML = selectElements;
  //   });
  fetch("/campeonatos/dados")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let elementosCampeonato = "";

      let campeonatos = json;

      campeonatos.forEach((item) => {
        let elementoCampeonato = `<tr id="${item._id}">
          <td class="margin-right">${
            item.name
          }</td>
          <td class="margin-right">${item.unidade}</td>
          <td class="margin-right">${item.inscricao?.substr(0, 10)}</td>
          <td class="margin-right">${item.divulgacao?.substr(0, 10)}</td>
          <td class="margin-right">${item.status}</td>
        </tr>`;
        elementosCampeonato += elementoCampeonato;
      });

      let tableHead =
        "<thead><tr id='table-head'><td>Nome</td><td>Unidade</td><td>Período de Inscrição</td><td>Período de Divulgação</td><td>Status</td></tr><thead>";

      document.getElementById("teste").innerHTML =
        tableHead + "<tbody>" + elementosCampeonato + "</tbody>";
    });
}