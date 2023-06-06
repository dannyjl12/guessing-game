const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const randomInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const checkGuess = number => {
    if (number > secretNumber) {
        console.log("Too high.");
        return false;
    } else if (number < secretNumber) {
        console.log("Too low.");
        return false;
    } else {
        console.log("Correct!");
        return true;
    }
}

const askGuess = () => {
    if (numAttempts === 0) {
        console.log("You Lose! The correct answer was: " + secretNumber + "!");
        rl.close();
    } else {
        console.log(numAttempts + " guesses remaining!")
        rl.question("Enter a guess: ", answer => {
            if (checkGuess(Number(answer)) === true) {
                rl.close();
            } else {
                numAttempts--;
                askGuess();
            }
        });
    }
}

const askLimit = () => {
    rl.question("How many guesses do you want? ", answer => {
        numAttempts = answer;
        askRange();
    });
}

const askRange = () => {
    rl.question("Enter a max number: ", handleMaxNumber);
}

const handleMaxNumber = (maxAnswer) => {
    rl.question("Enter a min number: ", minAnswer => {
        console.log("I'm thinking of a number between " + minAnswer + " and " + maxAnswer + "...");
        secretNumber = randomInRange(minAnswer, maxAnswer);
        askGuess();
    });
}

askLimit();
