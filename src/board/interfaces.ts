export type elevatorFloors = number;

export interface Ielevator {
  id?: number,
  floor?: elevatorFloors,
  occupied?: boolean,
  current_cost?: number
}

export interface iContext {
  id?: number,
  floor?: number,
  occupied?: boolean,
  current_cost?: number,
  elevator_color?: string,
  notificationState?: {
    flag?: boolean,
    floor?: number,
    timeout?: number
  }
}

export type elevator_status = 'Call' | 'Waiting' | 'Arrived';