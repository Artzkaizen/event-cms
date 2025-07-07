export interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  firstName: string | null;
  lastName: string | null;
  birthday: null;
  phoneNumber: null;
}

export interface Location {
  id: number;
  documentId: string;
  name: string;
  address: string;
  capacity: number;
  status: "active" | "inactive" | "maintenance";
  createdAt: string;
  updatedAt: string;
}

export interface Ticket {
  id: number;
  documentId: string;
  name: string;
  price: number;
  type: "regular" | "student" | "senior" | "accessibility" | "companion";
  format: "physical" | "digital" | "mobile";
  refundPolicy?: string;
  zone?: string;
  seat?: string;
  event: Event;
  createdAt: string;
  updatedAt: string;
}

export interface Organizer {
  id: number;
  documentId: string;
  name: string;
  email: string;
  phoneNumber?: string;
  website?: string;
  type: "individual" | "company" | "organization" | "government";
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: number;
  documentId: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  maxCap: number;
  website?: string;
  eventType:
    | "movie"
    | "concert"
    | "exhibition"
    | "theater"
    | "workshop"
    | "conference";
  location: Location;
  organizer: Organizer;
  tickets: Ticket[];
  createdAt: string;
  updatedAt: string;
}

export interface APIResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
