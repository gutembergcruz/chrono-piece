export interface Year {
  id: string;
  CM: number;
  EC: number;
  approx: boolean;
  label: string;
}

export interface YearsData {
  years: Year[];
}

export interface EventSummary {
  id: string;
  title: string;
  subtitle: string;
  importance: 'global' | 'regional' | 'local';
}

export interface EventsByYear {
  year: {
    CM: number;
    EC: number;
  };
  events: EventSummary[];
}

export interface Source {
  label: string;
  type?: 'manga' | 'anime' | 'sbs' | 'databook' | 'other';
  url?: string;
}

export interface EventDetail {
  id: string;
  year: {
    CM: number;
    EC: number;
  };
  title: string;
  subtitle: string;
  whatHappened: string;
  keyCharacters: string[];
  importance: 'global' | 'regional' | 'local';
  sources: Source[];
}
