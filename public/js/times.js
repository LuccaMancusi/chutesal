window.onload = atualizarTimes;

function atualizarTimes() {
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

      document.getElementById("select-campeonatos").innerHTML = selectElements;
    });
  fetch("/times/dados")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let elementosUnidade = "";
      let times = json;

      times.forEach((item) => {
        let elementoUnidade = `<tr id="${item._id}">
          <td onclick="popup(this)" style="cursor: pointer" class="margin-right">${item.name}</td>
          <td class="margin-right">${item.campeonato}</td>
          <td style = "color: red; cursor: pointer" onclick="deletar(this)">X</td>
        </tr>`;
        elementosUnidade += elementoUnidade;
      });
      let tableHead =
        "<thead><tr id='table-head'><td>Time</td><td>Campeonato</td></tr><thead>";

      document.getElementById("teste").innerHTML =
        tableHead + "<tbody>" + elementosUnidade + "</tbody>";
      document.getElementById("select-campeonatos").innerHTML = selectElements;
    });
}

function deletar(e) {
  let tr = e.parentNode;
  let id = tr.id;

  let time = { id };

  const options = {
    method: "DELETE",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(time),
  };

  const url = "/times/dados/" + id;

  fetch(url, options).then((res) => {
    atualizarTimes();
  });
}

function popup(e) {
  //consultar dados do objeto por id - get por id na url da api
  let url = "/times/dados/" + e.parentNode.id;
  let id = document.getElementById("id-update");
  let nome = document.getElementById("time-update");
  let campeonato = document.getElementById("campeonato-select");
  const modal = document.getElementById("popup");
  fetch("/campeonatos/dados")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let times = json;
      let selectElements = "";
      times.forEach((item) => {
        let option = `<option value="${item.name}">${item.name}</option>`;
        selectElements += option;
      });
      document.getElementById("campeonato-select").innerHTML = selectElements;
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
      for (var i, j = 0; (i = campeonato.options[j]); j++) {
        if (i.value == json.campeonato) {
          campeonato.selectedIndex = j;
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
  let nome = document.getElementById("time-update").value;
  let campeonato = document.getElementById("campeonato-select").value;

  const options = {
    method: "PUT",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify({
      name: nome,
      campeonato: campeonato,
    }),
  };

  const url = "/times/dados/" + id;

  fetch(url, options).then((res) => {
    atualizarTimes();
  });
}
