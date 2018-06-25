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
    setTimeout(() => {
        deactivate(element)
    },500);
}

function deactivate(element)
{
    element.className = `key`;
}