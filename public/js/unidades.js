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
          <td class="margin-right">${item.name}</td>
          <td class="margin-right">${item.address}</td>
          <td class="margin-right">${item.quadras}</td>
          <td style = "color: red; cursor: pointer" onclick="deletar(this)">X</td>
        </tr>`;
        elementosUnidade += elementoUnidade;
      });
      let tableHead =
        "<thead><tr id='table-head'><td>Nome</td><td>Endereço</td><td>Quadras</td></tr><thead>";

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
