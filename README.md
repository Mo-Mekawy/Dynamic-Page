# Page Documentation

## HTML

The HTML file named "index.html" contains the following elements:

`header`
contains the website's logo and navigation menu.

`aside`
contains the settings tab.

`main`
contains the landing section and the about section.

`landing section`
contains a background image, a paragraph and a heading.

`about section`
contains an introduction text and a code text image => </>

`skills sub section`
contains each skill and its progress bar

`features section`
contains a title, three features Each feature includes an image, a title, a description, and a "more" button.

`testimonials sub section`
contains six testimonials. Each testimonial includes an image, a name, a title, and a text.

`gallery sub section`
contains images and filter buttons to these images

## CSS

The CSS file "style.css" contains styles for the header, main section, and aside of the website.

`The header` is fixed to the top of the page and contains a logo and a navigation menu that is hidden by default and shown when the user clicks on the burger icon in small screens. The header has a background color and text color, and the navigation menu has a transition effect when it is shown or hidden.

`The main` section contains page main content.

`The landing` section has a full-screen background image and a centered heading, a paragraph. The main section has a background color and text color, and the landing section has a background image that covers the entire section and is centered.

`The aside` contains the settings tab and is hidden by default.

`The checkbox styles` are used for the dark mode checkbox and the random background image checkbox. The checkboxes have a custom appearance using labels and a transition effect when clicked.

`section title`
contains a smooth border and bg animation

`img-fade-in`
applies a fade in animation from 0% size to 100%

`img-fade-in`
applies a fade out animation from 100% size to 0%

`features styles`
all features are centered with flex box and if the have a minimam width if
exceeded it will wrap to the next line.

`testimonials styles`
testimonials uses css grid to make as many columns as the the size of the screen can take with a minimam width of 300px per column.
each testimonial is moved to the left or right and fade in on scroll.

`gallery styles`
make a images grid with css flexbox

## JavaScript

"The JavaScript file named "main.js" contains functions and event listeners for a website. The functions handle various tasks such as changing the language of the website, toggling the navigation menu, setting the main color of the website, and creating a button to scroll to the top of the page. The code also uses local storage to remember user preferences such as dark mode and random background images. The file imports a JSON file containing translations for the website's text. Overall, the app is designed to enhance the user experience and provide customization options."

### **Functions**

`main()`
This function calls all the necessary functions to initialize the website.

`checkDarkMode()`
This function checks if dark mode is allowed based on the user's preference or local storage. If there is no item in local storage, it sets the dark mode based on the device preference. If dark mode value is set then use it. If dark mode is not allowed, it sets the checkbox to false and sets the color mode to light.

`checkRandBgRepeat()`
This function checks if the random background image is allowed based on the user's preference or local storage. If there is no option value in local storage, it checks if in HTML (allow) is the default option. If the option is not set, it returns. If the option is set to false, it sets the checkbox to false. If the option is set to true, it sets the checkbox to true and gets a random image first then changes it every 10 seconds.

`changeLangTo(lang, direction)`
This function changes the language of the website and the direction of the text based on the user's preference or local storage. It fetches a JSON file containing translations for the website's text and updates the text on the website. It also updates the direction of the website, the style of the settings aside and the alt tag of the gallery images.

`createScrollToTopBtn()`
This function creates a button to scroll to the top of the page and shows or hides the button based on the user's scroll position.

`getInterval()`
This function returns an interval that sets a random background image every 10 seconds.

`handleSettingsTab()`
This function handles the settings tab and allows the user to change the main color of the website. It also sets the main color based on the user's preference or local storage.

`setPageLang()`
This function sets the language of the website based on the user's preference or local storage. If there is no lang item in local storage, it defaults to English if the user's language is not Arabic.

`setRandImg()`
This function sets a random background image for the website.

`toggleNavbar()`
This function toggles the navigation menu and adds an active class to the clicked nav link.

`addAnimations`
This function adds fade-in animations to certain elements on the website. It uses the IntersectionObserver API to detect when the elements are in the viewport and apply the animations. The function does not take any parameters and does not return any value. It works by selecting certain elements on the page and adding a CSS class to them when they are in the viewport. The CSS class contains the animation properties that create the fade-in effect.

`addSkillsProg`
add the skill progress for each bar so it can be animated on scroll

`handleGalleryFilter`
add a click event listener for each filter btn that filter the images according to its type (forest, snow, nature, imaginative)

### **Event Listeners**

- _click_

  `handleSettingsTab()`
  : When the user clicks on a color setting button, it updates the main color of the website and sets the active class to the clicked button.

  `createScrollToTopBtn()`
  : When the user clicks on the scroll to top button, it scrolls to the top of the page.

  `toggleNavbar()`
  : When the user clicks on the burger icon, it toggles the navigation menu.

  `handleGalleryFilter`
  : when the user clicks on the filter btn, it filters the gallery images according to its type.

- _change_

  `checkDarkMode()`
  : When the user changes the dark mode checkbox, it updates the dark mode value in local storage and sets the color mode.

  `checkRandBgRepeat()`
  : When the user changes the random background image checkbox, it updates the option value in local storage and sets the interval to change the background image.

  `handleSettingsTab()`
  : When the user changes the language radio button, it updates the language of the website and the direction of the text.

- _scroll_

  `createScrollToTopBtn()`
  : When the user scrolls, it shows or hides the scroll to top button based on the user's scroll position.

- _load_

  `main()`
  : When the website loads, it initializes the website by calling all the necessary functions.
