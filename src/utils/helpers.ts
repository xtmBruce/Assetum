// Utility functions for common operations

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount / 100); // Assuming amounts are stored in cents
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const generateId = (prefix: string): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `${prefix}-${timestamp}${random}`.toUpperCase();
};

export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    'Available': 'bg-green-100 text-green-700',
    'On Lease': 'bg-blue-100 text-blue-700',
    'Maintenance': 'bg-amber-100 text-amber-700',
    'Needs Review': 'bg-red-100 text-red-700',
    'Active': 'bg-green-100 text-green-700',
    'Overdue': 'bg-red-100 text-red-700',
    'Completed': 'bg-gray-100 text-gray-700',
  };
  return statusColors[status] || 'bg-gray-100 text-gray-700';
};