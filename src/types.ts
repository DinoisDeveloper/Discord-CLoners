export type CloningStatus = 'idle' | 'cloning' | 'success' | 'error';

export interface ProgressItem {
  current: number;
  total: number;
}

export interface CloningProgress {
  channels: ProgressItem;
  roles: ProgressItem;
  emojis: ProgressItem;
  stickers: ProgressItem;
  overall: number;
}
