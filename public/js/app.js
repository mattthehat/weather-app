const form = document.querySelector('form');
const search = document.querySelector('#address');

if (form) {
    form.addEventListener('submit', e => {
        const location = search.value;
        fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
            res.json().then(data => {
                if (data.error) {
                    document.querySelector('.data').innerHTML = '';
                    document.querySelector('.error').innerHTML = `<p class="error">${data.error}</p>`
                } else {
                    document.querySelector('.error').innerHTML = '';
                    document.querySelector('.data').innerHTML =
                        `<p class="title"><span>Location:</span> ${data.details}</p>
                <p class="forcast"><span>Forcast:</span> ${data.forcast}</p>`
                }
            })
        }).then(() => {
            search.value = '';
        });
        e.preventDefault();
    })
}