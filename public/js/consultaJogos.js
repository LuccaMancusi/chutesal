window.onload = atualizarJogos;

function atualizarJogos() {
    fetch("/jogos/dados")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        let elementosUnidade = "";
  
        let jogos = json;
  
        jogos.forEach((item) => {
          let elementoUnidade = `<tr id="${item._id}">
            <td class="margin-right">${item.team1}</td>
            <td class="margin-right">${item.team2}</td>
            <td class="margin-right">${item.score}</td>
            <td class="margin-right">${item.date?.substr(0, 10)}</td>
            <td class="margin-right">${item.time}</td>
            <td class="margin-right">${item.campeonato}</td>
          </tr>`;
          elementosUnidade += elementoUnidade;
        });
        let tableHead =
          "<thead><tr id='table-head'><td>Time 1</td><td>Time 2</td><td>Placar</td><td>Data</td><td>Horário</td><td>Campeonato</td></tr><thead>";
  
        document.getElementById("teste").innerHTML =
          tableHead + "<tbody>" + elementosUnidade + "</tbody>";
      });
  }