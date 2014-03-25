# tysoncadenhead.com

This is the code for tysoncadenhead.com. The site is generated with Harp.js into a static site.

### Starting the harp server

```bash
harp server myproject
```

### Deploying

Add this to your `.profile`

```bash
function tyson_deploy () {
        cd ~/Sites/apps/tysoncadenhead.com; # This is the project root
        harp compile _harp ./;
        cp -r _harp/images images;
        cp -r _harp/js js;
        cp _harp/CNAME CNAME;
        git add -u;
        git commit -m "$1";
        git push origin gh-pages;
}
```

then you can run:

```bash
tyson_deploy "{Commit Message}"
```