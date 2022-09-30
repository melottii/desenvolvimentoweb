const tamanhoCelula = 100;
let tabuleiro = [[],[],[],[],[],[],[],[]]
document.body.append(criaTabuleiro());

function criaTabuleiro() {
    const tamanho = 8;
    let tabela = document.createElement('table');

    tabela.style.borderStyle = 'solid';
    tabela.style.borderSpacing = 0;
    tabela.style.margin = 'auto';

    for (let i = 0; i < tamanho; i++) {
        let linha = document.createElement('tr');
        tabela.append(linha);
        for (let j = 0; j < tamanho; j++) {
            let celula = document.createElement('td');
            celula.addEventListener('drop', drop)
            linha.append(celula);

            celula.style.width = `${tamanhoCelula}px`;
            celula.style.height = `${tamanhoCelula}px`;
            if (i % 2 === j % 2) {
                celula.addEventListener('dragover', allowDrop)
                celula.style.backgroundColor = 'black';
                celula.id = `i${i}-j${j}`
                if (i * 8 + j <= 24) {
                    const peca = criaPeca('black')
                    peca.id = `b-i${i}-j${j}`
                    celula.append(peca)
                    celula.removeEventListener('dragover', allowDrop)
                    tabuleiro[i][j] = [celula.id, peca.id]
                } else if (i * 8 + j >= 40) {
                    const peca = criaPeca('red')
                    peca.id = `r-i${i}-j${j}`
                    peca.draggable = true
                    celula.append(peca)
                    tabuleiro[i][j] = [celula.id, peca.id]
                    celula.removeEventListener('dragover', allowDrop)
                } else {
                    tabuleiro[i].push([celula.id, 0])
                }
            } else {
                celula.style.backgroundColor = 'white';
                tabuleiro[i].push([undefined, undefined])
            }
        }
    }
    return tabela;
}


function jogadorDaVez() {
    const pecas = document.querySelectorAll('.peca')
    pecas.forEach(peca => {
        peca.draggable = !peca.draggable
    });
}


function criaPeca(cor) {
    let imagem = document.createElement('img');
    imagem.classList.add('peca')
    imagem.setAttribute('src', `img/${cor}.png`);
    imagem.setAttribute('width', `${tamanhoCelula-4}px`);
    imagem.setAttribute('height', `${tamanhoCelula-4}px`);
    imagem.setAttribute('draggable', 'false')
    imagem.addEventListener('dragstart', drag)
    return imagem;
}


function allowDrop(ev) {
    ev.preventDefault();
}


function drag(ev) {
    ev.dataTransfer.setData("imgid", ev.target.id);
    ev.dataTransfer.setData("pos", ev.target.parentElement.id )
}


function drop(ev) {
    const imgid= ev.dataTransfer.getData("imgid");
    const imagem = document.querySelector(`#${imgid}`)

    const pos = ev.dataTransfer.getData("pos");
    const nPos = ev.target.id
    let sentido = -1
    const i1 = Number(pos.charAt(1))
    const j1 = Number(pos.charAt(4))
    const i2 = Number(nPos.charAt(1))
    const j2 = Number(nPos.charAt(4))

    if (imgid.charAt(0) === "b"){
        sentido = 1
    }
    if ((i1+sentido===i2) && (j2 === j1+1 || j2 === j1-1)) {
        imagem.parentElement.addEventListener('dragover', allowDrop)
        ev.target.appendChild(imagem);
        ev.target.removeEventListener('dragover', allowDrop)
        tabuleiro[i2][j2][1] = imgid
        tabuleiro[i1][j1][1] = 0
        jogadorDaVez()

    }else if(((i1+sentido*2===i2) && (j2 === j1+2 || j2 === j1-2)) &&
        tabuleiro[i2-sentido][j2-1] || tabuleiro[i2-sentido][j2+1]) {
        console.log(i1, j1)
        console.log(i2, j2)
        console.log(i2-sentido)
        if ((tabuleiro[i2-sentido][Math.abs(j2-j1)][1]!==0)&&
            (tabuleiro[i2-sentido][Math.abs(j2-j1)][1].charAt(0)!==imgid.charAt(0))){
                imagem.parentElement.addEventListener('dragover', allowDrop)
                ev.target.appendChild(imagem);
                ev.target.removeEventListener('dragover', allowDrop)
                tabuleiro[i2][j2][1] = imgid
                tabuleiro[i1][j1][1] = 0
            const peca = document.getElementById(tabuleiro[i2 - sentido][Math.abs(j2 - j1)][1]);
            tabuleiro[i2 - sentido][Math.abs(j2 - j1)][1] = 0
            peca.parentElement.addEventListener('dragover', allowDrop)
            peca.remove()
            jogadorDaVez()
        }
    }
}
