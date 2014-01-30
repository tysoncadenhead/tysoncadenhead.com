So, I recently was working on a project using Sencha Touch and Phonegap to create an iPhone App and everything worked perfectly when I was using the emulator for the iPhone 3, but when I emulated it for the iPhone 4, it wouldn't load anything at all.  The solution?  Apparently, the DOM was still rendering when the Ext.onReady block was firing because the iPhone 4 was not properly using the Ext.onReady block.  

<!-- more -->

I'm still not sure if that was the fault of Sencha Touch or Phonegap, but here is the solution:

```html4strict
   <head>
      <script>
         BodyOnLoad = function(){
            Ext.onReady(function(){
               // Your code to execute
            });
         }
      </script>
   </head>
   <body onload=”BodyOnLoad()”></body>
</html>
```

As you can see, the secret is to use a body onload function to encapsulate the Ext.onReady function so that it doesn't fire until the body is loaded.