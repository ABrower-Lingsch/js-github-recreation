(function() {

    'use strict'

    const API_KEY = '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'
    function generateHTML(data) {
        console.log({data});
        const source1 = document.querySelector("#repos-template").innerHTML;
        const source2 = document.querySelector("#user-template").innerHTML;
        const source3 = document.querySelector("#org-template").innerHTML;
        const template1 = Handlebars.compile(source1);
        const template2 = Handlebars.compile(source2);
        const template3 = Handlebars.compile(source3);

        // const context = data;
        const html1 = template1({repos: data[0]});
        const html2 = template2({user: data[1]});
        const html3 = template3({orgs: data[2]});
        // console.log('HTML', html);
        document.querySelector('.repos').insertAdjacentHTML('afterbegin', html1);
        document.querySelector('.profile-info').insertAdjacentHTML('afterbegin', html2);
        document.querySelector('.org').insertAdjacentHTML('afterbegin', html3);
    }
    Promise.all([
        fetch(`https://api.github.com/users/ABrower-Lingsch/repos`),
        fetch(`https://api.github.com/users/ABrower-Lingsch`),
        fetch(`https://api.github.com/users/ABrower-Lingsch/orgs`),
    ])
    .then(function(responses) {
        console.log('response', responses);
        // if (!responses.ok){
        //     throw new Error(`Network response was not OK. Received Status ${responses.status}.`);
        // }
        return Promise.all(responses.map(function (response) {
            return response.json();
        }));
    })
    .then(function(json) {
        console.log('json', json);
        generateHTML(json);
    })
    .catch(function(error) {
        console.error('Error', error);
    });
    

})();