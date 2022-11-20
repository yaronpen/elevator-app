
const notificationState = {
  flag: false,
  floor: 0,
  time: 0
}

export const initialState = [
  { id: 0, floor: 0, occupied: false, notificationState },
  { id: 1, floor: 0, occupied: false, notificationState },
  { id: 2, floor: 0, occupied: false, notificationState },
  { id: 3, floor: 0, occupied: false, notificationState },
  { id: 4, floor: 0, occupied: false, notificationState }
];

export const elevatorReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'updateOccupied':
      const filtered_state = state?.reduce((acc: any, value: any) => {
        if (value?.id === action?.closest?.id && value?.occupied === false) {
          value.occupied = true;
        }
        return [...acc, value];
      }, [])

      return filtered_state;
    case 'doneTask':
      const current_floor = action?.elevatorDestination ? action?.elevatorDestination : 0;
      const filtered_elevators = state?.reduce((acc: any, value: any) => {
        if (value?.id === action?.closest?.id && value.occupied === true) {
          value.floor = current_floor;
          value.occupied = false;
        }
        return [...acc, value];
      }, [])
      return filtered_elevators;
    case 'setNotification':
      const updateNotifcation = state?.reduce((acc: any, value: any) => {
        if(value?.id === action.elevator_id) {
          value.notificationState.flag = true;
          value.notificationState.floor = action.floor;
          value.notificationState.time = action.timeout;
        }
        return [...acc, value];
      }, []);
      return updateNotifcation;
    case 'offNotification':
      const offNote = state?.reduce((acc: any, value: any) => {
        if(value?.id == action.elevator_id) {
          value.notificationState.flag = false;
        }
        return [...acc, value];
      }, [])
      return offNote;
  }
}