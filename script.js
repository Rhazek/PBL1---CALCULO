function capitalizacaoContinua(inicial, taxa, tempo) {
    return inicial * Math.exp((taxa / 100) * tempo);
}

function capitalizacaoExponencial(inicial, taxa, tempo) {
    return inicial * Math.pow((1 + taxa / 100), tempo);
}

function capitalizacaoLinear(inicial, taxa, tempo) {
    return inicial * (1 + (taxa / 100) * tempo);
}

function derivadaCapitalizacaoContinua(inicial, taxa, tempo) {
    return (taxa / 100) * capitalizacaoContinua(inicial, taxa, tempo);
}

function simular() {
    let inicial = parseFloat(document.getElementById('inicial').value);
    let taxa = parseFloat(document.getElementById('taxa').value);
    let tempo = parseFloat(document.getElementById('tempo').value);
    
    let passos = 20;
    let tempos = Array.from({length: passos + 1}, (_, i) => (i / passos) * tempo);
    let valoresContinua = tempos.map(t => capitalizacaoContinua(inicial, taxa, t));
    let valoresExponencial = tempos.map(t => capitalizacaoExponencial(inicial, taxa, t));
    let valoresLinear = tempos.map(t => capitalizacaoLinear(inicial, taxa, t));

    let ctx = document.getElementById('grafico').getContext('2d');
    if (window.grafico instanceof Chart) {
        window.grafico.destroy();
    }
    window.grafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: tempos,
            datasets: [
                { label: 'Contínua', data: valoresContinua, borderColor: 'blue', fill: false },
                { label: 'Exponencial', data: valoresExponencial, borderColor: 'green', fill: false },
                { label: 'Linear', data: valoresLinear, borderColor: 'red', fill: false }
            ]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false, 
            scales: { 
                x: { 
                    title: { display: true, text: 'Tempo (anos)' },
                    min: 0,
                    max: tempo,
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(1); 
                        }
                    }
                },
                y: { title: { display: true, text: 'Montante (R$)' }}
            }
        }
    });
    
    document.getElementById('resultado').innerHTML = `
        <p><strong>Após ${tempo} anos:</strong></p>
        <p>Capitalização Contínua: R$ ${capitalizacaoContinua(inicial, taxa, tempo).toFixed(2)}</p>
        <p>Capitalização Exponencial: R$ ${capitalizacaoExponencial(inicial, taxa, tempo).toFixed(2)}</p>
        <p>Capitalização Linear: R$ ${capitalizacaoLinear(inicial, taxa, tempo).toFixed(2)}</p>
        <p>Taxa de Variação (Derivada): R$ ${derivadaCapitalizacaoContinua(inicial, taxa, tempo).toFixed(2)}</p>
    `;
}