
This "visualization" started as an experiment with different ways of integrating d3 with the wonderful responsiveness of CSS grid. So far, I've connected the SVG to the size of its containing DIV and accounted for mobile devices. 

<img width="300" alt="screen shot 2018-06-01 at 8 47 53 pm" src="https://user-images.githubusercontent.com/15457713/40868673-17766f80-65dd-11e8-9472-37f4cdee8a78.png">

I ended up choosing the remove/replace on window resize method for responsiveness. 

The window property reads pixel value, which for the iPhone is 640 x 960, so I couldn't use that in any sort of responsiveness conditional. As an alternative, I created a simple conditional using the navigator.userAgent method to test for mobile and redefine axes attributes accordingly.

This is actually connected to data, the [U.S. Economic Census](https://factfinder.census.gov/faces/tableservices/jsf/pages/productview.xhtml?src=bkmk) from 2012.
