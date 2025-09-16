// import { move } from "#robot";
import { ENGLISH, SWEDISH } from "#constants";
import { moveMrTsRobot, whichLanguage } from "#utils";

whichLanguage()
  .then(moveMrTsRobot)
  .then(({ command, lang }) => {
    const selected = lang === "Both" ? `${ENGLISH} and ${SWEDISH}` : lang;

    console.log("Selected:", selected);
    console.log("Command:", command);
  });
