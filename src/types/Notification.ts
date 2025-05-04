export interface Notification {
  id: string;
  date: string;
  title: string;
  description: string;
  status: 'success' | 'error' | 'info'; 
}
