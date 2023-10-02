const src = ['./src/rock.png', './src/paper.png', './src/scissor.png'];

var scoreBoardP1 = 1;
var scoreBoardP2 = 1;
unknownImage = () => {
    $("#srcPlayerOne").attr('src', './src/unknown.png')
    $("#srcPlayerTwo").attr('src', './src/unknown.png')
}
playerChoose = (event) => {
    if (event.name == 'rock') {
        $("#srcPlayerOne").attr('src', src[0])
        $("#srcPlayerTwo").attr('src', './src/unknown.png')
    } else if (event.name == 'paper') {
        $("#srcPlayerOne").attr('src', src[1])
        $("#srcPlayerTwo").attr('src', './src/unknown.png')

    } else if (event.name == 'scissor') {
        $("#srcPlayerOne").attr('src', src[2])
        $("#srcPlayerTwo").attr('src', './src/unknown.png')

    }
}
playGame = () => {
    if ($("#rock").is(':checked') || $("#paper").is(':checked') || $("#scissor").is(':checked')) {
        animation();
        $("#playGame").attr('onclick', '');
    } else {
        swal.fire({
            title: 'ops',
            text: 'Selecione uma opção',
            icon: 'error'
        })
    }
}
animation = () => {
    let resultadoP2 = ''

    let loop = setInterval(() => {
        let randomize = Math.floor(Math.random() * src.length);
        resultadoP2 = randomize;
        $("#srcPlayerTwo").attr('src', src[randomize]);
    }, 200);

    setTimeout(() => {
        clearInterval(loop);
        validate();
        $("#playGame").attr('onclick', 'playGame()');

    }, 4000)

    validate = () => {
        let rock = $("#rock").is(':checked');
        let paper = $("#paper").is(':checked');
        let scissor = $("#scissor").is(':checked');
        if (rock && resultadoP2 == 0 || paper && resultadoP2 == 1 || scissor && resultadoP2 == 2) {
            drawn();
            verifyEndGame();

        } else if (rock && resultadoP2 == 1 || paper && resultadoP2 == 2 || scissor && resultadoP2 == 0) {
            loose();
            verifyEndGame();


        } else if (rock && resultadoP2 == 2 || paper && resultadoP2 == 0 || scissor && resultadoP2 == 1) {
            victory();
            verifyEndGame();

        }
    }
}
victory = () => {
    swal.fire({
        title: 'Vitória',
        icon: 'success',
        confirmButtonColor: '#469a5f',
        confirmButtonText: 'ok'
    })

    $("#scoreBoardPlayerOne").text(scoreBoardP1++);

}
drawn = () => {
    swal.fire({
        title: 'Empate',
        icon: 'warning',
        confirmButtonColor: '#469a5f',
        confirmButtonText: 'ok'
    })
    $("#scoreBoardPlayerOne").text(scoreBoardP1++);
    $("#scoreBoardPlayerTwo").text(scoreBoardP2++);

}
loose = () => {
    swal.fire({
        title: 'Derrota',
        icon: 'error',
        confirmButtonColor: '#541212',
        confirmButtonText: 'ok'
    })
    $("#scoreBoardPlayerTwo").text(scoreBoardP2++);

}
verifyEndGame = () => {
    let scoreBoardPlayerOne = document.getElementById("scoreBoardPlayerOne");
    let scoreBoardPlayerTwo = document.getElementById("scoreBoardPlayerTwo");
    if (scoreBoardPlayerOne.innerHTML == 5 && scoreBoardPlayerTwo.innerHTML == 5) {
        swal.fire({
            title: 'Vocês empataram o JokenPô',
            text: 'Obrigado por testar o jogo',
            icon: 'warning',
            confirmButtonColor: '#469a5f',
            confirmButtonText: 'ok'
        }).then((ev) => {
            if (ev.isConfirmed) {
                scoreBoardPlayerOne.innerHTML = 0;
                scoreBoardPlayerTwo.innerHTML = 0;
                scoreBoardP1 = 1;
                scoreBoardP2 = 1;
            }
        })

    } else if (scoreBoardPlayerTwo.innerHTML >= 5) {
        swal.fire({
            title: 'Você perdeu o JokenPô',
            text: 'Obrigado por testar o jogo',
            icon: 'error',
            confirmButtonColor: '#541212',
            confirmButtonText: 'ok'
        }).then((ev) => {
            if (ev.isConfirmed) {
                scoreBoardPlayerOne.innerHTML = 0;
                scoreBoardPlayerTwo.innerHTML = 0;
                scoreBoardP1 = 1;
                scoreBoardP2 = 1;
            }
        })
    } else if (scoreBoardPlayerOne.innerHTML >= 5) {
        swal.fire({
            title: 'Você venceu o JokenPô',
            text: 'Obrigado por testar o jogo',
            icon: 'success',
            confirmButtonColor: '#469a5f',
            confirmButtonText: 'ok'
        }).then((ev) => {
            if (ev.isConfirmed) {
                scoreBoardPlayerOne.innerHTML = 0;
                scoreBoardPlayerTwo.innerHTML = 0;
                scoreBoardP1 = 1;
                scoreBoardP2 = 1;
            }
        })
    }

}