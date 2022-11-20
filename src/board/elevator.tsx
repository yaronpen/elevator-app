import { useContext } from "react";
import { ElevatorContext } from './elevator-provider';
import ElevatorIcon from "../icons/elvator-icon";

const Elevator = ({floor, instance}: any) => {
  const [elevator_context, ] = useContext<any>(ElevatorContext);

  const msToTime = (s: number) => {
    const ms = s % 1000;
    s = (s - ms) / 1000;
    const secs = s % 60;
    s = (s - secs) / 60;
    const mins = s % 60;
    const hrs = (s - mins) / 60;
    
    return hrs + ':' + mins + ':' + secs;
  }
  
  const elevator_color = elevator_context?.id === instance?.id ? elevator_context.elevator_color : '';
  const seconds = msToTime(elevator_context?.notificationState?.timeout);
  return (
    <span className="elevator_span" key={instance?.id}>
      {floor === instance?.floor ? <ElevatorIcon color={elevator_color} class="elevator_icon" /> : null}
      &nbsp;
      { elevator_context.notificationState?.floor === floor && elevator_context.notificationState.flag && elevator_context?.id === instance?.id ? `${seconds}` : null }
    </span>
  )
}

export default Elevator;