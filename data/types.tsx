export type RecipeItem = {
  id: number;
  name: string;
  ingredients: string[];
};

export type Week = {
  id: number,
  weekDay: string,
  slot1: string,
  slot2: string,
  date: Date,
}