// import { move } from "#robot";
import { whichLanguage } from "#utils";

whichLanguage({ choices: ["English", "Swedish"] }).then((lang) => {
  console.log("You picked:", lang);
  console.log("Now type anything (Ctrl+C to exit):");
});
