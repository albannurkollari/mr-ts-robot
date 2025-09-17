import pc from "picocolors";
import { moveInSeries } from "#robot";
import {
  getMoveCommand,
  setStartingPosition,
  setupEnvironment,
  whichLanguage,
} from "#utils";

const log = console.log.bind(globalThis);
const lang = await whichLanguage();
const environment = await setupEnvironment(lang);
const startingPosition = await setStartingPosition(environment);
const command = await getMoveCommand(lang, environment.type);
const outputLang = environment.outputLang ?? lang;

log("\n", pc.bgWhite(pc.white(`${pc.black(pc.bold("Selection: "))}`)), "\n");
log(pc.green(`Environment: ${pc.bold(JSON.stringify(environment, null, 2))}`));
log(
  pc.green(
    `Starting Position: ${pc.bold(JSON.stringify(startingPosition, null, 2))}`,
  ),
);
log(pc.green(`Command: ${pc.bold(command)}`), "\n");

if (outputLang === "English") {
  const { x, y, dir } = startingPosition;
  const value = `${x} ${y} ${dir}`;

  log(`•  Start at: ${pc.cyan(value)}`);
} else {
  const { x, y, dir } = startingPosition;
  const value = `${x} ${y} ${dir}`;

  log(`•  Starta vid: ${pc.cyan(value)}`);
}

moveInSeries({ command, environment, startingPosition });
