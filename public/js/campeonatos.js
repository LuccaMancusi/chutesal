window.onload = atualizarCampeonatos;

function atualizarCampeonatos() {
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

      document.getElementById("select-unidades").innerHTML = selectElements;
    });
  fetch("/campeonatos/dados")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let elementosCampeonato = "";

      let campeonatos = json;

      campeonatos.forEach((item) => {
        let elementoCampeonato = `<tr id="${item._id}">
          <td onclick="popup(this)" style="cursor: pointer" class="margin-right">${
            item.name
          }</td>
          <td class="margin-right">${item.unidade}</td>
          <td class="margin-right">${item.inscricao?.substr(0, 10)}</td>
          <td class="margin-right">${item.divulgacao?.substr(0, 10)}</td>
          <td class="margin-right">${item.status}</td>
          <td style = "color: red; cursor: pointer" onclick="deletar(this)">X</td>
        </tr>`;
        elementosCampeonato += elementoCampeonato;
      });

      let tableHead =
        "<thead><tr id='table-head'><td>Nome</td><td>Unidade</td><td>Período de Inscrição</td><td>Período de Divulgação</td><td>Status</td></tr><thead>";

      document.getElementById("teste").innerHTML =
        tableHead + "<tbody>" + elementosCampeonato + "</tbody>";
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

function popup(e) {
  //consultar dados do objeto por id - get por id na url da api
  let url = "/campeonatos/dados/" + e.parentNode.id;
  let id = document.getElementById("id-update");
  let nome = document.getElementById("unidade-update");
  let unidade = document.getElementById("unidades-select");
  let inscricao = document.getElementById("inscricaoUpdate");
  let divulgacao = document.getElementById("divulgacaoUpdate");
  let status = document.getElementById("statusUpdate");
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
      nome.value = json.name;
      inscricao.value = json.inscricao.substr(0, 10);
      divulgacao.value = json.divulgacao.substr(0, 10);
      for (var i, j = 0; (i = unidade.options[j]); j++) {
        if (i.value == json.nameUnidade) {
          unidade.selectedIndex = j;
          break;
        }
      }
      for (var i, j = 0; (i = status.options[j]); j++) {
        if (i.value == json.status) {
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
  let name = document.getElementById("unidade-update").value;
  let unidade = document.getElementById("unidades-select").value;
  let inscricao = document.getElementById("inscricaoUpdate").value;
  let divulgacao = document.getElementById("divulgacaoUpdate").value;
  let status = document.getElementById("statusUpdate").value;

  const options = {
    method: "PUT",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify({
      name,
      unidade,
      inscricao,
      divulgacao,
      status,
    }),
  };

  const url = "/campeonatos/dados/" + id;

  fetch(url, options).then((res) => {
    atualizarUnidades();
  });
}
