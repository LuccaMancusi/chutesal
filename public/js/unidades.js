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
        let elementoUnidade = `<tr id="${item.id}">
          <td class="margin-right">${item.name}</td>
          <td class="margin-right">${item.address}</td>
          <td class="margin-right">${item.quadras}</td>
          <td style = "color: red;" onclick="deletar(this)">X</td>
        </tr>`;
        elementosUnidade += elementoUnidade;
      });

      document.getElementById("teste").innerHTML = elementosUnidade;
    });
}

// function deletarUnidades(id: Int) {
//   fetch("/unidades/dados/“ + id)
//    .then(
//       atualizarUnidades()
// )
