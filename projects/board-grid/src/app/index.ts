import { CartesianCoordinateSystem2D } from "../lib/aspects/coordinate-system/cartesian/cartesian.coordinate-system";
import { HexagonField } from "../lib/aspects/field-attributes/hexagon/hexagon.field-attributes";
import { AStarPathfinding } from "../lib/aspects/pathfinding/a-star/a-star-pathfinding";
import { BoardGrid } from "../lib/entities/board-grid";

const board = new BoardGrid(10, 10,
  new CartesianCoordinateSystem2D(),
  new AStarPathfinding(),
  new HexagonField(5)
);

board.setByCoordinates([], new CubeCoordinateSystem())

board.setCoordinateSystem(new CubeCoordinateSystem());
board.setPathfinding(new AStartPathfinidng());
board.setFieldShape(new HexagonalAppearance())
board.update([<items>]);


board.findPath({<coords>}, {<coords>}, [<excluded>])

const fields = board.getBoundaryFieldsClockwise([<excluded>]?);
const fields = board.getFields();
const field = board.getField({<coords>});


const edges = board.getBoundaryEdges([<excluded>]?)



// export const terrainMap = [
//   // 1  2  3  4  5  6  7  8   9   10 
//   [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
//   [-1, -1, 0, 0, 0, -1, 0, 0, -1, -1],
//   [-1, -1, 0, 0, 0, 1, 0, 0, 0, -1],
//   [-1, -1, 0, 0, 1, 1, 1, 0, 0, -1],
//   [-1, 0, 0, 0, 1, 2, 1, 0, 0, -1],
//   [-1, 0, 0, 0, 1, 2, 1, 0, 0, -1],
//   [-1, 0, 0, 0, 1, 1, 1, 0, 0, -1],
//   [-1, -1, 0, 0, 0, 0, 1, 0, -1, -1],
//   [-1, -1, 0, 0, 0, 0, 0, -1, -1, -1],
//   [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
// ]


// private _generateFields() {
//   const fields = [];
//   for (let row of terrainMap) {
//     const i = terrainMap.indexOf(row);
//     for (let j = 0; j < row.length; j++) {
//       fields.push({
//         x: i,
//         y: j,
//         h: row[j]
//       })
//     }
//   }
//   return fields;
// }

//   private generateGrid(l): Array<{ x: number, y: number }> {
//     const cubeCoordinates = [];
//     for (let x = 1; x <= l; x++) {
//       for (let y = 1; y <= l; y++) {
//         cubeCoordinates.push({ x, y })
//       }
//     }
//     return cubeCoordinates;
//   }