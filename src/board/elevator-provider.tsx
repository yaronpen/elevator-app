import { useState, createContext } from "react";
import { iContext } from './interfaces';

export const ElevatorContext: any = createContext({})

const ElevatorProvider = (({ children } : any) => {
  const [elevator_context, setElevatorContext] = useState<iContext>({});

  return (
    <ElevatorContext.Provider value={[elevator_context, setElevatorContext]}>
      {children}
    </ElevatorContext.Provider>
  )
})

export default ElevatorProvider;