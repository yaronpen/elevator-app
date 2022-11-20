import { createContext } from "react"
import ElevatorProvider from "./elevator-provider";
import Floor from "./floor";

type elevatorFloors = number;

export const ElevatorContext = createContext({})

const generateFloors = (number: number) => {
  const floorsArr = [];
  //generating floors
  for(let i = number - 1; i >= 0; i--) {
    floorsArr.push(i);
  }
  return floorsArr;
}

const Board = () => {
  const floors = generateFloors(10)

  return (
    <div className="container">
      <ElevatorProvider>
        <ul className="floor_list">
          {floors.map((floor: elevatorFloors, id) => <Floor floor={floor} floors_number={floors.length}  key={id} /> )}
        </ul>
      </ElevatorProvider>
    </div>
  )
}

export default Board;