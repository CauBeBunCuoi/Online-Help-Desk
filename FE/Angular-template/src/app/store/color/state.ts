export interface ColorState {
  id: any | 0;
  name: any | null;
  person: {
    name: string;
    age: number;
  }
}

export const initialState: ColorState = {
  id: 1,
  name: 'red',
  person: {
    name: 'John Doe',
    age: 30
  }
};
