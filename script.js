/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/

/*eslint-env browser*/

/*eslint 'no-console': 0*/


//ik maak hier eerst alle variabele aan en geef ze een standaardwaarde.

var money = 1000;
var betAmount = 0;
var dealerScore = 0;
var playerScore = 0;
var blackjack = 21;
var randomNumber = 0;
var randomCard = "";
var round = 0;
var roundDealer = 0;
var i = 0;


// hier maak ik het deck aan, de values van de kaarten staan op dezelfde volgorde om het makkelijk te maken om aan elkaar te koppelen.
var deck = ["2_of_clubs", "2_of_diamonds", "2_of_hearts", "2_of_spades", "3_of_clubs", "3_of_diamonds", "3_of_hearts", "3_of_spades", "4_of_clubs", "4_of_diamonds",
    "4_of_hearts", "4_of_spades", "5_of_clubs", "5_of_diamonds", "5_of_hearts", "5_of_spades", "6_of_clubs", "6_of_diamonds", "6_of_hearts", "6_of_spades", "7_of_clubs",
    "7_of_diamonds", "7_of_hearts", "7_of_spades", "8_of_clubs", "8_of_diamonds", "8_of_hearts", "8_of_spades", "9_of_clubs", "9_of_diamonds", "9_of_hearts", "9_of_spades",
    "10_of_clubs", "10_of_diamonds", "10_of_hearts", "10_of_spades", "jack_of_clubs", "jack_of_diamonds", "jack_of_hearts", "jack_of_spades", "queen_of_clubs", "queen_of_diamonds",
    "queen_of_hearts", "queen_of_spades", "king_of_clubs", "king_of_diamonds", "king_of_hearts", "king_of_spades", "ace_of_clubs", "ace_of_diamonds", "ace_of_hearts", "ace_of_spades"];


var values = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11];




// FUNCTIONS //
//In de functie reset() reset ik het hele spel, de kaarten worden weer het achterkant plaatje, alle scores gaan weer naar 0 en de popup word naar display = none gezet. Deze functie runt zodra je de site opent zodat 

function reset() {
    dealerScore = 0;
    document.getElementsByClassName("dealerScore")[0].innerHTML = dealerScore;
    playerScore = 0;
    document.getElementsByClassName("playerScore")[0].innerHTML = playerScore;
    round = 0;
    roundDealer = 0;
    betAmount = 0;
    
    document.getElementsByClassName("cardsDealer")[0].innerHTML = "";
    document.getElementsByClassName("cardsPlayer")[0].innerHTML = "";

    document.getElementsByClassName("popupVerloren")[0].style.display = 'none';
    document.getElementsByClassName("popupBlackjack")[0].style.display = 'none';
    document.getElementsByClassName("popupGelijkspel")[0].style.display = 'none';
    document.getElementsByClassName("popupGewonnen")[0].style.display = 'none';

    //hier zet ik alle kaarten terug naar de achterkant kaart.
    let back = "img/back.png";

    //Hier maak ik met een for loop de kaarten aan die aan het begin op het veld liggen door eerst de img tags aan te maken, dan een class te geven, een src te geven en daarna toe te dienen aan de div cardsDealer of cardsPlayer.
    for (i = 1; i < 3; i++){
        window["DC"+i] = document.createElement("img");
        window["DC"+i].className = "DC"+i;
        window["DC"+i].src = back;
        document.getElementsByClassName("cardsDealer")[0].appendChild(window["DC"+i]);
        window["PC"+i] = document.createElement("img");
        window["PC"+i].className = "PC"+i;
        window["PC"+i].src = back;
        document.getElementsByClassName("cardsPlayer")[0].appendChild(window["PC"+i]);
    }
}

//hier maak ik de functie van de playButton aan, hij runt eerst de reset functie, pakt de value van je inzet, verandert de hoeveelheid geld dat je hebt, zowel backend als frontend. Vervolgens pakt hij voor de eerst dealercard en de twee playercards een random card en kijkt die of de spelerscore blackjack is.
function start() {
    changeBetAmount();
    if (money >= betAmount) {
        reset();
        changeBetAmount();
        money -= betAmount;
        document.getElementsByClassName("money")[0].innerHTML = "Money: €" + money;

        document.getElementsByClassName("DC1")[0].src = "img/" + pickRandomCard(1) + ".png";
        document.getElementsByClassName("PC1")[0].src = "img/" + pickRandomCard(2) + ".png";
        document.getElementsByClassName("PC2")[0].src = "img/" + pickRandomCard(2) + ".png";

        if (playerScore === blackjack) {
            console.log("BLACKJACK!");
            document.getElementsByClassName("popupBlackjack")[0].style.display = 'block';

            money += (betAmount * 2.5);
            document.getElementsByClassName("money")[0].innerHTML = "Money: €" + money;
            document.getElementsByClassName("warning")[0].style.display = 'none';
        }
    } else {
        document.getElementsByClassName("warning")[0].innerHTML = "Niet genoeg geld";
        document.getElementsByClassName("warning")[0].style.display = 'block';
    }

}

//hier word de functie voor de hitButton aangemaakt, hij maakt onder de div "cardsPlayer" een class aan met een extra random kaart. Vervolgens kijkt hij of de playerscore hoger is dan 21 of dat de score blackjack is.
function hit() {
    if (betAmount !== 0) {
        document.getElementsByClassName("warning")[0].style.display = 'none';
        let PC = document.createElement("img");
        PC.className = "PC";
        PC.src = "img/" + pickRandomCard(2) + ".png";
        document.getElementsByClassName("cardsPlayer")[0].appendChild(PC);

        if (playerScore > 21) {
            console.log("BUST!");
            document.getElementsByClassName("popupVerloren")[0].style.display = "block";
        }

        if (playerScore === blackjack) {
            console.log("BLACKJACK!");
            document.getElementsByClassName("popupBlackjack")[0].style.display = "block";
            money += (betAmount * 2.5);
            document.getElementsByClassName("money")[0].innerHTML = "Money: €" + money;
        }
    } else {
        document.getElementsByClassName("warning")[0].innerHTML = "Voer eerst een inzet in en druk op play.";
        document.getElementsByClassName("warning")[0].style.display = 'block';
    }
}


//Hier wordt de functie van de standButton aangemaakt, dit bestaat vooral uit de condities van de dealer. Hier is de ronde ook belangrijk want dan kan hij zien of er een nieuwe kaart moet worden aangemaakt.
function stand() {
    if (betAmount !== 0) {
        document.getElementsByClassName("warning")[0].style.display = 'none';
        if (roundDealer === 0) {
            document.getElementsByClassName("DC2")[0].src = "img/" + pickRandomCard(1) + ".png";
            roundDealer += 1;
        }

        if (dealerScore < 17 && roundDealer === 1) {
            let DC = document.createElement("img");
            DC.className = "DC3";
            DC.src = "img/" + pickRandomCard(1) + ".png";
            document.getElementsByClassName("cardsDealer")[0].appendChild(DC);
            roundDealer += 1;
        }

        if (dealerScore < 17 && roundDealer === 2) {
            let DC = document.createElement("img");
            DC.className = "DC4";
            DC.src = "img/" + pickRandomCard(1) + ".png";
            document.getElementsByClassName("cardsDealer")[0].appendChild(DC);
        }

        if (dealerScore > 16 && dealerScore < playerScore) {
            let DC = document.createElement("img");
            DC.className = "DC5";
            DC.src = "img/" + pickRandomCard(1) + ".png";
            document.getElementsByClassName("cardsDealer")[0].appendChild(DC);
        }


        if (dealerScore > blackjack) {
            console.log("Speler gewonnen");
            document.getElementsByClassName("popupGewonnen")[0].style.display = "block";
            money += (betAmount * 2);
            document.getElementsByClassName("money")[0].innerHTML = "Money: €" + money;

        } else if (dealerScore === playerScore) {
            console.log("Gelijkspel");
            document.getElementsByClassName("popupGelijkspel")[0].style.display = "block";
            money += betAmount*1;
            document.getElementsByClassName("money")[0].innerHTML = "Money: €" + money;

        } else if (dealerScore > playerScore) {
            console.log("Dealer gewonnen");
            document.getElementsByClassName("popupVerloren")[0].style.display = "block";
        }
    } else {
        document.getElementsByClassName("warning")[0].innerHTML = "Voer eerst een inzet in en druk op play.";
        document.getElementsByClassName("warning")[0].style.display = 'block';
    }
}

//hier word elke keer de random card gepakt, door hier een parameter te gebruiken kan hij onderscheid maken tussen de speler- en dealerscore, dus zodra de parameter "1" word meegegeven telt hij hem op bij de dealerScore en bij "2" bij playerScore. Verder kijkt hij of de kaart het woord "ace" bevat want zodra de speler of dealer al 10 punten heeft telt een aas als 1. Door de values op dezelfde plek als de bijbehorende kaart in de array te zetten is het makkelijk om achter de values van de kaarten te komen.
function pickRandomCard(card) {
    randomNumber = Math.floor(Math.random() * deck.length);
    randomCard = deck[randomNumber];
    console.log(randomNumber + " | " + randomCard);


    if (card === 1) {
        if(randomCard.includes("ace") && dealerScore > 10){
            dealerScore += 1;
        } else {
            dealerScore += values[randomNumber];
        }
        document.getElementsByClassName("dealerScore")[0].innerHTML = dealerScore;

    } else if (card === 2) {
        if(randomCard.includes("ace") && playerScore > 10){
            playerScore += 1;
        } else {
            playerScore += values[randomNumber];
        }
        document.getElementsByClassName("playerScore")[0].innerHTML = playerScore;
    }

    return randomCard;
}

//Hier pakt die de inzet uit de input balk.
function changeBetAmount() {
    betAmount = document.getElementById("betAmountInput").value;
}

//hier worden de eventlisteners aangemaakt voor de drie buttons
var hitButton = document.getElementsByClassName("hitButton")[0];
var standButton = document.getElementsByClassName("standButton")[0];
var playButton = document.getElementsByClassName("playButton")[0];
hitButton.addEventListener("click", hit, false);
standButton.addEventListener("click", stand, false);
playButton.addEventListener("click", start, false);

//met deze eventlisteners zorg ik ervoor dat je met enter, spatie en backspace het spel kan besturen, eerst laat ik hem kijken of er een key ingedrukt word, als dat zo is kijkt die of het de enter, spatie of backspace is. Als dit zo is zorgt die ervoor dat de default niet gebeurd en voert die vervolgens de bijbehorende functie uit.
window.addEventListener('keydown', function(e){
    if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){
        e.preventDefault();
        start();
        return false;}},true);

window.addEventListener('keydown', function(e){
    if(e.keyIdentifier=='U+0020'||e.keyIdentifier=='Space'||e.keyCode==32){
        e.preventDefault();
        hit();
        return false;}},true);

window.addEventListener('keydown', function(e){
    if(e.keyIdentifier=='left'||e.keyCode==37){
        e.preventDefault();
        stand();
        return false;}},true);



reset();
