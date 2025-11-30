/**
 * Audit Log Types
 * Defines audit trail and change tracking
 */

export type AuditAction =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'IMPORT'
  | 'CATEGORIZE'
  | 'LOGIN'
  | 'LOGOUT'
  | 'EXPORT'
  | 'MERGE'
  | 'ARCHIVE';

export type AuditResourceType =
  | 'transaction'
  | 'category'
  | 'card'
  | 'user'
  | 'rule'
  | 'template'
  | 'session';

export interface AuditLog {
  id: string;
  userId: string;
  action: AuditAction;
  resourceType: AuditResourceType;
  resourceId: string;
  changesBefore?: Record<string, unknown>;
  changesAfter?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

export interface AuditLogFilter {
  userId?: string;
  action?: AuditAction;
  resourceType?: AuditResourceType;
  resourceId?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

export interface AuditStats {
  totalActions: number;
  actionsByType: Record<AuditAction, number>;
  changesByUser: Record<string, number>;
  changesPerDay: Record<string, number>;
}
