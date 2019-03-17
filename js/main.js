chrome.runtime.sendMessage({ type: "GET_PAGE_STATUS" }, function (response) {
    run(response)
});

const run = (status) => {

    if (status) {

        const fragment = document.createDocumentFragment();
        const elWrapper = document.createElement('div');
        const elTextReason = document.createElement('div');
        const elInputReason = document.createElement('input');
        const elTextTime = document.createElement('div');
        const elInputTime = document.createElement('input');
        const elSubmit = document.createElement('input');

        elWrapper.classList.add('wrapper')
        elWrapper.appendChild(elTextReason)
        elWrapper.appendChild(elInputReason)
        elWrapper.appendChild(elTextTime)
        elWrapper.appendChild(elInputTime)
        elWrapper.appendChild(elSubmit)

        elTextReason.innerHTML = "What brings you here today?"
        elTextTime.innerHTML = "Cool, how much time do you need?"
        elSubmit.setAttribute('type', 'submit')
        elSubmit.setAttribute('value', 'Noice')

        fragment.appendChild(elWrapper);
        document.body.appendChild(fragment);

        setTimeout( () => {
            elWrapper.classList.add('active')
        }, 0)

        elSubmit.addEventListener('click', () => {
            alert('heheheita')
        })
        

    }

    console.log(status)
}