[![Build Status](https://github.com/13ace37/osu-bm/workflows/Lint/badge.svg)](https://github.com/13ace37/osu-bm/actions)

# osu-bm
beatmap in- & exporter for the popular rhythm game osu!

__This script is in a very early alpha stage. I assume no liability for any data loss or the like when using this script. The responsibility lies with the person who runs this script!__

## Why?

Why not :D

This script is not meant to be anything big, just a project I learned new things from. So this might be no use for you or others but I have used it for quite some time now. So in any way, my idea was to create a tool to download stuff directly from the official servers instead of torrenting some weird old-ass maps from sketchy sites. Not only do you rely on others to seed for you, but you might also run into old or outdated maps no one wants to play anymore. And you don't need to upload your maps to some random place. You can just export them to a text file send it to your friends and let them download it through the osu!direct download with their full internet speed, instead of servers you uploaded your files to.


## Installation 

- clone the repo
- run `npm i` inside the directory of the script
- run the script using `node index.js`

## Usage

__The direct download functions uses osu!direct, this requires osu!supporter to work!! Do NOT run these downloaders without osu!supporter!!__

### Exporting maps

- choose the osu! game folder __NOT__ the map folder
- select what do u want to export to 


this one creates two files in your mapfolder.

- `Songs-exported.html`:

	- contains the mapsetID + the name of the map
	- the link leads to a direct mapset download using osu!direct
	- ```<a href="osu://dl/1000309">1000309 Sleeping With Sirens - If You Can't Hang</a></br>```

- `Songs-exported.txt`:

	- contains the mapset http link 
	- ```https://osu.ppy.sh/s/1000309```


### Importing maps

each map takes 5sec to import to "try" to prevent game crashes

- choose a `.txt` file containing map links separated by `\n` or `\r\n`
- matching regex for importing `/^https?:\/\/osu\.ppy\.sh(\/(b|s)\/\d{1,10}|\/beatmapsets\/\d{1,10}#(osu|taiko|mania|fruits)\/\d{1,10})/gm`

- export to html

	- creates a `{filename}-exported.html` file in the directory of the maplist file
	- contains the beatmap id
	- the link leads to a direct beatmap download using osu!directory
	- ```<a href="osu://b/1000309">1000309</a></br>```

- direct download

	- directly downloads the mapsets using osu!direct
