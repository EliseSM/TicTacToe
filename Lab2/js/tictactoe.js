
//Elise Schatzki-McClain
//2/12/2020
//CSC 220
//HW2

cells = document.getElementsByTagName("td") //handler for getting a list of cells

//gets the paragraph that will show a winning message
displayParagraph = document.getElementById("result_text");
displayParagraph.style.fontSize = "36px"; //adjusts font size
displayParagraph.style.textAlign = "center";  //centers the message on the board


//creates an array list of cells
var cells_array = new Array()
for (cell of cells) {
    cells_array.push(cell)   
}

//adds listener events of all the cells on the board
cells_array.forEach((cell) => {
    cell.addEventListener("mouseover", highlightIfEmpty) //calls highlight function if mouse on a cell
    cell.addEventListener("mouseout", dehighlightIfEmpty) //calls dehighlight function once mouse leaves cell
    cell.addEventListener("click", XandO) //calls function to place X/0 once cell is clicked
    
})

//this function removes all the listener events for all the cells on the board
function removelistener() {
    for (cell of cells) {
    cell.removeEventListener("mouseover", highlightIfEmpty)
    cell.removeEventListener("mouseout", dehighlightIfEmpty)
    cell.removeEventListener("click", XandO)
    }

}


//creates arrays of the locations for Xs and Os on the board
var locofOs = new Array()
var locofXs = new Array()

var counter = 0  //counter to see how many plays have been made
//function that places x and o in cell
function XandO() {

    if (this.innerHTML == "") { //check if cell is not already full

    if (counter%2 == 1){ //if the turn number is odd, places x in square
        this.innerHTML = "X"
        counter++ //counts action as a turn
        
        console.log(parseInt(this.id))
        locofXs.push(parseInt(this.id))  //adds id to the X cell array on board
        checkforwin() //checks to see if someone won
        
    } else { //if the turn number is even, places o in square
        this.innerHTML = "O"
        counter++ //counts action as a turn
        
        console.log(parseInt(this.id))
        locofOs.push(parseInt(this.id)) //adds id to the X cell array on board
        checkforwin() //checks to see if someone won
    }
}
}


//this function checks for if their is a win happening or a tie
function checkforwin() {
    
    //this checks to see if there is a win for X
    if (checkforOwin()) {
        console.log("O wins")
        displayParagraph.innerHTML = "O wins" //displays win message
        removelistener()  //removes the listeners on the table cells
        return true
    }

    //this checks to see if there is a win for X
    if (checkforXwin()) {
        console.log("X wins")
        displayParagraph.innerHTML = "X wins" //displays win message
        removelistener()  //removes the listeners on the table cells
        return true

    }

    //this checks to see if there is a tie
    if (checkfortie()) { 
        console.log("tie!")
        displayParagraph.innerHTML = "tie!" //displays tie message
        removelistener() //removes the listeners on the table cells
        return true 
    }
    
    //if no wins or tie function returns false
    return false

}

//this function checks to see if X has won
function checkforXwin() {
   //all the possible solutions
    check = [[11, 12, 13],[21, 22, 23],[31, 32, 33],[11, 21, 31],[12, 22, 32],[13, 23, 33],[11, 22, 33],[31, 22, 13]]

    //if one solution is on the board return true
    if (check.some(checkX)) {
    return true
    }
    //if none of the soltuions are on the board return false
    return false
 
}

//this function compares to see if X is a win for one possible solution
function checkX(check_array) {
    for (element of check_array) { //check if each elemnent of the solution is on the board
        if (!locofXs.includes(element)) {
            return false //if element is not on the board return false
        }
    }
    return true  //if all elements of solution are on the board return true
}

//this function checks to see if O has won
function checkforOwin() {
   //all the possible solutions
    check = [[11, 12, 13],[21, 22, 23],[31, 32, 33],[11, 21, 31],[12, 22, 32],[13, 23, 33],[11, 22, 33],[31, 22, 13]]

    //if one solution is on the board return true
    if (check.some(checkO)) {
    return true
    }
    //if none of the soltuions are on the board return false
    return false
 
}

//this function compares to see if O is a win for one possible solution
function checkO(check_array) {
    for (element of check_array) {  //check if each elemnent of the solution is on the board
        if (!locofOs.includes(element)) {
            return false //if element is not on the board return false
        }
    }
    return true //if all elements of solution are on the board return true
}

//this function checks to see if there is a tie
function checkfortie() {
    xlen = locofXs.length
    olen = locofOs.length
    if (xlen+olen == 9) { //if all the spaces are full, the game is a tie
        return true
    }
    return false //if there are empty spaces, it is not yet a tie
}

//function that fills in an empty cell
function highlightIfEmpty() { 

    if (this.innerHTML == "") {//check if cell is empty
       this.style.backgroundColor = "green" //colors cell green
    }
}
//function that defills in an empty cell
function dehighlightIfEmpty() {

    if (this.innerHTML == "") {//check if cell is empty
       this.style.backgroundColor = "white" //colors cell green
    }
}



