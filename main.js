function search() {
    var value = document.getElementById('mySearch').value;
    var url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&gsrlimit=10&prop=pageimages%7Cextracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    const root = document.getElementById('root');
    $.ajax({
        url: url + value,
        dataType: 'jsonp',
        success: function(data) {
            if ($.trim($("#root").html()) !== '') {
                removeData();
                populate(data)
            }   else {
                    populate(data)
                }
        }
    })
}

$(document).ready(function() {
    $('#mySearch').keyup(function(event) {
        if (event.keyCode === 13) {
            search();
            //Call Search Function Here
        }
    })
    $('.searchIcon').on('click', function() {
        search();
    })
})

function removeData() {
    $('.container').remove();
}

function populate(api) {
    for (var j = 0; j < 4; j++) {
        const container = document.createElement('div');
        const thumbnail = document.createElement('div');
        const h1 = document.createElement('h1');
        const p = document.createElement('p');
        const a = document.createElement('a');

        container.setAttribute('class', 'container');
        thumbnail.setAttribute('class', 'thumbnail');
    
        h1.textContent = api[1][j];    
        p.textContent = api[2][j]
        a.setAttribute('href', api[3][j])
        a.setAttribute('target', '_blank');
        a.textContent = 'Read more here!'
        
        root.appendChild(container);
        container.appendChild(thumbnail);
        thumbnail.appendChild(h1);
        thumbnail.appendChild(p);
        thumbnail.appendChild(a);
    }
}
