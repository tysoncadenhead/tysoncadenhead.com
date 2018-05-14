I have several Wordpress websites that I've designed and developed. Perhaps a little known secret is that I have all of the sites hosted inside a single Wordpress installation instead of hosting a completely unique installation for each site. Sharing a common code-base for the heavy lifting has some great benefits.

<!-- more -->

- It takes up less space on my server.  Wordpress isn't huge considering what it does, but every 12.8 MB counts.
- It makes updates easier.  When there is a new version of Wordpress available, I can update it for all of my sites at once.
- Sharing plugins is nice.  Once you have installed a plugin for one of your sites, it's also available for all of your other sites without having to download it again for a separate Wordpress installation.

So how do I host more than one site on the same installation?  I'm glad you asked.

First things first, you'll want to set up a local development environment. You'll use it to view your sites in locally so that you don't screw things up on your production server.

If you haven't done this already, (download the latest version of Wordpress)[http://wordpress.org/download/] and put it under your /Sites/wordpress directory. Go through the installation process.  For the sake of this tutorial, I will be using [XAMPP](http://www.apachefriends.org/en/xampp.html) for Apache and mySQL, but feel free to use whatever Apache installation you like.

Once you have Apache running and have installed Wordpress, it's time for the real fun to begin.

You will need to add a few sites to your host file.  If you're on a Mac, you can get there by opening your terminal and typing

```text
sudo vim /private/etc/hosts
```

If you are on Windows, it's probably somewhere around:

```text
C:\system32\drivers\etc\hosts
```

For the sake of this tutorial, we'll say that we are hosting two Wordpress sites for now.  One of the sites is a blog about my dog, Arthur, so the URL will be http://mydogarthur.com and the other site is about my love of tea and will be hosted at http://teatyson.com. In order to view these sites locally, we would add these lines to our host file:

```text
127.0.0.1       mydogarthur.loc
127.0.0.1       teatyson.loc
```

Now, whenever we go to http://mydogarthur.loc or http://teatyson.loc, it will direct us to our local machine. If you've never done anything like this, just be aware that 127.0.0.1 is always your local IP address.

Once you update your hostfile, restart your Apache server and go to one of the addresses you added. It will probably give you a message telling you that the location is not available. That's fine, because we still have work to do.

Now you will need to open your virtual hosts file. If you are using XAMPP, it will be under /xamppfiles/etc/extra/httpd-vhosts.conf. You will need to add a few lines to tell Apache what directory to serve up when your domains are accessed.

```text
<VirtualHost *:80>
    DocumentRoot '/Users/wordpress/'
    ServerName mydogarthur.loc
</VirtualHost>

<VirtualHost *:80>
    DocumentRoot '/Users/wordpress/'
    ServerName teatyson.loc
</VirtualHost>
```

The last configuration you will need to do is in the wp-config.php file directly under the Wordpress root. If you've gone through the Wordpress installation process, there should already be a database connection set up. You can copy your database if you go to http://localhost/phpmyadmin. We will make a copy called "mydogarthurs_database" and another copy called "teatysons_database." Then, we will replace the database connection in wp-config.php with a switch statement like this:

```php
switch($_SERVER["HTTP_HOST"]) {

    // Development

    case 'mydogarthur.loc':
        define('DB_NAME', 'mydogarthurs_database');
        define('DB_USER', 'mydogarthurs_database_user');
    define('DB_PASSWORD', 'mydogarthurs_database_password');
    define('DB_HOST', 'localhost');
    break;

    case 'teatyson.loc':
        define('DB_NAME', 'teatysons_database');
        define('DB_USER', 'teatysons_database_user');
    define('DB_PASSWORD', 'teatysons_database_password');
    define('DB_HOST', 'localhost');
    break;

    // Production

    case 'mydogarthur.com':
        define('DB_NAME', 'mydogarthurs_database');
        define('DB_USER', 'mydogarthurs_database_user');
    define('DB_PASSWORD', 'mydogarthurs_database_password');
    define('DB_HOST', 'localhost');
    break;

    case 'teatyson.com':
        define('DB_NAME', 'teatysons_database');
        define('DB_USER', 'teatysons_database_user');
    define('DB_PASSWORD', 'teatysons_database_password');
    define('DB_HOST', 'localhost');
    break;

}
```

Finally, restart your Apache server. You should have a different database connection for http://teatyson.loc and http://mydogarthur.com. Since everything, including the theme is driven from the database, you can easily serve up completely different content from each domain.