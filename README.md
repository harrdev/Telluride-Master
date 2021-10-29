# Telluride-Master
Compete in ski competitions against the high score.  A timer starts and the player avoids obstacles while seeing how long they can ski for before crashing.  The score of the player will be the time in seconds that they were up before crashing.

# Deployed at harrdev.com and https://harrdev.github.io/Telluride-Master/

## Tech stack
* HTML & HTML Canvas
* CSS
* Javascript

# Wireframe
![Image of Wireframe]
![Screen Shot 2021-10-22 at 11 17 46 AM](https://user-images.githubusercontent.com/86644498/138520229-935ed28a-ddb5-4811-9f6d-dca816ccf992.png)


## MVP Goals  BREAK DOWN INTO MORE DETAIL HERE
### Changed 2 player goal to a high score
    * Core functionality
        1. Animation - All assets loaded in and moving
            * Draw screen with boundries.  Draw scoreboard, timer, player, and trees on screen.  Start trees with random placed below y-axis mark used for drawing the trees.  Player starts in same spot every time.
        2. Collision detection
            * Create conditionals for when player touches a tree or other object, ending the player round and storing the score in the player variable.  Round stops, pauses animation and button appears for next round to click to start.
        3. Logic - Crashes, score tracking, timer
            * Conditional for when player touches trees (above collision detection), use setInterval for timer/score.
        4. Basic sprites
            * Start with blocks, create size in png editor for trees and player.  Figure out pixel size to store as their dimension.
        5. Winner announcement
            * Screen displays message once player round is over announcing the winner and the scores.

## Stretch Goals
    1. Advanced sprites  -- Done
    2. Smoother animation  -- Done
    3. Sound / Music  -- Done
    4. Speed boost "powerups"  -- Changed vision from speed to style points bonus
    5. Abominal Snowman

## Potential Roadblocks
    * Time - 1 week to deliver
    * Logic with randomly appearing obstacles (trees, etc)

# Research These!
    1. When player presses down, game world scrolls up? -- Solved
    2. Randomly placing trees below predetermined y-coords -- Solved
    3. How accurate hit detection will be with odd shaped sprites, maybe cannot be really accurate?  Check into collision detection options  -- Solved
    
