// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   if(typeof word !== 'string') {
      return 0;
   }
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   scrabbleInput = input.question("Let's play some scrabble! Enter a word:");
  
};

let newPointStructure = transform(oldPointStructure);

function simpleScorer(word) {
   if(typeof word !== 'string') {
      return 0;
   }
let simpleScorer = 0;
for (let i = 0; i < word.length; i++) {
  simpleScorer += 1;
}
return simpleScorer;
}


function vowelBonusScorer(word) {
   
 if(typeof word !== 'string') {
      return 0;
 }

   let vowelBonusScorer = 0;
  let vowels = ['A', 'E', 'I', 'O', 'U'];
  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i].toUpperCase())) {
      vowelBonusScorer += 3;
    } else {
      vowelBonusScorer += 1;
    }
    
  }
  
  return vowelBonusScorer;
  
}

function scrabbleScorer(word) {
   let scrabbleScorer = 0;
   let newPointStructure = transform(oldPointStructure);
   word = word.toLowerCase();
   for (let i = 0; i < word.length; i++) {
      scrabbleScorer += newPointStructure[word[i]];
   }
   return scrabbleScorer;
}

const scoringAlgorithms = [ 
  {
    name: "Simple Score",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer
  },
  {
    name: "Bonus Vowels",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScorer
  },
  {
    name: "Scrabble",
    description: "The traditional scoring algorithm.",
    scorerFunction: scrabbleScorer
  }];

function scorerPrompt(){
  let userInput= input.question("Which scoring algorithm would you like to use? Enter 0 for Simple Score, 1 for Bonus Vowels, or 2 for Scrabble:");
  console.log(`Algorithm Name: ${scoringAlgorithms[userInput].name}`);
  console.log(`Description: ${scoringAlgorithms[userInput].description}`);
   console.log(`Score for '${scrabbleInput}': ${scoringAlgorithms[userInput].scorerFunction(scrabbleInput)}`);
   if (userInput === "0") {
   simpleScorer();
   }
   else if (userInput === "1") {
   vowelBonusScorer();
   }
   else if (userInput === "2") {
   oldScrabbleScorer();
   }
   else {
     console.log("Invalid input. Please try again.");
   }

}


function transform(oldPointStructure) {
   let newPointStructure = {};
   for (let key in oldPointStructure) {
      for (let i = 0; i < oldPointStructure[key].length; i++) {
         newPointStructure[oldPointStructure[key][i].toLowerCase()] = Number(key);
      }
   }
   return newPointStructure;
};

function runProgram() {
   initialPrompt();
   scorerPrompt();
   vowelBonusScorer();
   simpleScorer();
   transform();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
