
[![Current Version](https://img.shields.io/badge/version-1.0.0-yellow.svg)](https://github.com/OleksiiSukhov/chess-lead-lib)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-green.svg)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# Chess Lead Lib
This is a TypeScript [library](https://www.npmjs.com/package/chess-lead-lib) to manage [chess game](https://en.wikipedia.org/wiki/Chess) in the chess applications. It covers main chess game rules.

## Features
- Creating new or using existing game object.
- Providing available movement squares for a specific chess piece.
- Moving a chess piece with setting new game status.
- Resignation and draw by agreement.

## Consumer usage example
#### Install the package
```
npm install chess-lead-lib
```

#### Create instance
```typescript
const chessLead = new ChessLead();
```

#### Create instance using saved previously game
```typescript
const chessLead = new ChessLead(mySavedBoardState);
```

#### Get a square with chess piece
```typescript
const square = chessLead.chessBoardState.board[4][2];
```

#### Get list of acceptable squares to move
```typescript
const squaresToMove = chessLead.getAcceptableMovements(square);
```

#### Perform movement from one square to another
```typescript
chessLead.move(square, squaresToMove[7]);
```

#### Perform movement with new chess piece type in case pawn promotion
```typescript
chessLead.move(square, squaresToMove[7], ChessPieceType.Queen);
```

#### Check game status
```typescript
if (chessLead.isGameOver()) {
  // Game is over. Check GameStatus, DrawType or WinType.
}
```

## Setup for development
#### Clone this repository and install dependencies
```
git clone https://github.com/OleksiiSukhov/chess-lead-lib
npm install
```

#### Run tests (one of the following command, available with watch or coverage options)
```
npm run test
npm run test:watch
npm run test:coverage
```

#### Build the library
```
npm run build
```

#### Format the code
```
npm run format
```

## Versioning
The [SemVer](http://semver.org/) is used for versioning. For the versions available, see the [tags on this repository](https://github.com/OleksiiSukhov/chess-lead-lib/tags).

## Contributing
Please take a look at the contribution guidelines bellow if you're interested in helping!

- Please open or refer to a related [issue](https://github.com/OleksiiSukhov/chess-lead-lib/issues) in the repo.
- Create new branch.
- Please add unit tests for new feature or bug.
- Please run lint and tests locally before pushing the changes.
- Create new pull request for review.

#### Pending Features
- Time control

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
