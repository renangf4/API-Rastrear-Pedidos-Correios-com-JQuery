var output = document.querySelector('.js-output');

function buscar() {
    output.innerHTML = `<div class="u-loading"></div>`;

    var input = document.querySelector('.js-input');
    input = input.value;

    if(input != '') {
        axios.get("https://api.rastrearpedidos.com.br/api/rastreio/v1?codigo=" + input)
        .then((response) => {
            var responseData = '';

            for (i in response.data) {
                if(response.data.error != 'validation_error') {
                    var responseGet = response.data[i];

                    if(responseGet.destino) {
                        responseData = responseData + `
                            <p>${responseGet.dataHora}</p>
                            <p><b>${responseGet.descricao}</b></p>
                            <p>de ${responseGet.cidade}/${responseGet.uf} para ${responseGet.destino.cidade}/${responseGet.destino.uf}</p>
                            <br><br>
                        `;
                    } else {
                        responseData = responseData + `
                            <p>${responseGet.dataHora}</p>
                            <p><b>${responseGet.descricao}</b></p>
                            <br><br>
                        `;
                    }
                } else {
                    alert('Código de rastreio inválido!');
                }
            }

            output.innerHTML = responseData;
        })
        .catch((error) => {
            console.log(error);
        });
    } else {
        alert('Por favor preencha um código válido!');
        output.innerHTML = '';
    }
}