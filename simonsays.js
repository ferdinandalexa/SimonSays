const niveles = 15;
let keys = generarTeclas()

function generarTeclas()
{
    return new Array(niveles).fill(0).map(generarTeclaAleatoria);
}

function generarTeclaAleatoria()
{
    const min = 65;
    const max = 90;
    return Math.round(Math.random() * (max - min) + min)
}

function siguienteNivel(nivelActual)
{
    if (nivelActual == niveles)
    {
        return alert(`Ganaste. Fin del juego`);
    }

    alert(`Nivel ${nivelActual + 1}`);

    for (let i = 0; i <= nivelActual; i++)
    {
        setTimeout(() =>
        {
            activate(keys[i])
        }, 1500 + 1000 * i);
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
            alert(`Perdiste :(`)
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