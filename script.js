let counter = 1;
async function fetchData() {
    
    var url = 'https://newsapi.org/v2/top-headlines?' +
        'country=in&' + 'apiKey=e8ab88609a474155a92cd0fc711d5472';
    let data = await fetch(url);   
    news = await data.json();
    news = news.articles;
    console.log(news);
    displayNews();
    checkValidity();

}

function displayNews() {
    document.querySelector(".container").innerHTML = "";
    for (let i = (counter-1)*6; i < counter*6; i++){
        const author = news[i].author;
        const title = news[i].title;
        const publishedAt = news[i].publishedAt.slice(0, 10);
        const image_url = news[i].urlToImage;

        const mainDiv = document.querySelector(".container");

        let individualCard = document.createElement("div");
        individualCard.classList.add('m-5','article','max-w-sm', 'rounded-lg', 'overflow-hidden', 'shadow-lg', 'relative');

        mainDiv.appendChild(individualCard);
        individualCard.setAttribute("id", `news${i}`);
        

        let image = document.createElement('img');
        image.classList.add('w-full', 'rounded-lg', 'h-52');
        image.setAttribute('src', `${image_url === null ? './no-image-found.png' : image_url}`);


        let authorDiv = document.createElement("div")
        authorDiv.classList.add('author','font-bold', 'text-xl', 'mb-2');

        let titleDiv = document.createElement("div")
        titleDiv.classList.add("title","text-gray-800", "text-base");
        
        let dateDiv = document.createElement("div");
        dateDiv.classList.add("publishedAt",'text-gray-400', 'text-base');

        let secondDiv = document.createElement('div');
        secondDiv.classList.add('px-6', 'py-4', 'flex', 'flex-col', 'justify-evenly');
        
        const newsDiv = document.querySelector(`#news${i}`);
        secondDiv.appendChild(dateDiv);
        secondDiv.appendChild(titleDiv);
        secondDiv.appendChild(authorDiv);
        authorDiv.style.padding = '5%';
        newsDiv.appendChild(image);
        newsDiv.appendChild(secondDiv);

        
        if (author != null) {
            newsDiv.querySelector(`.author`).innerHTML = `${author}`;
        } else {
            newsDiv.querySelector(`.author`).innerHTML = `unknown`;
        }

        newsDiv.querySelector(`.title`).innerHTML = `${title}`;
        newsDiv.querySelector(`.publishedAt`).innerHTML = `${publishedAt}`;

    }

}

let news = [];

fetchData();

function nextNews() {
    counter++;
    console.log(counter);
    checkValidity();
}

function previousNews() {
    counter--;
    console.log(counter);
    checkValidity();
}


function checkValidity() {
    if (counter === 1) {
        document.querySelector("#previousButton").setAttribute('disabled', "true");
    }
    else if (counter === 4) {
        document.querySelector("#nextButton").setAttribute('disabled', "true");
    }
    else {
        document.querySelector("#previousButton").removeAttribute('disabled');
        document.querySelector("#nextButton").removeAttribute('disabled');
    }
    displayNews();
}