//function to access the wikipedia API and load results on the page
let search = () => {
    let value = document.getElementById('mySearch').value;
    let cb = '&callback=JSON_CALLBACK';
    let url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrlimit=5&prop=pageimages%7Cextracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    $.ajax({
        url: url + value + cb,
        dataType: 'jsonp',
        success: data => {
            let results = data.query.pages;
            //If the page already has results shown remove them then repopulate with new results otherwise just populate
            if ($.trim($("#root").html()) !== '') {
                removeData();
                populate(results)
            }   else {
                    populate(results)
                }
        }
    });
};

//function to remove the data from the container if called upon
let removeData = () => {
    $('.container').remove();
};

//create the read more button that will bring the user to the wikipedia page associated with the thumbnail
let thumbnailButton = (thumbnail, input) => {
    //Create a link and button element
    let a = document.createElement('a');
    let button = document.createElement('button');
    //Give the link the right link to the wiki page and ensure it opens in a new tab for the user.
    a.setAttribute('href', 'https://en.wikipedia.org/?curid=' + input.pageid);
    a.setAttribute('target', '_blank');
    button.setAttribute('class', 'thumbnail-button');
    button.textContent = 'Read more here!'
    //append the link the thumbnail
    a.appendChild(button);
    thumbnail.appendChild(a);
};

//creat the thumbnail that will hold all of the data populated from the wiki API
let thumbnailBody = (thumbnail, input) => {
    //create elements and assign the data header and text to the created elements
    let h2 = document.createElement('h2');
    let p = document.createElement('p');
    h2.textContent = input.title;    
    p.textContent = input.extract;
    //append the header and body to the thumbnail
    thumbnail.appendChild(h2);
    thumbnail.appendChild(p);
    //run the function to create the link and button feature
    thumbnailButton(thumbnail, input);
};

//create a thumbnail that will be placed inside a container 
let createthumbnail = (container, page) => {
    let thumbnail = document.createElement('div');
    thumbnail.setAttribute('class', 'thumbnail');
    container.appendChild(thumbnail);
    thumbnailBody(thumbnail, page);
};

//a function that will populate the page with the responded data from the wiki API
let populate = input => {
    let container = document.createElement('div');
    //start a loop that will access each of the responses results
    for (let result in input) {
        let page = input[result]
        container.setAttribute('class', 'container');
        root.appendChild(container);
        //populate each response in a thumbnail element
        createthumbnail(container, page);
    }
};

//a function to hide/show the search bar
let searchBartransition = () => {
    let searchContainer = $('#search-content')
    searchContainer[0].classList.toggle('remove-search-content')
};

//a function that will toggle the visibility of the search again button
let searchAgain = () => {
    let searchAgain = $('#search-again-target')[0];
    if(searchAgain.classList.value === 'search-again-hidden' || searchAgain.classList.value === 'search-again') {
        searchAgain.classList.toggle('search-again')
        searchAgain.classList.toggle('search-again-hidden')
    } 
};

//if the user decided they want to make a new search this function will reset the page back
let searchAgainBtn = () => {
    searchAgain();
    searchBartransition();
    removeData();
};

//Once document is ready and loaded execute neccessary functions when called upon.
$(document).ready(() => {
    $('#mySearch').keyup(event => {
        //if the user hits the enter key fire the appropriate functions.
        if (event.keyCode === 13) {
            //search for the users input
            search();
            //remove the search bar from visibility
            searchBartransition();
            //Show the search again button for the user if they wish to search again
            searchAgain();
        }
    })
    //If the user down't have an enter button they can search usong the search icon beside the search bar
    $('.searchIcon').on('click', () => {
        search();
    })
    //if the user clicks the search again button ensure the page dynamically responds appropriately
    $('.search-again-button').on('click', () => {
        searchAgainBtn();
    });
});