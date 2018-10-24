let search = () => {
    let value = document.getElementById('mySearch').value;
    let cb = '&callback=JSON_CALLBACK';
    let url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrlimit=5&prop=pageimages%7Cextracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    $.ajax({
        url: url + value + cb,
        dataType: 'jsonp',
        success: data => {
            let results = data.query.pages;
            if ($.trim($("#root").html()) !== '') {
                removeData();
                populate(results)
            }   else {
                    populate(results)
                }
        }
    })
}

let removeData = () => {
    $('.container').remove();
}

let thumbnailButton = (thumbnail, input) => {
    let a = document.createElement('a');
    let button = document.createElement('button');

    a.setAttribute('href', 'https://en.wikipedia.org/?curid=' + input.pageid);
    a.setAttribute('target', '_blank');

    button.setAttribute('class', 'thumbnail-button');
    button.textContent = 'Read more here!'

    a.appendChild(button);
    thumbnail.appendChild(a);
}

let thumbnailBody = (thumbnail, input) => {
    let h1 = document.createElement('h1');
    let p = document.createElement('p');

    h1.textContent = input.title;    
    p.textContent = input.extract;

    thumbnail.appendChild(h1);
    thumbnail.appendChild(p);
    thumbnailButton(thumbnail, input);
}

let createthumbnail = (container, page) => {
    let thumbnail = document.createElement('div');
    thumbnail.setAttribute('class', 'thumbnail');
    container.appendChild(thumbnail);
    thumbnailBody(thumbnail, page);
};

let populate = input => {
    for (let result in input) {
        let page = input[result]
        let container = document.createElement('div');
        container.setAttribute('class', 'container');
        root.appendChild(container);
        createthumbnail(container, page);
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
    $('#mySearch').keyup(event => {
        if (event.keyCode === 13) {
            //Call Search Function Here
            search();
            searchBartransition();
            searchAgain();
        }
    })
    $('.searchIcon').on('click', () => {
        search();
    })
    $('.search-again-button').on('click', () => {
        searchAgainBtn();
    });
});