# tysoncadenhead.com

This is the code for tysoncadenhead.com. The site is generated with Harp.js into a static site.

### Starting the harp server

```bash
harp server myproject
```

### Deploying

```bash
harp compile _harp ./
cp -r _harp/images images
cp -r _harp/js js
cp _harp/CNAME CNAME
```

then push to the `gh-pages` branch.