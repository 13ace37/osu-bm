console.log(`Welcome to ${require("./package.json").name} v${require("./package.json").version}`)

const M = {};
["chalk", "cli-select", "win-select-folder", "win-select-file", "fs", "path", "open"].forEach(m => M[m] = require(m));

 
const F = {};

F.fetchDir = (dir) => {
    dir = M.path.join(dir, "Songs");
    if (!M.fs.existsSync(dir)) return console.error(new Error("Invalid osu! dir provided or Songs folder does no exists"));
    M.fs.readdir(dir, (e, f) => {
        if (e) return console.error(new Error(e));
        let beatmapsDirect = "";
        let beatmapsSets = "";
        f.forEach(bm => {
            if (bm.match(/^\d/)) {
                beatmapsDirect += "<a href=\"osu://dl/" + bm.split(" ")[0].split("_")[0] + "\">" + bm + "</a></br>";
                beatmapsSets += "https://osu.ppy.sh/s/" + bm.split(" ")[0].split("_")[0] + "\n";
            }
        });
        M.fs.writeFileSync(M.path.join(dir, "Songs-exported.html"), beatmapsDirect);
        M.fs.writeFileSync(M.path.join(dir, "Songs-exported.txt"), beatmapsSets);
    })
}

F.getOsuFolder = () => {
    M["win-select-folder"]({root: "MyComputer", description: "Select osu! root folder", newFolderButton: 0})
      .then(result => {
        if (result === 'cancelled') process.exit();
        else F.fetchDir(result);
      }).catch(err => console.error(err))
}


F.handleMaplist = (mapList, mapListDir, mapListName) => {
    console.log("Maplist fetched!\nHTML = clickable maplinks to file and direct download link\nDirect Download = download using osu!direct WARNING! REQUIRES OSU!SUPPORTER!!");
    M["cli-select"]({
        values: ["export to html file", "directly download maps"],
        defaultValue: 0,
        selected: '[~]',
        unselected: '[ ]',
        indentation: 0,
        cleanup: true,
        valueRenderer: (value, selected) => {
            if (selected) {
                return M.chalk.underline(value);
            }
            return value;
        },
        outputStream: process.stdout,
        inputStream: process.stdin,
    }).then((response) => {
        switch (response.id) {
            case 1:
                mapList.forEach(map => {M.open("osu://b/" + map.split("/")[map.split("/").length - 1])});
                break;
            default:
                let data = "";
                mapList.forEach(map => data += `<a href="${"osu://b/" + map.split("/")[map.split("/").length - 1]}">${map.split("/")[map.split("/").length - 1]}</a></br>`);
                M.fs.writeFileSync(M.path.join(mapListDir, mapListName.split(".")[0] + "-exported.html"), data);
                break;
        }
    }).catch(() => {
        process.exit();
    });
}

F.fetchMaplist = (mapList) => {
    mapList = mapList[0];
    if (mapList.split(".")[mapList.split(".").length - 1] != "txt") return console.error(new Error("Maplist file needs to be .txt file"));
    let data = M.fs.readFileSync(mapList, "utf8").replace(/\r/g, "").split("\n");
    if (data.length <= 0) return console.error(new Error("Maplist empty"));
    if (data.some(ln => !ln.match(/^https?:\/\/osu\.ppy\.sh(\/b\/\d{1,10}|\/beatmapsets\/\d{1,10}#(osu|taiko|mania|fruits)\/\d{1,10})/gm))) return console.error(new Error("Maplist beatmap format incorret"));
    F.handleMaplist(data, M.path.dirname(mapList), M.path.basename(mapList));
}

F.getImportFile = () => {
    console.log("This feature currently only supports /b or /beatmapsets links /s links will follow!");
    M["win-select-file"]({root: "Desktop"})
      .then(result => {
        if (result === 'cancelled') process.exit();
        else F.fetchMaplist(result);
      }).catch(err => console.error(err))
}


M["cli-select"]({
    values: ["export maps", "import skins"],
    defaultValue: 0,
    selected: '[~]',
    unselected: '[ ]',
    indentation: 0,
    cleanup: true,
    valueRenderer: (value, selected) => {
        if (selected) {
            return M.chalk.underline(value);
        }
        return value;
    },
    outputStream: process.stdout,
    inputStream: process.stdin,
}).then((response) => {
    switch (response.id) {
        case 1:
            F.getImportFile();
            break;
        default:
            F.getOsuFolder();
            break;
    }
}).catch(() => {
    process.exit();
});