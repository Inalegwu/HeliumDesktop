import { app } from "electron";
import path from "path";
import * as fs from "fs";

// functions that relate to application behaviour
// read in the settings , save the settings , perform updates
// send crash information yada yada yada

// !IMPORTANT I'm not always a fan of object oriented programming
// !IMPORTANT but it just seemed to make sense here just for structure
export default class AppFunctions {
  readSavedSettings(event: any) {
    const getPath = path.join(app.getPath("appData"), "helium/settings.json");
    const content = fs.readFileSync(getPath, "utf-8");

    const parsed = JSON.parse(content);

    return parsed;
  }
  handleSaveSettings(event: any, settings: any) {
    fs.writeFile(
      path.join(app.getPath("appData"), "helium/settings.json"),
      settings,
      (err) => {
        if (err) throw err;
      }
    );
  }
}
