# mr-ts-robot

![Tests](https://github.com/albannurkollari/mr-ts-robot/actions/workflows/tests.yml/badge.svg)
[![Coverage](https://img.shields.io/codecov/c/github/albannurkollari/mr-ts-robot?branch=main)](https://app.codecov.io/gh/albannurkollari/mr-ts-robot)

A `TypeScript` application that simulates a robot navigating in a two-dimensional space.  
It interprets movement commands in `Swedish` or `English`, tracks the robot’s position and direction,  
and reports the final outcome. `pnpm` is the default choice for installing packages but you may choose any other package manager for that matter, without a hassle.

The project’s primary purpose is to demonstrate:

- Clean `TypeScript` code structure
- Good design principles
- Automated test coverage

## Getting Started

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test
```

## Running the Application

```bash
# Run normally
pnpm start

# Run in debug mode (NodeJS inspect)
pnpm start:debug
```

### Interactive CLI

Running `pnpm start` launches the application in interactive mode.  
The CLI guides you through a set of prompts where you can either:

- Accept **defaults** for quick execution, or  
- Customize every aspect of the simulation, including:  
  - Room type (square or circle)  
  - Room size (radius / side length)  
  - Command language (English or Swedish)  
  - Command sequence (robot instructions)  
  - Starting position and orientation  

This allows you to experiment with different configurations without changing the source code.

## How It Works

The application simulates a robot moving inside a bounded space (square or circular).  
The robot starts at a defined origin `(0,0)` facing a default direction.  
It then receives a sequence of commands (either in English or Swedish), such as:

- **F** / **G** → Move forward  
- **L** / **V** → Turn left  
- **R** / **H** → Turn right  

Each command updates the robot’s **position** and **orientation** according to simple movement rules:

1. **Orientation tracking** – The robot keeps its current facing direction as a cycle (North, East, South, West).  
   Turning left or right rotates this cycle, while moving forward advances the robot by one step in the current direction.

2. **Boundary validation** – Every new position is checked against the room’s boundaries.  
   - For a square, the robot must remain inside `[-size, size]` on both axes.  
   - For a circle, the robot must satisfy `x² + y² <= size²`.

3. **Final report** – After all commands are executed, the robot outputs its final `(x, y)` coordinates  
   along with the direction it’s facing, formatted according to the chosen language.

This approach keeps the logic modular:

- **Types and enums** define directions, commands, and environments.  
- **Utility functions** handle array cycling and boundary validation.  
- **Test coverage** ensures correctness of parsing, movement, and final reporting.
