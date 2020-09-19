// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

var fightOrSkip = function() {
  // ask user if they'd like to fight or skip using  function
  var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  // Conditional Recursive Function Call
  if (promptFight === "" || promptFight === null) {
  window.alert("You need to provide a valid answer! Please try again.");
  return fightOrSkip();
  }

  // if user picks "skip" confirm and then stop the loop
  promptFight = promptFight.toLocaleLowerCase();

  if (promptFight === "skip") {
    // confirm user wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

// if yes (true), leave fight
  if (confirmSkip) {
    window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
    // subtract money from playerMoney for skipping, but don't let them go into the negative
    playerInfo.money = Math.max(0, playerInfo.money - 10);

    // return true if user wants to leave
    return true;
    }
  }
}

var fight = function(enemy) {
  while (playerInfo.health > 0 && enemy.health > 0) {
    // ask user if they'd like to fight or skip using fightOrSkip function
    if (fightOrSkip()) {
      // if true, leave fight by breaking loop
      break;
    }
  
    // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died!');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemy.attack variable
    var damage = randomNumber(enemy.attack - 3, enemy.attack);

    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
    }
  }
};

var startGame = function(){
  //reset player stats
  playerInfo.reset();
  for(var i = 0; i < enemyInfo.length; i++){
    if(playerInfo.health > 0){
      window.alert("Welcome to Robot Gladiators! - Round " + (i+1));
      var pickedEnemyObj = enemyInfo[i];
      //randomizes enemy health
      pickedEnemyObj.health = randomNumber(40,60);
      fight(pickedEnemyObj); 

      //if we're not at the last enemy in the array
      if(playerInfo.health > 0 && i < enemyInfo.length - 1){
        var storeConfirm = window.confirm("The fight is over, would you like to visit the shop?");
        if(storeConfirm){
          shop();
        }  
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
  if(playerInfo.health > 0){
    window.alert("Great job, you survived the game!, your endgame score is " + playerInfo.money + ".");
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
  //Ask player what do they wanna do?
  var shopOptionPrompt = window.prompt(
    "Would you like to 1 - REFILL your health, 2 - UPGRADE your attack or 3 - LEAVE the shop?"
  );
  shopOptionPrompt = parseInt(shopOptionPrompt);
  switch (shopOptionPrompt){
    case 1:
      playerInfo.refillHealth();
    break;

    case 2:
      playerInfo.upgradeAttack();
    break;

    case 3:
      window.alert("Leaving the shop");
    break;

    default:
      window.alert("You did not pick a valid option, try again");
      shop();
    break;
  }
};

//function to generate a random numeric value
var randomNumber = function(min, max){
  var value = Math.floor(Math.random() * (max - min + 1) + min);
  return value;
};

//function to set player name
var getPlayerName = function(){
  var name = "";

  //loop starts here
  while(name === "" || name === null){
    name = prompt("What is your robots name?");
  }

  console.log("Your robots name is " + name);
  return name;
};

var playerInfo = {
  name: getPlayerName(),
  health: 50,
  attack: 20,
  money: 10,
  reset: function(){
    this.health = 50;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function(){
    if(this.money >= 7){
      window.alert("Gained 20hp!");
    this.health += 20;
    this.money -= 7;
    }
    else{
      window.alert("You ain't got enough bread son");
    }
  },
  upgradeAttack: function(){
    if(this.money >= 7){
    window.alert("Gained more ATK PWR");
    this.attack += 6;
    this.money -= 7;
    }
    else{
      window.alert("Not enough bread son");
    }
  }
};

var enemyInfo = [
  {
    name: "Robo",
    attack: randomNumber(10,14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10,14)
  },
  {
    name: "Super Robo",
    attack: randomNumber(10,14)
  }
];

// start the game when the page loads
startGame();