One way to reduce the loading time of your website or application is to merge multiple images together into one large sprite. The benefit is that only one http request has to be made instead of multiple requests. Of course, managing a sprite image and the CSS that uses it can be a pain in the neck. That is where [Compass](http://compass-style.org/) comes in. Compass has a really cool helper that lets you import an entire folder of images and that it will automatically sprite for you.

<!-- more -->

For some perspective on why Compass is a game changer, we have to look back on what it was like to create a sprite image in vanilla CSS. I remember when I first learned about [how sprites work](http://www.w3schools.com/css/css_image_sprites.asp), I went out and changed a bunch of my sites to use sprites for all of their images and icons. Websites are constantly being tweaked and changed. Unfortunately, maintaining a big image with a bunch of icons turned into huge overhead because every addition meant opening an ever-growing psd file and editing it. If an icon was removed during the development process, I was forced to either remove it in the psd file and re-factor huge chunks of css, or leave it in the image and waste time loading sections of the image that were never even seen. You can see the problem.

## The Compass Solution

Let's imagine for a moment that you are creating a website of cat pictures. You have a directory of two or three cat pictures that show up on every page of your site. Let's imagine that your files look like this:

![Cat Pictures](/images/blog/catpictures.png)

## The easy way

If we want to use Compass to create a big sprite and spit out all of the images with appropriate classes, we could simply do this:

```css
@import "cat_pictures/*.png";
@include all-cat_pictures-sprites;
```

That will generate css that looks something like this:

```css
.cat_pictures-sprite,
.cat_pictures-felix,
.cat_pictures-phil,
.cat_pictures-todd {
    background: url('/images/my-icons-s34fe0604ab.png') no-repeat;
}

.cat_pictures-felix {
    background-position: 0 0;
}

.cat_pictures-phil {
    background-position: 0 -200px;
}

.cat_pictures-todd {
    background-position: 0 -400px;
}
```

## Generate individual sprite images

If you want more finite control over the classes, you can do something like this:

```css
@import "cat_pictures/*.png";

.cats {
    
  .felix {
    @include cat_pictures-sprite(felix);
  }

  .phil {
    @include cat_pictures-sprite(phil);
  }

  .todd {
    @include cat_pictures-sprite(todd);
  }

}
```

Basically, by passing a name into the sprite, you can get the css for individual sprites. The above code will output something like this:

```css
.cat_pictures-sprite,
.cats .felix,
.cats .phil,
.cats .todd {
    background: url('/images/my-icons-s34fe0604ab.png') no-repeat;
}

.cats .felix {
    background-position: 0 0;
}

.cats .phil {
    background-position: 0 -200px;
}

.cats .todd {
    background-position: 0 -400px;
}
```

You should never have to worry about where the sprite image is located or what the background position is for any of your sprite images - Compass will manage that for you. Generating sprites with Compass is simple, straightforward, and best of all, maintainable.