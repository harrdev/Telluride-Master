# Telluride-Master
Compete in ski competitions against another player.  A timer starts and the player avoids obstacles while seeing how long they can ski for before crashing.  The score of each player will be the time in seconds that they were up before crashing.

## Tech stack
* HTML & HTML Canvas
* CSS
* Javascript

# Wireframe
![Image of Wireframe]
(https://github.com/harrdev/Telluride-Master/blob/main/files/Screen%20Shot%202021-10-22%20at%2011.17.46%20AM.png)

## MVP Goals  BREAK DOWN INTO MORE DETAIL HERE
    * Core functionality
        1. Animation - All assets loaded in and moving
            * Draw screen with boundries.  Draw scoreboard, timer, player, and trees on screen.  Start trees with random placed below y-axis mark used for drawing the trees.  Player starts in same spot every time.
        2. Collision detection
            * Create conditionals for when player touches a tree or other object, ending the player round and storing the score in the player variable.  Round stops, pauses animation and button appears for next player to click to start.
        3. Logic - Crashes, score tracking, timer
            * Conditional for when player touches trees (above collision detection), use setInterval for timer/score.
        4. Basic sprites
            * Start with blocks, create size in png editor for trees and player.  Figure out pixel size to store as their dimension.
        5. Winner announcement
            * Screen displays message once both player turns are over announcing the winner and the scores.

## Stretch Goals
    1. Advanced sprites
    2. Smoother animation
    3. Sound / Music
    4. Speed boost "powerups"
    5. Abominal Snowman

## Potential Roadblocks
    * Time - 1 week to deliver
    * Logic with randomly appearing obstacles (trees, etc)

# Research These!
    1. When player presses down, game world scrolls up?
    2. Randomly placing trees below predetermined y-coords
    3. How accurate hit detection will be with odd shaped sprites, maybe cannot be really accurate?  Check into collision detection options
    
