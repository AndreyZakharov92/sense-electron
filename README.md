# Sense-electron
A native version of the kibana sense plugin for elasticsearch

![Sense-electron](https://raw.githubusercontent.com/AndreyZakharov92/sense-electron/master/screenshots/sense.png)

### A little bit of history  
A long time ago, [elastic.co](http://elastic.co) released a chrome extension called Sense that made it really easy to communicate with your elasticsearch server. It had a simple and comfortable UI, but more importantly it offered auto-complete (a.k.a. intellisense) when building elasticsearch queries.  
This was an amazing tool, and I used it a lot.  

Then elastic released the sense code as a plugin for kibana. And they stopped supporting chrome extension.
This is great news! ...but what if I'm not using kibana ? I'm using elasticsearch and want to use sense, but I don't want to install kibana for that!
After a long time of using Sense plugin for Chrome, which was working very well with new versions of elasticsearch, I was surprized one day that it became blocked:

![blocked chrome extension](https://raw.githubusercontent.com/AndreyZakharov92/sense-electron/master/screenshots/chrome-plugin-disabled.png)

### Sense-electron to the rescue!  
Sense-electron is the sense plugin wrapped as a native desktop application, using [electron](http://electron.atom.io/).
It basically has all the code from [Sense-2.0.0-beta2](https://github.com/elastic/sense) and a bit from Kibana in it with couple modifications.


### What improvements have been made to forked project by [gillyb](https://github.com/gillyb/sensitive) ?  
It has autocomplete feature working and supports es5.0 API (as Kibana does in 5.6.3). The application uses port 3099 for that.


### Running from the source code  
0. Install [nodejs](https://nodejs.org/en/)
1. Download the 'Sense-electron' source code
2. Open your terminal (or cmd) and open the directory where you put the source code
3. Run `npm install` (this might take a while)
4. Run `npm start` to build and run the application


### Executable  
If you just want a running executable of this on Windows x64, then do the following steps (gonna automate this):

0. Run `npm install` (if you haven't already)
1. Create `dist` folder in the root
2. Run `npm run build`
3. Copy in `dist` the following: `packaje.json`, `main.js`, `sense-api-dist`, `sense`, `node_nodules`
4. Run `npm run package-win`

Feel free to change `package-win` script in `package.json` for your platform.
Thanks :)  

The most important tasks for now:  
* Adapt Sense part of current version of [Kibana](https://github.com/elastic/kibana) to use as separate application

### More links  
* [Repo](https://github.com/gillyb/sensitive) which has been used as a start point. Thank you gillyb!
