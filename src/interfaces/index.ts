export interface User {
  id: number;
  username: string;
}

export interface Task {
  id: number;
  name: string;
  columnId: number;
  order: number;
}

export interface Column {
  id: number;
  name: string;
  tasks?: Task[];
}

export interface BoardState {
  columns: Column[];
}
