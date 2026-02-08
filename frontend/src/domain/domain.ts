export interface ErrorResponse {
  error: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isErrorResponse = (obj: any): obj is ErrorResponse => {
  return (
    obj &&
    typeof obj === "object" &&
    "error" in obj &&
    typeof obj.error === "string"
  );
};

export enum EventStatusEnum {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

export interface CreateTicketTypeRequest {
  name: string;
  price: number;
  description: string;
  totalAvailable?: number;
}

export interface CreateEventRequest {
  name: string;
  start?: Date;
  end?: Date;
  venue: string;
  salesStart?: Date;
  salesEnd?: Date;
  status: EventStatusEnum;
  ticketTypes: CreateTicketTypeRequest[];
}

export interface UpdateTicketTypeRequest {
  id: string | undefined;
  name: string;
  price: number;
  description: string;
  totalAvailable?: number;
}

export interface UpdateEventRequest {
  id: string;
  name: string;
  start?: Date;
  end?: Date;
  venue: string;
  salesStart?: Date;
  salesEnd?: Date;
  status: EventStatusEnum;
  ticketTypes: UpdateTicketTypeRequest[];
}

export interface TicketTypeSummary {
  id: string;
  name: string;
  price: number;
  description: string;
  totalAvailable?: number;
}

export interface EventSummary {
  id: string;
  name: string;
  start?: Date;
  end?: Date;
  venue: string;
  salesStart?: Date;
  salesEnd?: Date;
  status: EventStatusEnum;
  ticketTypes: TicketTypeSummary[];
}

export interface PublishedEventSummary {
  id: string;
  name: string;
  start?: Date;
  end?: Date;
  venue: string;
}

export interface TicketTypeDetails {
  id: string;
  name: string;
  price: number;
  description: string;
  totalAvailable?: number;
}

export interface EventDetails {
  id: string;
  name: string;
  start?: Date;
  end?: Date;
  venue: string;
  salesStart?: Date;
  salesEnd?: Date;
  status: EventStatusEnum;
  ticketTypes: TicketTypeDetails[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SpringBootPagination<T> {
  content: T[]; // The actual data items for the current page
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean; // Whether this is the last page
  totalElements: number; // Total number of items across all pages
  totalPages: number; // Total number of pages
  size: number; // Page size (items per page)
  number: number; // Current page number (zero-based)
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean; // Whether this is the first page
  numberOfElements: number; // Number of items in the current page
  empty: boolean; // Whether the current page has no items
}

export interface PublishedEventTicketTypeDetails {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface PublishedEventDetails {
  id: string;
  name: string;
  start?: Date;
  end?: Date;
  venue: string;
  ticketTypes: PublishedEventTicketTypeDetails[];
}

export enum TicketStatus {
  PURCHASED = "PURCHASED",
  CANCELLED = "CANCELLED",
}

export interface TicketSummaryTicketType {
  id: string;
  name: string;
  price: number;
}

export interface TicketSummary {
  id: string;
  status: TicketStatus;
  ticketType: TicketSummaryTicketType;
}

export interface TicketDetails {
  id: string;
  status: TicketStatus;
  price: number;
  description: string;
  eventName: string;
  eventVenue: string;
  eventStart: Date;
  eventEnd: Date;
}

export enum TicketValidationMethod {
  QR_SCAN = "QR_SCAN",
  MANUAL = "MANUAL",
}

export enum TicketValidationStatus {
  VALID = "VALID",
  INVALID = "INVALID",
  EXPIRED = "EXPIRED",
}

export interface TicketValidationRequest {
  id: string;
  method: TicketValidationMethod;
}

export interface TicketValidationResponse {
  ticketId: string;
  status: TicketValidationStatus;
}
