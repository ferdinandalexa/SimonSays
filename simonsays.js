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