window.onload = atualizarUnidades;

function atualizarUnidades() {
  fetch("/unidades/dados")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let elementosUnidade = "";
      let selectElements = "";
      let unidades = json;

      unidades.forEach((item) => {
        let option = `<option value="${item.name}">${item.name}</option>`;
        let elementoUnidade = `<tr id="${item._id}">
          <td onclick="popup(this)" style="cursor: pointer" class="margin-right">${item.name}</td>
          <td class="margin-right">${item.address}</td>
          <td class="margin-right">${item.cep}</td>
          <td style = "color: red; cursor: pointer" onclick="deletar(this)">X</td>
        </tr>`;
        elementosUnidade += elementoUnidade;
        selectElements += option;
      });
      let tableHead =
        "<thead><tr id='table-head'><td>Nome</td><td>Endereço</td><td>CEP</td></tr><thead>";

      document.getElementById("teste").innerHTML =
        tableHead + "<tbody>" + elementosUnidade + "</tbody>";
      document.getElementById("unidades").innerHTML = selectElements;
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
  //consultar dados do objeto por id - get por id na url da api
  let url = "/unidades/dados/" + e.parentNode.id;
  let id = document.getElementById("id-update");
  let nome = document.getElementById("unidade-update");
  let endereco = document.getElementById("endereco-update");
  let cep = document.getElementById("cep-update");
  // let submitButton = document.getElementById("update-button")
  const modal = document.getElementById("popup");
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      console.log(json);
      id.value = json._id;
      nome.value = json.name;
      endereco.value = json.address;
      cep.value = json.cep;
      // modal.id = e.parentNode.id;
      // submitButton.onclick = editarUnidade()
    })
    .then(() => {
      modal.showModal();
    })
    .catch((err) => {
      console.log(err);
    });
}

function fecharPopUp() {
  const modal = document.getElementById("popup");
  modal.close();
}

function editarUnidade() {
  let id = document.getElementById("id-update").value;
  let nome = document.getElementById("unidade-update").value;
  let endereco = document.getElementById("endereco-update").value;
  let cep = document.getElementById("cep-update").value;

  const options = {
    method: "PUT",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify({
      name: nome,
      address: endereco,
      cep: cep,
    }),
  };

  const url = "/unidades/dados/" + id;

  fetch(url, options).then((res) => {
    atualizarUnidades();
  });
}
