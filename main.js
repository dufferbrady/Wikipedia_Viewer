function search() {
    var value = document.getElementById('mySearch').value;
    var cb = '&callback=JSON_CALLBACK';
    var url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrlimit=5&prop=pageimages%7Cextracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    const root = document.getElementById('root');
    $.ajax({
        url: url + value + cb,
        dataType: 'jsonp',
        success: function(data) {
            var results = data.query.pages;
            if ($.trim($("#root").html()) !== '') {
                removeData();
                populate(results)
            }   else {
                    populate(results)
                }
        }
    })
}

function removeData() {
    $('.container').remove();
}

function populate(input) {
    for (var result in input) {
        var page = input[result]
        const container = document.createElement('div');
        const thumbnail = document.createElement('div');
        const h1 = document.createElement('h1');
        const p = document.createElement('p');
        const a = document.createElement('a');

        container.setAttribute('class', 'container');
        thumbnail.setAttribute('class', 'thumbnail');
        h1.textContent = page.title;    
        p.textContent = page.extract;
        a.setAttribute('href', 'https://en.wikipedia.org/?curid=' + page.pageid);
        a.setAttribute('target', '_blank');
        a.textContent = 'Read more here!'
        
        root.appendChild(container);
        container.appendChild(thumbnail);
        thumbnail.appendChild(h1);
        thumbnail.appendChild(p);
        thumbnail.appendChild(a);
    }
};

let searchBartransition = () => {
    let searchContainer = $('#search-content');
    searchContainer[0].classList.toggle('remove-search-content');
}

let searchAgainBtn = () => {
    searchAgain();
    searchBartransition();
    removeData();
}

let searchAgain = () => {
    let searchAgain = $('#search-again-target')[0];
    if(searchAgain.classList.value === 'search-again-hidden' || searchAgain.classList.value === 'search-again') {
        searchAgain.classList.toggle('search-again');
        searchAgain.classList.toggle('search-again-hidden');
    } 
};

$(document).ready(() => {
    $('#mySearch').keyup(function(event) {
        if (event.keyCode === 13) {
            //Call Search Function Here
            search();
            searchBartransition();
            searchAgain();
        }
    })
    $('.searchIcon').on('click', function() {
        search();
    })
    $('.search-again-button').on('click', () => {
        searchAgainBtn();
    });
});