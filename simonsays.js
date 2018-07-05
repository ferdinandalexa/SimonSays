const niveles = 1;
let keys = generarTeclas(niveles)

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
    if (nivelActual == niveles)
    {
        return swal(`Ganaste. Fin del juego`, {
            buttons: false,
            icon: `success`
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
        }, 1000 + 1000 * i);
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
                icon: `error`
            }), 1000);
            // alert(`Perdiste :(`)}
        }
    }
}

siguienteNivel(0);

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