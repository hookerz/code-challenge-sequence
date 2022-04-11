# Description

- Event listeners are initialized in app.js, Used to pass the scroll position and set the animation container dimensions used in the animation class
- Animation class handles turning the sequence of images into an animation
- Uses [anime.js](https://animejs.com/documentation/) to handle keyframe sequencing and updating the DOM accordingly through a callback function
- Star is actually a unicode character, couldn't find asset

# Bugs/Improvements

- Edge case: On page refresh, if the user is scrolled past the bottom of the 400vh animation container, bottom gets set to a negative value. TODO: Get reference to bottom of animation container relative to the top of the page, taking into account scroll position
- Should throttle setAnimationContainerDimensions() since it's being called onResize

Fixes # (issue)

## Type of change

Please delete options that are not relevant.

- [x] New feature (non-breaking change which adds functionality)

# How Has This Been Tested?

Please test in all major browsers.

- [x] Chrome Latest
- [x] Edge Latest
- [x] Firefox Latest
- [ ] Safari Latest
- [ ] Mobile Safari
- [x] Mobile Chrome

# Checklist:

- [x] My code follows the style guidelines of this project
- [x] I have performed a self-review of my own code
- [x] I have commented my code, particularly in hard-to-understand areas
- [x] I have made corresponding changes to the documentation
- [x] My changes generate no new warnings

# Challenge Checklist

- [x] The animation plays through frames 1 to 100
- [x] The page layout matches the design at 1440px, 768px, and 375px
- [x] Clicking the button takes the user to the cards section
- [x] Extra Credit: The hero section remains pinned for 4 full scrolls
- [x] Extra Credit: The animation is synced to the scroll position
