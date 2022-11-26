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
        let elementoUnidade = `<tr>
          <td>${item.name}</td>
          <td>${item.address}</td>
          <td>${item.quadras}</td>
          <td style = "color: red;" onclick="deletar(this)">X</td>
        </tr>`;
        elementosUnidade += elementoUnidade;
      });

      document.getElementById("teste").innerHTML = elementosUnidade;
    });
}