import { useState, useReducer, useEffect, useContext } from "react"
import { elevatorFloors, Ielevator, elevator_status } from './interfaces';
import { ElevatorContext } from './elevator-provider';
import { elevatorReducer, initialState } from "../reducers";
import Elevator from "./elevator";

const Floor = ({ floor, floors_number }: any) => {
  const [state, dispatch] = useReducer(elevatorReducer, initialState);
  const [queue_state, setQueue] = useState<Array<Ielevator>>([]);
  const [current_floor, setCurrentFloor] = useState<any>(0);
  const [task_counter, setTaskCounter] = useState<number>(0);
  const [waiting_status, setWaitingFlag] = useState<elevator_status>('Call');
  const [disableButton, setDisableButton] = useState<boolean>(false)
  // defining context in to update notifications in elevator component
  const context = useContext(ElevatorContext)
  const [ ,setElevatorContext] : any = context;

  const arrived_sound = new Audio('/sounds/note.wav');
  const playArrive = () => {
    arrived_sound.play();
  }

  // adding a task to the queue
  const addToQueue = (floor: elevatorFloors) => {
    setQueue((task: Ielevator[]) => [...task, { id: queue_state.length, floor, occupied: false }])
    setTaskCounter((task) => task + 1);
  }
  useEffect(() => {
    setCurrentFloor(floor);
  }, [floor]);

  //measuring how much time it will take to each elevator to arrive and picking the lowest cost
  const elevatorCalculateCost = (task: Ielevator) => {
    let lowest = floors_number;
    let cost: Ielevator[] = state?.reduce((acc: Ielevator[], value: any) => {
      let distance;
      if (value.occupied === false) {
        const destination: any = task?.floor;
        distance = Math.abs(parseInt(value?.floor) - parseInt(destination));
        value.current_cost = distance;
      }
      acc.push(value);
      return acc;
    }, []);

    let minified: any = {};
    cost.map((elevator: Ielevator) => {
      if (elevator?.current_cost && lowest > elevator.current_cost && elevator.occupied === false) {
        minified = elevator;
        lowest = elevator.current_cost;
      }
    })
    return minified;
  }

  // handling tasks coming from queue
  useEffect(() => {
    const first_element: Ielevator = queue_state[0];
    const the_elevator: any = elevatorCalculateCost(first_element);
    const timeout = parseInt(the_elevator?.current_cost + '000');
    let display_floor: number;
    if (first_element?.floor && first_element?.floor === current_floor) {
      setWaitingFlag('Waiting');
      setDisableButton(true);
      display_floor = first_element.floor >= floors_number - 2 ? first_element.floor - 2 : first_element.floor + 2;
      dispatch({ type: 'setNotification', floor: display_floor, timeout, elevator_id: the_elevator?.id });
      setElevatorContext({ id: the_elevator?.id, floor: floor, occupied: true, elevator_color: 'red', notificationState: { flag: true, floor: display_floor, timeout } });
    }
    dispatch({ type: 'updateOccupied', closest: the_elevator });
    setTimeout(() => {
      dispatch({ type: 'doneTask', closest: the_elevator, elevatorDestination: first_element?.floor });
      if (first_element?.floor === floor) {
        setWaitingFlag('Arrived');
        dispatch({ type: 'offNotification', elevator_id: the_elevator?.id})
        setElevatorContext({ id: the_elevator?.id, floor: the_elevator?.floor, occupied: true, elevator_color: 'green', notificationState: { flag: true, floor: display_floor, timeout } });
        playArrive();
        setTimeout(() => {
          //filtering done task
          setQueue((task: Ielevator[]) => task.filter((filtered_task => filtered_task.id !== first_element.id)));
          setWaitingFlag('Call');
          setElevatorContext({ id: the_elevator?.id, floor: the_elevator?.floor, occupied: false, elevator_color: '', notificationState: { flag: false, floor: display_floor, timeout } });
          setDisableButton(false);
        }, 2000);
      }
    }, timeout)
  }, [task_counter]);
  
  return (
    <li className="floor">
      <span className="floor_span">
        {current_floor === 0 ? 'Ground' : `${current_floor}`}
      </span>
      {state?.map((elevator: Ielevator) => <Elevator instance={elevator} floor={current_floor} key={elevator?.id} /> )}
      <span className='button_span'>
        <button className={waiting_status} onClick={() => addToQueue(current_floor)} disabled={disableButton}>
          {waiting_status}
        </button>
      </span>
    </li>
  )
}

export default Floor;