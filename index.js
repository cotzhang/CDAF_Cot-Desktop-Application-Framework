const glasstron = require('glasstron');
const electron = require('electron');
const remote = require("@electron/remote/main")
remote.initialize();
let win;
electron.app.commandLine.appendSwitch("enable-transparent-visuals");
electron.app.on('ready', () => {
	setTimeout(
		spawnWindow,
		process.platform == "linux" ? 1000 : 0
		// Electron has a bug on linux where it
		// won't initialize properly when using
		// transparency. To work around that, it
		// is necessary to delay the window
		// spawn function.
	);
	});

function spawnWindow(){
	win = new glasstron.BrowserWindow({
		width: 600,
		height: 400,
		frame: false,
		resizable:false,
		webPreferences: {
	  		nodeIntegration: true, 
	  		contextIsolation: false
    	}
	});
	win.blurType = "blurbehind";
	win.setBlur(true);
	win.loadFile('app/index.html')
	win.removeMenu() 
	//win.setAlwaysOnTop("alwaysOnTop")
	//win.webContents.openDevTools({mode:"detach"})
	remote.enable(win.webContents)
	return win;
}