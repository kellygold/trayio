// Process the text file and define variables
// track the current position of the hoover and when it matches a dirth position count+1
// We don't care about how efficent the robot is moving because moving instructions are in the program input
// Let's get started

//** After numerous checks and close debugging, the ouput of the example online looks to be 1 off, I believe the output should be 2*/

const fs = require('fs');
var _ = require('lodash');
//read input file
input = fs.readFileSync("input.txt").toString()

//parse file and define initial conditions
inputArr = input.split('\n');
let hooverPaths = inputArr.pop().split('');
let jsonCoordinates = inputArr.map(line => {
    lineArr = line.split(' ');
    jsonCoords = {X: lineArr[0], Y: lineArr[1]}
    return jsonCoords;
})

//define variables / parse the input data
let dimensions = jsonCoordinates.shift();
let startPosition = jsonCoordinates.shift();
let dirtSpots = jsonCoordinates;
let finalPosition = startPosition;
let dirtCleanedCount = 0;
let cleanedSpots = []

hooverPaths.map(direction => {
    // Make sure we won't hit the edge, otherwise skip to the next move
    if ( (finalPosition.X < dimensions.X) && (finalPosition.Y < dimensions.Y) && (finalPosition.X > 0) && (finalPosition.Y > 0) ){
        //increment the coordinates based on cardinal direction
        if (direction === "N") {
            finalPosition.Y++
        }
        else if (direction === "S") {
            finalPosition.Y--
        }
        else if (direction === "E") {
            finalPosition.X++
        }
        else if (direction === "W") {
            finalPosition.X--
        }
        else {
            console.log("An invalid character was found in the cardinal direction input")
        }
        // check coordinates against known dirt to track cleaning progress
        dirtSpots.map(spotCoords => {
            if (spotCoords.X == finalPosition.X && spotCoords.Y == finalPosition.Y) {
                dirtCleanedCount++
                cleanedSpots.push(spotCoords)
            }
        })
}
})

// Make sure you only count a cleaned spot once.
uniqueSpotsCleaned = _.sortedUniq(cleanedSpots).length

// output the results, clean up the output from the JSON coords
console.log(finalPosition.X + ' ' + finalPosition.Y)
console.log(uniqueSpotsCleaned)