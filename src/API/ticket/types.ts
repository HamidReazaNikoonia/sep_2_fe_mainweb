import type { ReactNode } from "react";

// Upload type for attachments
export type Upload = {
  _id: string;
  file_name: string;
  original_name: string;
  mime_type: string;
  size: number;
  url: string;
};

// User type for references
export type User = {
  _id: string;
  first_name: string;
  last_name: string;
  email?: string;
  mobile?: string;
  avatar?: Upload;
};

// Ticket Reply Schema
export type TicketReply = {
  _id: string;
  message: string;
  sender: User;
  sender_type: 'user' | 'admin';
  attachments: Upload[];
  is_read: boolean;
  createdAt: string;
  updatedAt: string;
};

// Main Ticket Schema
export type Ticket = {
  id: any;
  _id: string;
  title: string;
  description: string;

  // User who created the ticket
  user: User;

  // Related program information
  program_id?: string;
  program_type?: 'course' | 'course_session';

  // Related course information
  course_id?: string;

  // Ticket status
  status: 'open' | 'in_progress' | 'resolved' | 'closed';

  // Priority level
  priority: 'low' | 'medium' | 'high' | 'urgent';

  // Category for ticket classification
  category:
    | 'technical_support'
    | 'course_content'
    | 'payment_issue'
    | 'access_problem'
    | 'general_inquiry'
    | 'bug_report'
    | 'feature_request'
    | 'other';

  // Attachments for initial ticket
  attachments: Upload[];

  // Replies to the ticket
  replies: TicketReply[];

  // Admin assignment
  assigned_to?: User;

  // Read status
  is_read_by_admin: boolean;
  is_read_by_user: boolean;

  // Last activity tracking
  last_reply_at: string;
  last_reply_by: 'user' | 'admin';

  // Resolution details
  resolved_at?: string;
  resolved_by?: User;
  resolution_notes?: string;

  // Soft delete
  is_deleted: boolean;
  deleted_at?: string;
  deleted_by?: User;

  createdAt: string;
  updatedAt: string;
};

// API Response Types
export type TicketResponse = {
  results: Ticket[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
};

export type SingleTicketResponse = {
  priority(priority: any): unknown;
  status(status: any): unknown;
  last_reply_by: string;
  assigned_to: any;
  description: ReactNode;
  attachments: any;
  createdAt(createdAt: any): import("react").ReactNode;
  is_read_by_user: any;
  data: Ticket;
};

// Request Types
export type CreateTicketRequest = {
  title: string;
  description: string;
  program_id?: string;
  program_type?: 'course' | 'course_session';
  course_id?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  category?:
    | 'technical_support'
    | 'course_content'
    | 'payment_issue'
    | 'access_problem'
    | 'general_inquiry'
    | 'bug_report'
    | 'feature_request'
    | 'other';
  attachments?: string[]; // Array of Upload IDs
};

export type ReplyTicketRequest = {
  message: string;
  attachments?: string[]; // Array of Upload IDs
};

export type TicketFilterParams = {
  status?: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  category?:
    | 'technical_support'
    | 'course_content'
    | 'payment_issue'
    | 'access_problem'
    | 'general_inquiry'
    | 'bug_report'
    | 'feature_request'
    | 'other';
  program_id?: string;
  program_type?: 'course' | 'course_session';
  course_id?: string;
  sortBy?: string;
  limit?: number;
  page?: number;
};
