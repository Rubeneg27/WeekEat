export type RecipeItem = {
  id: number;
  name: string;
  ingredients: string[];
  description: string;
  Category: string[];
};

export type Week = {
  id: number,
  weekDay: string,
  slot1: string,
  slot2: string,
  date: Date,
}