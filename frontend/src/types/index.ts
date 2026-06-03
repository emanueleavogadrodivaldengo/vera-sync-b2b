/**
 * Shared TypeScript interfaces for the frontend.
 * These mirror the Prisma models but are decoupled for the client.
 */

// ── Enums ────────────────────────────────────────────────────

export type UserRole = "SUPPLIER" | "BUYER" | "ADMIN";

export type SampleRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "SHIPPED"
  | "DELIVERED";

export type LeatherOrigin = "EXOTIC" | "SUSTAINABLE" | "RECYCLED" | "VEGAN";

// ── Entities ─────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  role: UserRole;
  companyName: string;
  contactName: string;
  phone?: string;
  country?: string;
  preferredLang: string;
  createdAt: string;
}

export interface Leather {
  id: string;
  name: string;
  description: string;
  origin: LeatherOrigin;
  animalSource?: string;
  tannery?: string;
  thickness?: number;
  pricePerSqFt?: number;
  color?: string;
  finish?: string;
  certifications: string[];
  imageUrls: string[];
  available: boolean;
  supplierId: string;
  supplier?: User;
  createdAt: string;
}

export interface CartItem {
  id: string;
  quantity: number;
  notes?: string;
  leatherId: string;
  leather: Leather;
}

export interface SampleRequest {
  id: string;
  status: SampleRequestStatus;
  message?: string;
  items: SampleRequestItem[];
  createdAt: string;
}

export interface SampleRequestItem {
  id: string;
  quantity: number;
  notes?: string;
  leatherId: string;
  leather: Leather;
}

// ── API Response Shapes ──────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CheckoutResponse {
  sampleRequestId: string;
  whatsappUrl: string;
}
