interface suggestions {
  description: string;
  name: string;
  url: string;
}

export interface CreateSuggestions {
  moduleName: {
    label: string;
    value: string;
  };
  suggestions: Array<suggestions>;
}
