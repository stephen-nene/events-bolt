export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const formatShortDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  };
  
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Format a date to show day of week and date (e.g., "Mon, Jan 1")
export const formatDayAndDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };
  
  return new Date(dateString).toLocaleDateString('en-US', options);
};