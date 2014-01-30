There are plenty of reasons to want to browse the Internet privately. Search engines and social media sites have been collecting our browsing for years in order to target marketing and advertisements to us. There are plenty of hackers out there who would love to get their hands on your data. But perhaps the most disturbing recent revelation about data collection has been the extent to which the NSA is actively gathering our personal information.

<!-- more -->

Many naive people might claim that if we are doing nothing wrong, then there is nothing to worry about. It should be pointed out that those same people don't live in a completely see-through glass house. Why is that? Maybe privacy is more important to them than they might claim.

For the sake of argument, you may have complete faith that every single person in the government is a perfect person and wouldn't ever do anything to harm you. Even then, you have to worry about identity theft, hackers getting access to your data, etc...It simply isn't something you should trust other people to take care of for you.

A few months ago, I stumbled across the Tor software. If you aren't familiar with it, Tor allows you to browse the web anonymously by randomly choosing a remote proxy anywhere in the world. This means that when you go to a website, your IP address could potentially be traced to Alabama, Texas or Paris. In other words, it can't be traced to you.

Initially I was a little bummed that the Tor download included a modification of the Firefox browser since Google Chrome is my current browser of choice. Luckily, I found a way to browse securely with Tor in Chrome.

If you'd like to get more security when you browse, here are the steps you can follow to get Tor running in Chrome.

### Download and Install Tor

Tor is available for download on the [Tor website](https://www.torproject.org/projects/torbrowser.html.en). Start by downloading it and installing it on your machine.

### Install Proxy SwitchySharp In the Google Chrome Web Store

Proxy SwitchySharp is a Google Chrome extension that allows you to switch out your proxy on the fly. It is available [in the Google Chrome Web Store](https://chrome.google.com/webstore/detail/proxy-switchysharp/dpplabbmogkhghncfbfdeeokoefdjegm?utm_source=chrome-ntp-icon). Install it.

### Start Tor

If you open the Tor browser that you just download, you will see a control panel that looks something like this:

![Tor Browser Control Panel](/images/blog/tor1.png)

Click on the button to start the server.

### Find your port

From the Tor control panel, click on the "settings" button. From there click on "advanced" and find the "Edit current torrc" button.

![Tor Advanced Settings](/images/blog/tor2.png)

The "Edit current torrc" button should open a configuration file like this:

![Torrc](/images/blog/tor3.png)

Copy the port number labeled "SocksPort". We'll need that in a minute.

### Open the SwitchySharp Options

In Chrome, the SwitchySharp options icon should look something like this:

![SwitchySharp Icon](/images/blog/tor4.png)

Click on it and then click on "options".

### Configuration

In the SwitchySharp control panel, under "manual configuration", add "127.0.0.1" to your "SOCKS host" and add the port number you copied from you Torrc file as the SOCKS host port number.

Add an easy to understand profile name such as "tor".

Your configuration should look something like this:

![SwitchySharp Tor Configuration](/images/blog/tor5.png)

Click "Save".

Now if you click on the icon for your SwitchySharp plugin again, you should be able to select the "tor" connection that you just created. Try going to an ip sniffing site like [whatismyip.com](http://whatismyip.com). Your IP address should now be masked.

### Congratulations, you've just become anonymous.

It should be noted that your IP Address isn't the only way your identity can become compromised. Tor has a short list of [additional steps](https://www.torproject.org/download/download-easy.html.en#warning) you should take to ensure your privacy.

For the sake of full disclosure, I haven't gotten to the point where I use Tor all the time. It can be a little slower than hitting websites with a direct connection. But the benefits definitely outweigh the drawbacks in my opinion. I've also taken a few more steps like switching my default search engine to [duckduckgo](http://duckduckgo.com), which doesn't collect browsing data like Google does. Privacy is a big thing to take on, but any small steps that you can take are probably worthwhile.