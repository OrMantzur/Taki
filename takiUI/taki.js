/**
 * Dudi Yecheskel - 200441749
 * Or Mantzur - 204311997
 */

var game = Game(GameType.BASIC, 2, "Taki Man", "ex1");

function initGame() {
    console.log("Running tests:");
    var player1 = Player("p1", false);
    var player2 = Player("p2", true);
    game.addPlayerToGame(player1);
    game.addPlayerToGame(player2);
    console.log("Top card is: ");
    game.viewTopCardOnTable().printCardToConsole();
    document.addEventListener("DOMContentLoaded", function () {
        refreshCards();
        overlayToggle();
    });
}

function drawPlayerCardsOnScreen(playerId, containerId) {
    var playerCards = game.getPlayer(playerId).getCards();
    var playerCardsContainer = document.getElementById(containerId);

    // if there is a card in the players hand that is not on the screen then add it
    playerCards.forEach(function (card) {
        if (document.getElementById(card.getId()) === null) {
            var cardElement = createCardElement(card, true);
            cardElement.addEventListener("click", function () {
                // if a card is clicked and a successful move is made, remove the card from the deck
                if (card.getValue() === SpecialCard.CHANGE_COLOR) {
                    document.getElementById("colorPicker").style.display = "flex";
                    document.getElementById("colorPicker").addEventListener("click", function (event) {
                        alert("click");
                        console.log(event.target)
                        // makeMove(playerCardsContainer, card);
                    })
                }
                else {
                    if (game.makeMove(card)) {
                        playerCardsContainer.removeChild(cardElement);
                        drawTopCardOnTable()
                    }
                }
            });
            playerCardsContainer.appendChild(cardElement);
        }
    });
}

function createCardElement(card, isClickable) {
    var cardElement = document.createElement("div");
    var cardColor = card.getColor() !== null ? card.getColor() : "noColor";
    cardElement.setAttribute("class", "card " + cardColor + (isClickable ? " clickable-card" : ""));
    cardElement.setAttribute("cardValue", card);
    cardElement.setAttribute("id", "" + card.getId());
    if (card.getValue().length > 1)
        cardElement.className += " textCard";
    cardElement.textContent = card.getValue();
    return cardElement;
}

function drawTopCardOnTable() {
    var card = game.viewTopCardOnTable();
    var deckElement = document.getElementById('topCard');
    var cardElement = createCardElement(card, false);
    while (deckElement.firstChild)
        deckElement.removeChild(deckElement.firstChild);
    deckElement.appendChild(cardElement);
}

function clickedDeck() {
    game.takeCardsFromDeck();
    refreshCards();
}

function refreshCards() {
    drawPlayerCardsOnScreen(0, 'player-container');
    drawPlayerCardsOnScreen(1, 'player-container2');
    drawTopCardOnTable("topCard");
}

function overlayToggle() {
    var currentPlayer = null;
    setInterval(function () {
        //if the active player hasn't changed don't do anything
        if (currentPlayer !== game.getActivePlayer()) {
            currentPlayer = game.getActivePlayer();
            var screenOverlay = document.getElementById("player-overlay")
            var deck = document.getElementById("deck");
            if (game.getActivePlayer().getName() === 'p2') {
                screenOverlay.style.display = "block";
                deck.classList.add("disabled-button");
            } else {
                screenOverlay.style.display = "none";
                deck.classList.remove("disabled-button");
            }
            drawTopCardOnTable("topCard");
            refreshCards();
        }
    }, 100)
}

function colorPickerClickedCard(color) {
    document.getElementById("colorPicker").style.display = "none";
}

initGame();