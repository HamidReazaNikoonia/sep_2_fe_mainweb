export type NotificationDeliveryStatus = {
  sms?: {
    status: 'pending' | 'sent' | 'delivered' | 'failed' | 'not_sent';
    sent_at?: string;
    delivered_at?: string;
    error_message?: string;
    provider_response?: any;
  };
  email?: {
    status: 'pending' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'failed' | 'not_sent';
    sent_at?: string;
    delivered_at?: string;
    opened_at?: string;
    clicked_at?: string;
    error_message?: string;
    provider_response?: any;
  };
  push?: {
    status: 'pending' | 'sent' | 'delivered' | 'clicked' | 'failed' | 'not_sent';
    sent_at?: string;
    delivered_at?: string;
    clicked_at?: string;
    error_message?: string;
    provider_response?: any;
  };
  in_app?: {
    status: 'pending' | 'delivered' | 'read' | 'not_sent';
    delivered_at?: string;
    read_at?: string;
  };
};

export type NotificationAction = {
  id: string;
  label: string;
  url: string;
  style: 'primary' | 'secondary' | 'danger' | 'success';
};

export type NotificationSender = {
  type: 'system' | 'admin' | 'coach' | 'automated';
  user_id?: {
    first_name: string;
    last_name: string;
    avatar?: { file_name: string };
  };
  name?: string;
};

export type NotificationContent = {
  html_body?: string;
  short_text?: string;
  action_url?: string;
  image_url?: string;
  data?: any;
};

export type Notification = {
  _id: string;
  notification_type:
    | 'success_create_reference'
    | 'payment_fail_create_reference'
    | 'from_admin'
    | 'course_enrollment'
    | 'course_completion'
    | 'session_reminder'
    | 'session_cancelled'
    | 'payment_success'
    | 'payment_failed'
    | 'coupon_expiry'
    | 'account_verification'
    | 'password_reset'
    | 'profile_update'
    | 'system_maintenance'
    | 'promotional'
    | 'announcement';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  message: string;
  content?: NotificationContent;
  channels: ('sms' | 'email' | 'push' | 'in_app' | 'webhook')[];
  delivery_status?: NotificationDeliveryStatus;
  read_at?: string;
  sender: NotificationSender;
  actions?: NotificationAction[];
  status: 'draft' | 'scheduled' | 'processing' | 'sent' | 'delivered' | 'failed' | 'cancelled' | 'expired';
  created_at: string;
  updated_at: string;
};

export type NotificationResponse = {
  results: Notification[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
};
