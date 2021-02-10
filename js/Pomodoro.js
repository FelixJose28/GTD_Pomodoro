const btn_start = document.querySelector('#btn_start');
const btn_reset = document.querySelector('#btn_reset');


const w_minutes = document.querySelector('#w_minutes');
const w_seconds = document.querySelector('#w_seconds');
const counter = document.querySelector('#counter');
const b_minutes = document.querySelector('#b_minutes');
const b_seconds = document.querySelector('#b_seconds');


var changeText = true;
var startertime;

$(function() {
    $("#header").load("Header.html")
})

btn_start.addEventListener("click", function() {
    if (startertime === undefined) {
        startertime = setInterval(timer, 1000);
        changeText = false;
    }
    if (changeText == false) {
        btn_start.innerHTML = 'Parar';
        btn_start.classList.add('btn-warning');
        btn_start.classList.remove('btn-success');
        changeText = true;


    } else if (changeText == true) {
        btn_start.innerHTML = 'Continuar';
        btn_start.classList.add('btn-success')
        btn_start.classList.remove('btn-warning');
        changeText = false;
        stopInterval();
        startertime = undefined;


    }
});



btn_reset.addEventListener("click", function() {
    stopInterval();

    Swal.fire({
        title: 'Quieres reiniciar el reloj?',
        showDenyButton: true,
        denyButtonText: 'Cancelar',
        confirmButtonText: `Reiniciar`,
        showConfirmButtom: true,
    }).then((result) => {

        if (result.isConfirmed) {
            w_minutes.textContent = 25;
            w_seconds.textContent = "00";
            b_minutes.textContent = 5;
            b_seconds.textContent = "00";
            counter.textContent = 0;
            stopInterval();
            startertime = undefined;
        } else if (result.isDenied) {
            stopInterval();
            startertime = setInterval(timer, 1000)
        }
    })
});




function timer() {
    if (w_seconds.innerText != 0) {
        w_seconds.innerText--;
    } else if (w_minutes.innerText != 0 && w_seconds.innerText == 0) {
        w_seconds.innerText = 59;
        w_minutes.innerText--;
    }




    if (w_minutes.innerHTML == 0 && w_seconds.innerHTML == 0) {
        if (b_seconds.innerHTML == "05" && b_minutes.innerHTML == 0) {

            toastr["info"]("Continuas en 5 minutos", "Tόmate un descanzo");
        }
        if (b_seconds.innerText != 0) {
            b_seconds.innerText--;
        } else if (b_minutes != 0 && b_seconds != 0) {
            b_seconds.innerText = 59;
            b_minutes.innerText--;
        }
    }



    if (w_minutes.innerText == 0 && w_seconds.innerText == 0 && b_seconds.innerText == 0 && b_minutes.innerText == 0) {
        w_minutes.innerText = 0;
        w_seconds.innerText = "05";

        b_minutes.innerText = 0;
        b_seconds.innerText = "05";

        counter.innerText++;

        toastr["success"]("Has completado un ciclo", "Muy bien!");
        btn_start.classList.add('btn-success');
        btn_start.classList.remove('btn-danger');
        btn_start.innerHTML = 'Iniciar';
        stopInterval();
        startertime = undefined;
    }
}

function stopInterval() {
    clearInterval(startertime);
}