One of the best parts of CSS3 is the ability to do keyframe animation. Once upon a time, if you wanted to animate DOM elements in the browser, you had to do it with JavaScript. CSS3 animations are generally smoother and perform better than moving elements around with JavaScript. They also do really well on mobile devices.

With a little bit of working knowledge, it's really not hard to make some nice looking CSS3 animations, and that is what we are going to do today. If you have ever studied animation, you probably know that one of the first things you need to learn is how to do squash, stretch and bounce, which are the cornerstones of exaggerated animation physics. Today, I'm going to walk you through how you can handle those basics just using CSS3.

<!-- more -->

<style type="text/css">
.stage {
    background: #EEE;
    width: 800px;
    height: 400px;
    position: relative;
}

.ball {
    background: #CCC;
    border-radius: 50%;
    height: 100px;
    width: 100px;
}

.ball-container {
    height: 150px;
}

.animate {
    -webkit-animation-name: squash;
    -webkit-animation-duration: 1s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;
    -webkit-animation-delay: 0;
    
    animation-name: squash;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-delay: 0;
}

.stretch {
    -webkit-animation-name: stretch;
    animation-name: stretch;
}

.bounce {
    position: absolute;
    -webkit-animation-name: bounce;
    -webkit-animation-duration: 3s;
    -webkit-animation-direction: normal;
    -webkit-timing-function: ease-out;
    
    animation-name: bounce;
    animation-duration: 3s;
    animation-direction: normal;
    timing-function: ease-out;
}

@-webkit-keyframes bounce {
    from { left: 100px; bottom: 300px; height: 150px; }
    10% { left: 150px; bottom: 0px; height: 50px; }
    20% { left: 200px; bottom: 250px; height: 140px; }
    30% { left: 250px; bottom: 0px; height: 60px; }
    40% { left: 300px; bottom: 200px; height: 130px; }
    50% { left: 350px; bottom: 0px; height: 70px; }
    60% { left: 400px; bottom: 150px; height: 120px; }
    70% { left: 450px; bottom: 0px; height: 80px; }
    80% { left: 500px; bottom: 100px; height: 110px; }
    90% { left: 550px; bottom: 0px; height: 90px; }
    100% { left: 600px; bottom: 50px; height: 100px; }
}

@-webkit-keyframes squash {
    from { height: 100px; }
    to  { height: 50px; }
}

@-webkit-keyframes stretch {
    from { height: 150px; }
    to { height: 50px; }
}
</style>

### Squash

To squash in the animation world means to take an object and compress it to be shorter and wider. Take this ball for example:

<div class="ball"></div>

When we drop it on the ground, we can show the impact by squashing it:

<div class="ball" style="height: 50px;"></div>

With CSS3, we can animate between the two states like this:

<div class="ball-container">
    <div class="ball animate"></div>
</div>

The CSS for that would look like this:

```css
.animate {
    -webkit-animation-name: squash;
    -webkit-animation-duration: 1s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;
    -webkit-animation-delay: 0;
    -webkit-animation-timing-function: ease-out;
    
    animation-name: squash;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-delay: 0;
    timing-function: ease-out;
}

@-webkit-keyframes squash {
    from { height: 100px; }
    to  { height: 50px; }
}
```

If that looks intimidating, let me just say that the amount of code this takes can be almost cut in half using a CSS processor like SASS so you don't have to use the `-webkit` vendor prefixes.

What we are doing is creating an keyframe animation name "squash". It starts with a height of 100px and ends with a height of 50px. We also set some information about the animation on the element itself. The `animation-duration` tells us how long the animation will take from start to finish. The `animation-iteration-count` tells us how many times the animation should repeat. The `animation-direction` tells us whether to start from the beginning or end of the keyframes. Since we are using "alternate", the animation will go from the start of the keyframes to the end and then run the animation backwards.

### Stretch

Stretch is the opposite of squash. When a ball or a character bounces back up, they stretch out while they are in motion. Adding a stretch to our ball would look something like this:

<div class="ball-container">
    <div class="ball animate stretch"></div>
</div>

To get that, we'll just want to expand the height to get taller than the width, like this:

```css
@-webkit-keyframes squash {
    from { height: 150px; }
    to  { height: 50px; }
}
```

### Bounce

Squashing and stretching are pretty useless without a bounce. The basic principle of a bounce is that every time it hits the ground, it should bounce up a little less until it comes to a stop.

All said, our bouncing ball should look like this:

<div class="stage">
    <div class="ball animate bounce"></div>
</div>

To get to that point, we will need to update our keyframes:

```css
@-webkit-keyframes sqaush {
    from { left: 100px; bottom: 300px; height: 150px; }
    10% { left: 150px; bottom: 0px; height: 50px; }
    20% { left: 200px; bottom: 250px; height: 140px; }
    30% { left: 250px; bottom: 0px; height: 60px; }
    40% { left: 300px; bottom: 200px; height: 130px; }
    50% { left: 350px; bottom: 0px; height: 70px; }
    60% { left: 400px; bottom: 150px; height: 120px; }
    70% { left: 450px; bottom: 0px; height: 80px; }
    80% { left: 500px; bottom: 100px; height: 110px; }
    90% { left: 550px; bottom: 0px; height: 90px; }
    100% { left: 600px; bottom: 50px; height: 100px; }
}
```

Basically, we're just animating the left and bottom positions of the element to slowly come to a halt.

If you want to see a fiddle of the whole thing, check it out [here](http://jsfiddle.net/tysoncadenhead/bFEU3/). Enjoy the fun of CSS animation!