**This isn't maintained at all, it was an experiment and a challenge to myself a few years back**

What is it?
===========
It's an AJAX, Node.JS <a href='http://en.wikipedia.org/wiki/Steganography'>steganography</a> web app.
It takes a picture and a file and if the file is small enough, it will do some magic and mix the 2 files together, hiding one inside of the other by using the lowest significant nibble (half a byte) in the blue part of each pixel.

How it works:
===========
Magic. Look in `node_modules/stego.js` for all the hard nibble, bit and byte twiddling.

What are the dependencies? Your repo doesn't have them all!
===========
You need Node.JS 0.6.7, I know 0.4.1 won't work because of a bug in Buffer class.
You'll need Express and connect-form(which you can install that through NPM) as well as Imagemagick `convert` to do the image conversion.
