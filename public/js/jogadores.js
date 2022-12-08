window.onload = atualizarJogadores;

function atualizarJogadores() {
  fetch("/jogadores/dados")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let elementosJogador = "";

      let jogadores = json;

      jogadores.forEach((item) => {
        let elementoJogador = `<tr id="${item._id}">
        <td class="margin-right">${item.number}</td>
          <td class="margin-right">${item.name}</td>
          <td class="margin-right">${item.nickname}</td>
          <td class="margin-right">${item.birthday?.substr(0, 10)}</td>
          <td style = "color: red; cursor: pointer" onclick="deletar(this)">X</td>
        </tr>`;
        elementosJogador += elementoJogador;
      });

      let tableHead =
        "<thead><tr id='table-head'><td>Número</td><td>Nome</td><td>Apelido</td><td>Data de Nascimento</td></tr><thead>";

      document.getElementById("teste").innerHTML =
        tableHead + "<tbody>" + elementosJogador + "</tbody>";
    });
}

function deletar(e) {
  let tr = e.parentNode;
  let id = tr.id;

  let jogador = { id };

  const options = {
    method: "DELETE",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(jogador),
  };

  const url = "/jogadores/dados/" + id;

  fetch(url, options).then((res) => {
    atualizarJogadores();
  });
}

// function deletarUnidades(id: Int) {
//   fetch("/unidades/dados/“ + id)
//    .then(
//       atualizarUnidades()
// )

function jogadoresSucesso(){
  alert("Inscrição realizada com sucesso!")
}