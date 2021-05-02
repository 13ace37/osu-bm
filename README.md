# osu-bm
beatmap utils for osu!

This script is in a very early alpha stage. I assume no liability for any data loss or the like when using this script. The responsibility lies with the person who runs this script!


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
