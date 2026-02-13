const cards = document.querySelectorAll(".card"),
movesSpan = document.querySelector("#moves-count"),
refreshBtn = document.querySelector("#refresh-btn");

let flips = 0;
let moves = 0;
let matchedPairs = 0;
let disableDeck = false;
let cardOne, cardTwo;

// Данные о композиторах
const composers = [
    { 
        person: 'bach', 
        name: 'Иоганн Себастьян Бах',
        years: '1685 — 1750',
        desc: 'немецкий композитор и органист',
        photo: 'img-1.png'
    },
    { 
        person: 'tchaikovsky', 
        name: 'Пётр Ильич Чайковский',
        years: '1840 — 1893',
        desc: 'русский композитор, педагог, дирижёр',
        photo: 'img-2.png'
    },
    { 
        person: 'debussy', 
        name: 'Клод Дебюсси',
        years: '1862 — 1918',
        desc: 'французский композитор',
        photo: 'img-3.png'
    },
    { 
        person: 'liszt', 
        name: 'Ференц Лист',
        years: '1811 — 1886',
        desc: 'венгро-немецкий композитор, пианист-виртуоз',
        photo: 'img-4.png'
    },
    { 
        person: 'scriabin', 
        name: 'Александр Николаевич Скрябин',
        years: '1872 — 1915',
        desc: 'русский композитор и пианист',
        photo: 'img-5.png'
    },
    { 
        person: 'rimsky', 
        name: 'Николай Андреевич Римский-Корсаков',
        years: '1844 — 1908',
        desc: 'русский композитор, педагог, дирижёр',
        photo: 'img-6.png'
    }
];

function flipCard({target}) {
    const card = target.closest('.card');
    
    if(!card || card === cardOne || disableDeck || card.classList.contains('flip')) {
        return;
    }
    
    flips++;
    card.classList.add("flip");
    
    if(!cardOne) {
        cardOne = card;
        return;
    }
    
    cardTwo = card;
    disableDeck = true;
    
    moves++;
    movesSpan.innerText = moves;
    
    matchCards(cardOne, cardTwo);
}

function matchCards(card1, card2) {
    const person1 = card1.dataset.person;
    const person2 = card2.dataset.person;
    
    if(person1 === person2) {
        matchedPairs++;
        
        cardOne = cardTwo = "";
        disableDeck = false;
        
        if(matchedPairs === 6) {
            setTimeout(() => {
                alert(`Поздравляем! Игра завершена!\nКоличество шагов: ${moves}`);
            }, 300);
        }
        
        return;
    }

    setTimeout(() => {
        card1.classList.add("shake");
        card2.classList.add("shake");
    }, 400);

    setTimeout(() => {
        card1.classList.remove("shake", "flip");
        card2.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    flips = 0;
    moves = 0;
    matchedPairs = 0;
    cardOne = cardTwo = "";
    movesSpan.innerText = moves;
    disableDeck = false;

    // Создаем колоду: для каждого композитора фото + текстовая карточка
    let deck = [];
    composers.forEach(composer => {
        // Карточка с фото
        deck.push({
            person: composer.person,
            type: 'photo',
            photo: composer.photo,
            name: composer.name,
            years: composer.years,
            desc: composer.desc
        });
        // Карточка с текстом
        deck.push({
            person: composer.person,
            type: 'name',
            name: composer.name,
            years: composer.years,
            desc: composer.desc
        });
    });
    
    // Перемешиваем
    deck.sort(() => Math.random() > 0.5 ? 1 : -1);

    // Обновляем карточки
    cards.forEach((card, index) => {
        const cardData = deck[index];
        
        card.classList.remove("flip", "shake");
        card.dataset.person = cardData.person;
        card.dataset.type = cardData.type;
        
        const backView = card.querySelector('.back-view');
        
        if (cardData.type === 'photo') {
            backView.innerHTML = `<img src="images/${cardData.photo}" alt="${cardData.name}">`;
            backView.classList.remove('name-card');
        } else {
            backView.innerHTML = `
                <p class="composer-name">${cardData.name}</p>
                <p class="composer-years">${cardData.years}</p>
                <p class="composer-desc">${cardData.desc}</p>
            `;
            backView.classList.add('name-card');
        }
    });
}

shuffleCard();

refreshBtn.addEventListener("click", shuffleCard);

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});