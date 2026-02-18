'use strict';

document.addEventListener('DOMContentLoaded', async () => {
    if (location.search === '') {
        await getPage('prime');
    }

    let search = new URLSearchParams(location.search);
    if (search.has('book') && !search.has('part')) {
        await getPage('book', {book: search.get('book')});
    }

    if (search.has('book') && search.has('part')) {
        await getPage('part', {book: search.get('book'), part: search.get('part')});
    }
});

window.addEventListener('popstate', async event => {
    await getPage(event.state.type, event.state.params);
});


async function getPage(type, params=null) {
    let main = document.querySelector('main');

    let search = null;
    let html = '';
    switch (type) {
        // PRIME
        case 'prime':
            let books = (await getContent()).map(item => `<a href="/?book=${item.url}">${item.name}</a>`);
            html = `
<h1>Книги</h1>
<nav class="books">
    ${books}
</nav>
`;

        history.pushState({type: 'prime', params}, '', '/');
        document.body.id = 'prime';
        break;

        // BOOK
        case 'book':
            console.log(params);
            let book = await getBook(params.book);
            let parts = book.parts.map(item => `<a href="/?book=${book.url}&part=${item.url}">${item.name}</a>`).join('');
            html = `
<h1>${book.name}</h1>
<nav class="parts">
    ${parts}
</nav>
`;

        history.pushState({type: 'book', params}, '', `/?book=${book.url}`);
        document.body.id = 'book';
        break;

        // PART
        case 'part':
            let part = await getPart(params.book, params.part);

            let ps = part.text.map(item => {
                if (item.key === 'h2') return `<h2>${item.value}</h2>`;
                if (item.key === 'p') return `<p>${item.value}</p>`;
                if (item.key === 'img') return `<img src="${item.value}">`;
            }).join('');
            html = `
<h1>${part.name}</h1>
${ps}
`;

        history.pushState({type: 'part', params}, '', `/?book=${params.book}&part=${params.part}`);
        document.body.id = 'part';
        break;
    }

    main.innerHTML = html;
    setEvents();
}

function setEvents() {
    if (document.body.id === 'prime') {
        document.querySelectorAll('.books > a').forEach(book => book.addEventListener('click', async event => {event.preventDefault(); getPage('book', {book: new URLSearchParams(new URL(event.target.href).search).get('book')})}));
    }

    if (document.body.id === 'book') {
        document.querySelectorAll('.parts > a').forEach(book => book.addEventListener('click', async event => {event.preventDefault(); getPage('part', {book: new URLSearchParams(new URL(event.target.href).search).get('book'), part: new URLSearchParams(new URL(event.target.href).search).get('part')})}));
    }

    if (document.body.id === 'part') {
        // document.querySelectorAll('.books > a').forEach(book => book.addEventListener('click', async event => getPage('part', event)));
    }
}

async function getContent() {
    let request = await fetch('/public/data/content.json');
    let json = await request.json();

    return json;
}

async function getBook(book) {
    let request = await fetch(`/public/data/books/${book}/content.json`);
    let json = await request.json();

    return json;
}

async function getPart(book, part) {
    let request = await fetch(`/public/data/books/${book}/parts/${part}.json`);
    let json = await request.json();

    return json;
}