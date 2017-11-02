# Sense-electron
A native version of the kibana sense plugin for elasticsearch

![Sense-electron](https://raw.githubusercontent.com/gillyb/sensitive/master/screenshots/sense.png)

### A little bit of history  
A long time ago, [elastic.co](http://elastic.co) released a chrome extension called Sense that made it really easy to communicate with your elasticsearch server. It had a simple and comfortable UI, but more importantly it offered auto-complete (a.k.a. intellisense) when building elasticsearch queries.  
This was an amazing tool, and I used it a lot.  

Then, (for some unknown reason) they decided to remove it from the Google extensions library, and it was only offered to customers who bought a license for marvel (the elasticsearch monitoring app).  

Recently elastic released the sense code as a plugin for kibana.  
This is great news! ...but what if I'm not using kibana ? I'm using elasticsearch and want to use sense, but I don't want to install kibana for that!

### Sense-electron to the rescue!  
Sense-electron is the sense plugin wrapped as a native desktop application, using [electron](http://electron.atom.io/).
It basically has all the code from Sense-2.0.0-beta2 and from Kibana in it with couple modifications.


### Why is this better than project by [gillyb](https://github.com/gillyb/sensitive) ?  
It has autocomplete feature working and supports es5.0 API (as Kibana does in 5.6.3 - I actually take that little part from there).

### Running from the source code  
* Install [nodejs](https://nodejs.org/en/)
* Download the 'Sense-electron' source code
* Open your terminal (or cmd) and open the directory where you put the source code
* run `npm install` (this might take a while)
* run `npm start` to build and run the application
  
### Executable  
If you just want a running executable of this on Windows x64, then run the following command:
`npm run package-win`

Thanks :)  

The most important tasks for now:  
* Adapt Sense part of current version of [Kibana](https://github.com/elastic/kibana) to use as separate application

### More links  
* [Repo](https://github.com/gillyb/sensitive) which has been used to make the app 
