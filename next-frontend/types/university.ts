export type VerticalType = 'ONLINE' | 'REGULAR' | 'DISTANCE';

export interface University {
  id: string;
  universityName: string;
  universityLogo: string;
  vertical: VerticalType;
}