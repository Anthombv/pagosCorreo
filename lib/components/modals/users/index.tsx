import react from "react"

const dateBirth = (document.getElementById("dateBirth") as HTMLInputElement).value
const age = document.getElementById("age")

const calcularEdad = (dateBirth) => {
    const fechaActual = new Date();
    const anoActual = (fechaActual.getFullYear());
    const mesActual = (fechaActual.getMonth()) +1;
    const diaActual = (fechaActual.getDate());

    const anoNacimiento = parseInt(String(dateBirth).substring(0, 4));
    const mesNacimiento = parseInt(String(dateBirth).substring(5, 7))
    const diaNacimiento = parseInt(String(dateBirth).substring(8, 10))

    let age = anoActual - anoNacimiento;
    if(mesActual < mesNacimiento) {
        age--;
    } else {
        if (mesActual === mesNacimiento){
            if(diaActual < diaNacimiento){
                age--;
            }
        }
    }
    return age
}

//window.addEventListener('load', function() {
//    dateBirth.addEventListener('change', function () {
//        if(this.value) {
//            age.innerText = 'La edad es: ' + calcularEdad(this.value) + ' años'
//        }
//    })
//})