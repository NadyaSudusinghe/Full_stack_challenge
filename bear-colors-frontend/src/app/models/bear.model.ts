import { Color } from './color.model';

export interface Bear {
  id: number;
  name: string;
  size: number;
  colors: Color[];
}
