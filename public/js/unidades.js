window.onload = atualizarUnidades;

function atualizarUnidades() {
  fetch("/unidades/dados")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let elementosUnidade = "";

      let unidades = json;

      unidades.forEach((item) => {
        let elementoUnidade = `<tr id="${item._id}">
          <td onclick="popup(this)" class="margin-right">${item.name}</td>
          <td class="margin-right">${item.address}</td>
          <td class="margin-right">${item.cep}</td>
          <td style = "color: red; cursor: pointer" onclick="deletar(this)">X</td>
        </tr>`;
        elementosUnidade += elementoUnidade;
      });
      let tableHead =
        "<thead><tr id='table-head'><td>Nome</td><td>Endereço</td><td>CEP</td></tr><thead>";

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

  const url = "/unidades/dados/" + id;

  fetch(url, options).then((res) => {
    atualizarUnidades();
  });
}

function popup(e) {
  //abrir popup
  const modal = document.getElementById("popup");
  modal.showModal();

  //consultar dados do objeto por id - get por id na url da api
  //modificar valores dos campos
}

function fecharPopUp() {
  const modal = document.getElementById("popup");
  modal.close();
}
