
export interface Designer {
  id: number;
  name: string;
  specialty: string;
  location: string;
  instagram: string;
  image: string;
}

export enum AppSection {
  LOOKBOOK = 'lookbook',
  ADVISOR = 'advisor',
  GENERATOR = 'generator',
  DESIGNERS = 'designers',
}
