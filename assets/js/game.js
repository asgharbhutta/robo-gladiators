// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 50;
var playerAttack = 20;
var playerMoney = 10;

var enemyNames = ["Robo","Android","Super Robo"];
var enemyHealth = 30;
var enemyAttack = 15;

var fight = function(enemyName) {
  while (playerHealth > 0 && enemyHealth > 0) {
    // ask user if they'd liked to fight or run
    var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if user picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm user wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerMoney for skipping
        playerMoney = playerMoney - 10;
        console.log("playerMoney", playerMoney)
        break;
      }
    }

    // remove enemy's health by subtracting the amount set in the playerAttack variable
    enemyHealth = enemyHealth - playerAttack;
    console.log(
      playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + ' has died!');

      // award player money for winning
      playerMoney = playerMoney + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemyAttack variable
    playerHealth = playerHealth - enemyAttack;
    console.log(
      enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
    );

    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerName + ' still has ' + playerHealth + ' health left.');
    }
  }
};

var startGame = function(){
  //reset player stats
  playerHealth = 50;
  playerAttack = 20;
  playerMoney = 10;
  for(var i = 0; i < enemyNames.length; i++){
    if(playerHealth > 0){
      window.alert("Welcome to Robot Gladiators! - Round " + (i+1));
      var pickedEnemyName = enemyNames[i];
      enemyHealth = 30;
      fight(pickedEnemyName);

      //if we're not at the last enemy in the array
      if(playerHealth > 0 && i < enemyNames.length - 1){
        shop();
      }
    }else{
      window.alert("You have lost your robot in battle! GAME OVER!")
      break;
    }
    
  }
  //play again
  //startGame();
  endGame();
};

//function to end the entire game
var endGame = function(){
  //if player is still alive, player wins!
  if(playerHealth > 0){
    window.alert("Great job, you survived the game!, your endgame score is " + playerMoney + ".");
  }
  else {
    window.alert("You lost your robot in battle.");
  }

  //ask player if they want to play again
  var playAgain = window.confirm("Do you want to play again?");
  if(playAgain){
    //restart the game
    startGame();
  }
  else {
    window.alert("Thanks for playing Robot Gladiators! - Later gator!");
  }
};

var shop = function(){
  console.log("Entered the shop");
};

// start the game when the page loads
startGame();