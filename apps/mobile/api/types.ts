interface BaseResponse {
  msg: string;
  msgCode: string;
  code: number;
}

export interface FogoCruzadoCities extends BaseResponse {
  data: {
    id: string;
    name: string;
    state: {
      id: string;
      name: string;
    };
  }[];
}

export interface FogoCruzadoOccurrences extends BaseResponse {
  pageMeta: {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  data: {
    id: string;
    documentNumber: number;
    address: string;
    state: {
      id: string;
      name: string;
    };
    region: {
      id: string;
      region: string;
      state: string;
      enabled: boolean;
    };
    city: {
      id: string;
      name: string;
    };
    neighborhood: {
      id: string;
      name: string;
    };
    subNeighborhood: string | null;
    locality: string | null;
    latitude: string;
    longitude: string;
    date: string;
    policeAction: boolean;
    agentPresence: boolean;
    relatedRecord: string | null;
    contextInfo: {
      mainReason: {
        id: string;
        name: string;
      };
      complementaryReasons: { id: string; name: string }[];
      clippings: any[]; // Define more specific type if known
      massacre: boolean;
      policeUnit: string;
    };
    transports: any[]; // Define more specific type if known
    victims: {
      id: string;
      occurrenceId: string;
      type: string;
      situation: string;
      circumstances: {
        id: string;
        name: string;
        type: string;
      }[];
      deathDate: string;
      personType: string;
      age: number;
      ageGroup: {
        id: string;
        name: string;
      };
      genre: {
        id: string;
        name: string;
      };
      race: string;
      place: {
        id: string;
        name: string;
      };
      serviceStatus: {
        id: string;
        name: string;
        type: string;
      };
      qualifications: {
        id: string;
        name: string;
        type: string;
      }[];
      politicalPosition: {
        id: string;
        name: string;
        type: string;
      };
      politicalStatus: {
        id: string;
        name: string;
        type: string;
      };
      partie: string | null;
      coorporation: {
        id: string;
        name: string;
      };
      agentPosition: {
        id: string;
        name: string;
        type: string;
      };
      agentStatus: {
        id: string;
        name: string;
        type: string;
      };
      unit: string | null;
    }[];
    animalVictims: any[]; // Define more specific type if known
  }[];
}
