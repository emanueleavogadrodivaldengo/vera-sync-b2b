import type { UserRole } from "@prisma/client";

/**
 * Shared backend TypeScript interfaces.
 * Prisma-generated types are preferred for database entities.
 * These types are for request/response shapes and custom DTOs.
 */

// ── Request types ────────────────────────────────────────────

export interface RegisterBody {
  email: string;
  password: string;
  role: UserRole;
  companyName: string;
  contactName: string;
  phone?: string;
  country?: string;
  preferredLang?: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface CatalogFilters {
  origin?: string;
  color?: string;
  finish?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
}

export interface AddToCartBody {
  leatherId: string;
  quantity?: number;
  notes?: string;
}

export interface CheckoutBody {
  message?: string;
}

export interface ChatMessageBody {
  sessionId: string;
  message: string;
}

// ── Response types ───────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: {
    message: string;
    stack?: string;
  };
}

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
