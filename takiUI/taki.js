/**
 * Dudi Yecheskel - 200441749
 * Or Mantzur - 204311997
 */

function drawCardOnScreen(playerId, containerId) {
    var playerCards = game.getPlayer(playerId).getCards();
    var playerCardsContainer = document.getElementById(containerId);
    // var cardIndex = 0;
    //clear all children
    while (playerCardsContainer.firstChild) {
        playerCardsContainer.removeChild(playerCardsContainer.firstChild);
    }

    playerCards.forEach(function (card) {
        var cardElement = createCardElement(card, true);
        cardElement.addEventListener("click", function () {
            game.makeMove(card);
            refreshCards();
        });
        playerCardsContainer.appendChild(cardElement);
    });
};

function createCardElement(card, isClickable) {
    var cardElement = document.createElement("div");
    var cardColor = card.getColor() !== null ? card.getColor() : "noColor";
    // cardElement.setAttribute("id", cardIndex.toString());
    cardElement.setAttribute("class", "card " + cardColor + (isClickable? " clickable-card" : ""));
    cardElement.setAttribute("cardValue", card);
    if (card.getValue().length > 1)
        cardElement.className += " textCard";
    cardElement.textContent = card.getValue();
    return cardElement;
}

function refreshCards() {
    drawCardOnScreen(0, 'player-container');
    drawCardOnScreen(1, 'player-container2');
    drawTopCard("topCard");
}

function drawTopCard(parentId) {
    var card = game.viewTopCardOnTable();
    var deckElement = document.getElementById(parentId);
    var cardElement = createCardElement(card, false);
    while (deckElement.firstChild)
        deckElement.removeChild(deckElement.firstChild);
    deckElement.appendChild(cardElement);
}

function clickedDeck() {
    game.takeCardsFromDeck();
    refreshCards();
}
