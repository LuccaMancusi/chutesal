window.onload = atualizarUnidades;

function atualizarUnidades() {
  let selectElements = "";
  fetch("/unidades/dados")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let elementosUnidade = "";

      let unidades = json;

      unidades.forEach((item) => {
        let option = `<option value="${item.name}">${item.name}</option>`;
        selectElements += option;
      });

      document.getElementById("unidades").innerHTML = selectElements;
    });
  fetch("/quadras/dados")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let elementosUnidade = "";
      let quadras = json;

      quadras.forEach((item) => {
        let elementoUnidade = `<tr id="${item._id}">
          <td onclick="popup(this)" style="cursor: pointer" class="margin-right">${item.nameQuadra}</td>
          <td class="margin-right">${item.nameUnidade}</td>
          <td style = "color: red; cursor: pointer" onclick="deletar(this)">X</td>
        </tr>`;
        elementosUnidade += elementoUnidade;
      });
      let tableHead =
        "<thead><tr id='table-head'><td>Quadra</td><td>Unidade</td></tr><thead>";

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

  const url = "/quadras/dados/" + id;

  fetch(url, options).then((res) => {
    atualizarUnidades();
  });
}

function popup(e) {
  //consultar dados do objeto por id - get por id na url da api
  let url = "/quadras/dados/" + e.parentNode.id;
  let id = document.getElementById("id-update");
  let nome = document.getElementById("unidade-update");
  let unidade = document.getElementById("unidades-select");
  const modal = document.getElementById("popup");
  fetch("/unidades/dados")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let unidades = json;
      let selectElements = "";
      unidades.forEach((item) => {
        let option = `<option value="${item.name}">${item.name}</option>`;
        selectElements += option;
      });
      document.getElementById("unidades-select").innerHTML = selectElements;
    })
    .catch((err) => {
      console.log(err);
    });
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      console.log(json);
      id.value = json._id;
      nome.value = json.nameQuadra;
      for (var i, j = 0; (i = unidade.options[j]); j++) {
        if (i.value == json.nameUnidade) {
          unidade.selectedIndex = j;
          break;
        }
      }
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
  let unidade = document.getElementById("unidades-select").value;

  const options = {
    method: "PUT",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify({
      name: nome,
      unidade: unidade,
    }),
  };

  const url = "/quadras/dados/" + id;

  fetch(url, options).then((res) => {
    atualizarUnidades();
  });
}
