function Game(numberOfTiles) {
    this.oScoreDom = document.getElementById('scoreDiv');
    
    this.score = 0;
    this.numberOfTiles = numberOfTiles;
    this.tileData = [];
    for (var i = 0; i < numberOfTiles; i++) {
        this.tileData.push({
            tileValue: i + 1
        });
    }

    this.currentHighlightedTile = 0;
}

Game.prototype.updateScore = function (val) {
    if(this.currentHighlightedTile === val){
        this.score ++;
    }else{
        this.score --;
    }

    this.oScoreDom.innerHTML = 'Score: ' + this.score;
}



Game.prototype.highlightNewTile = function () {
    
    var tiles = document.querySelectorAll('[tilevalue]');
    
    // reset the previously selected gtile
    var currentSelectedTile = Array.from(tiles).filter(function (tile) {
        return parseInt(tile.getAttribute('tilevalue')) === this.currentHighlightedTile;
    }.bind(this))[0];

    if(currentSelectedTile){
        currentSelectedTile.className = 'cell';
    }
    


    // Generate a random tile number
    var tileNumber = getRandomInt(1, this.numberOfTiles);
    
    // Update the Game object
    this.currentHighlightedTile = tileNumber;

    // highlight the tile
    selectedTile = Array.from(tiles).filter(function (tile) {
        return parseInt(tile.getAttribute('tilevalue')) === tileNumber;
    })[0];
    selectedTile.className += ' highlightedTile';
}





function window_onLoad() {
    var mainDiv = document.getElementById('gameDiv');
    
    // Attach the click event listener
    mainDiv.addEventListener('click', cellClicked);
    
    game = new Game(9);

    var dummyDiv = document.createElement('div');

    for (var i = 0; i < game.tileData.length; i++) {

        // Create the cell div
        var cellDiv = document.createElement('div');
        var innerSpan = document.createElement('span');
        innerSpan.innerHTML = game.tileData[i].tileValue;
        innerSpan.className = 'number';
        cellDiv.appendChild(innerSpan);
        cellDiv.className = 'cell';

        

        var dataAttribute = document.createAttribute('tileValue');
        dataAttribute.value = game.tileData[i].tileValue;
        cellDiv.setAttributeNode(dataAttribute);

        // add the element to dummy div
        dummyDiv.appendChild(cellDiv);
    }

    // Now copy the divs from the dummyDiv to mainDiv
    mainDiv.innerHTML = dummyDiv.innerHTML;

    game.highlightNewTile();

    

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cellClicked(event) {
    var tileValue = event.target.getAttribute('tilevalue');
    if(!tileValue){
        tileValue = event.target.parentElement.getAttribute('tilevalue');
    }
    game.updateScore(parseInt(tileValue, 10));

    game.highlightNewTile();

}
