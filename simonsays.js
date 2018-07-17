let keys;

class Dificultad
{
    constructor(niveles, tiempo)
    {
        this.niveles = niveles;
        this.tiempo = tiempo;
    }
}

let dif;

swal({
    title: `Dificultad`,
    text: `¿En qué dificultad quieres jugar?`,
    buttons: {
        easy: {
            text: `Facil`,
            value: 1
        },
        medium: {
            text: `Medio`,
            value: 2
        },
        hard: {
            text: `Dificil`,
            value: 3
        }
    }
}).then(valor =>
{
    if (valor === 1)
        dif = new Dificultad(5, 1000);
    else if (valor === 2)
        dif = new Dificultad(10, 500);
    else
        dif = new Dificultad(15, 250);

    keys = generarTeclas(dif.niveles);
    siguienteNivel(0);
})


function generarTeclas(lvls)
{
    return new Array(lvls).fill(0).map(generarTeclaAleatoria);
}

function generarTeclaAleatoria()
{
    const min = 65;
    const max = 90;
    return Math.round(Math.random() * (max - min) + min)
}

async function siguienteNivel(nivelActual)
{
    if (nivelActual == dif.niveles)
    {
        return swal({
            title: `Ganaste!! :D `,
            text: `¿Deseas jugar otra partida?`,
            buttons:
            {
                cancel: `Salir`,
                Volver:
                {
                    text: `Jugar otra vez`,
                    value: true
                }
            },
            icon: `success`
        }).then(seleccion =>
        {
            if (seleccion)
            {
                keys = generarTeclas(dif.niveles)
                siguienteNivel(0);
            }
            else
            {
                swal(`Gracias por jugar`);
            }
        });
    }

    await swal(`Nivel ${nivelActual + 1}`, {
        buttons: false,
        timer: 1500,
    });

    for (let i = 0; i <= nivelActual; i++)
    {
        setTimeout(() =>
        {
            activate(keys[i])
        }, 1000 + dif.tiempo * i);
    }

    let i = 0;
    let currentKey = keys[i];
    window.addEventListener(`keydown`, onclick);

    function onclick(eve)
    {
        if (eve.keyCode == currentKey)
        {
            activate(currentKey, { success: true });
            i++
            if (i > nivelActual)
            {
                window.removeEventListener(`keydown`, onclick);
                setTimeout(() =>
                {
                    siguienteNivel(nivelActual + 1);
                }, 1750);
            }
            currentKey = keys[i];
        }
        else
        {
            activate(eve.keyCode, { fail: true })
            window.removeEventListener(`keydown`, onclick);
            setTimeout(() => swal(`Perdiste`, {
                title: `Perdiste :(`,
                text: `¿Deseas vover a intentarlo?`,
                buttons:
                {
                    cancel: `Salir`,
                    volver:
                    {
                        text: `Volver a intentar`,
                        value: true
                    }
                },
                icon: `error`
            }).then(seleccion =>
            {
                if (seleccion)
                {
                    keys = generarTeclas(dif.niveles)
                    siguienteNivel(0);
                }
                else
                {
                    swal(`Gracias por jugar`);
                }
            }), 1000);
        }
    }
}


// siguienteNivel(0);

function getElementByKeyCode(keyCode)
{
    return document.querySelector(`[data-key = "${keyCode}"]`);
}

function activate(keyCode, opts = {})
{
    const element = getElementByKeyCode(keyCode);
    element.classList.add(`active`);
    if (opts.success)
    {
        element.classList.add(`success`);
    }
    else if (opts.fail)
    {
        element.classList.add(`fail`);
    }
    setTimeout(() =>
    {
        deactivate(element)
    }, 500);
}

function deactivate(element)
{
    element.className = `key`;
}