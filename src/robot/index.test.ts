import { moveInSeries } from "./index.ts";

const makePositionFromString = <L extends Lang>(str: string): Position<L> => {
  const [x, y, dir] = str.split(" ");

  return {
    x: Number(x),
    y: Number(y),
    dir: dir as Compass<L>,
  };
};

describe("moveInSeries", () => {
  const commands = ["HGHGGHGHG", "RRFLFFLRF"] as const;
  const startPositions = ["1 2 N", "0 0 N"] as const;
  const results = ["1 3 N", "3 1 E"] as const;
  const titles = {
    example1: `Example 1: Square Room, Size 5, Swedish input: ${commands[0]}, Starts at ${startPositions[0]}, Ends at ${results[0]}`,
    example2: `Example 2: Circle Room, Size 10 radius, English input: ${commands[1]}, Starts at ${startPositions[1]}, Ends at ${results[1]}`,
  } as const;

  describe(titles.example1, () => {
    it("executes a series of move commands", () => {
      const environment: Environment<number, "Swedish"> = {
        lang: "Swedish",
        size: 5,
        type: "square_room",
        yAxisInverted: false,
      };
      const startingPosition = makePositionFromString<"Swedish">(
        startPositions[0],
      );
      const endPosition = makePositionFromString<"Swedish">(results[0]);
      const command = commands[0];
      const positions = moveInSeries({
        command,
        environment,
        startingPosition,
      });
      const position = positions.at(-1);

      expect(position).toHaveProperty("x", endPosition.x);
      expect(position).toHaveProperty("y", endPosition.y);
      expect(position).toHaveProperty("dir", endPosition.dir);
    });
  });

  describe(titles.example2, () => {
    it("executes a series of move commands", () => {
      const environment: Environment<number, Lang> = {
        lang: "English",
        outputLang: "Swedish",
        size: 10,
        type: "circle_room",
        yAxisInverted: false,
      };
      const startingPosition = makePositionFromString<"English">(
        startPositions[1],
      );
      const endPosition = makePositionFromString<"English">(results[1]);
      const command = commands[1];
      const positions = moveInSeries({
        command,
        environment,
        startingPosition,
      });
      const position = positions.at(-1);

      expect(position).toHaveProperty("x", endPosition.x);
      expect(position).toHaveProperty("y", endPosition.y);
      expect(position).toHaveProperty("dir", endPosition.dir);
      expect(position?.toString()).toBe("3 1 Ö");
    });
  });
});
