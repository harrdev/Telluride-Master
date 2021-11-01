# Telluride-Master
Compete in ski competitions against the high score.  A timer starts and the player avoids obstacles while seeing how long they can ski for before crashing.  The score of the player will be the time in seconds that they were up before crashing.

# Deployed at https://harrdev.github.io/Telluride-Master/

## Tech stack
* HTML & HTML Canvas
* CSS
* Javascript

# Wireframe
![Screen Shot 2021-10-22 at 11 17 46 AM](https://user-images.githubusercontent.com/86644498/138520229-935ed28a-ddb5-4811-9f6d-dca816ccf992.png)


## MVP Goals
### Changed 2 player goal to a high score
    * Core functionality
        1. Animation - All assets loaded in and moving
            * Draw screen with boundries.  Draw scoreboard, timer, player, and trees on screen.  Start trees with random placed below y-axis mark used for drawing the trees.  Player starts in same spot every time.
        2. Collision detection
            * Create conditionals for when player touches a tree or other object, ending the player round and storing the score in the player variable.  Round stops, pauses animation and button appears for next round to click to start.
        3. Logic - Crashes, score tracking, timer
            * Conditional for when player touches trees (above collision detection), use setInterval or gameFrame variable for timer/score.
        4. Basic sprites
            * Start with blocks, create size in png editor for trees and player.  Figure out pixel size to store as their dimension.
        5. Winner announcement
            * Screen displays message once player round is over announcing the winner and the scores.

## Stretch Goals
    1. Advanced sprites 
    2. Smoother animation 
    3. Sound / Music 
    4. Speed boost "powerups"  -- Changed vision from speed to style points bonus
    5. Abominal Snowman

## Additional stretch goals completed
    1. Added levels, increasing speed at certain point intervals
    2. Added ski lifts that are suspended in the air, no collision on these, and move faster than the game world to be more immersive/realistic


    
