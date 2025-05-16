import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  DollarSign, 
  Filter, 
  SearchIcon, 
  Download, 
  CreditCard, 
  Calendar, 
  Clock, 
  ChevronDown, 
  ArrowUpDown,
  RefreshCcw,
  MoreVertical,
  FileText,
  Users,
  BarChart,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { payments, getEventById } from '@/data/mockData';
import { formatPrice } from '@/utils/formatPrice';

// Mock additional payment data
const mockPayments = payments.map(payment => {
  const event = getEventById(payment.bookingId.replace('b', ''));
  return {
    ...payment,
    eventName: event?.title || 'Unknown Event',
  };
});

export const AdminPaymentsPage: React.FC = () => {
  const [allPayments, setAllPayments] = useState(mockPayments);
  const [filteredPayments, setFilteredPayments] = useState(mockPayments);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [sortOption, setSortOption] = useState('date-desc');
  
  const { toast } = useToast();
  
  // Calculate stats
  const totalRevenue = allPayments.reduce((sum, payment) => {
    return payment.status === 'completed' ? sum + payment.amount : sum;
  }, 0);
  
  const pendingRevenue = allPayments.reduce((sum, payment) => {
    return payment.status === 'pending' ? sum + payment.amount : sum;
  }, 0);
  
  const refundedAmount = allPayments.reduce((sum, payment) => {
    return payment.status === 'refunded' ? sum + payment.amount : sum;
  }, 0);
  
  // Handle search and filtering
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    applyFilters(query, statusFilter, methodFilter);
  };
  
  // Filter payments by status
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    applyFilters(searchQuery, status, methodFilter);
  };
  
  // Filter payments by method
  const handleMethodFilterChange = (method: string) => {
    setMethodFilter(method);
    applyFilters(searchQuery, statusFilter, method);
  };
  
  const applyFilters = (query: string, status: string, method: string) => {
    let result = [...allPayments];
    
    // Search filter
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      result = result.filter(payment => 
        payment.id.toLowerCase().includes(lowercaseQuery) ||
        payment.bookingId.toLowerCase().includes(lowercaseQuery) ||
        payment.eventName.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Status filter
    if (status !== 'all') {
      result = result.filter(payment => payment.status === status);
    }
    
    // Method filter
    if (method !== 'all') {
      result = result.filter(payment => payment.paymentMethod === method);
    }
    
    // Apply sorting
    applySorting(result, sortOption);
  };
  
  // Handle sorting
  const handleSortChange = (option: string) => {
    setSortOption(option);
    applySorting(filteredPayments, option);
  };
  
  const applySorting = (paymentsToSort: typeof mockPayments, option: string) => {
    const sortedPayments = [...paymentsToSort];
    
    switch (option) {
      case 'date-asc':
        sortedPayments.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'date-desc':
        sortedPayments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'amount-asc':
        sortedPayments.sort((a, b) => a.amount - b.amount);
        break;
      case 'amount-desc':
        sortedPayments.sort((a, b) => b.amount - a.amount);
        break;
      default:
        break;
    }
    
    setFilteredPayments(sortedPayments);
  };
  
  // Handle process refund
  const handleProcessRefund = (paymentId: string) => {
    // Update payments array
    const updatedPayments = allPayments.map(payment => {
      if (payment.id === paymentId) {
        return { ...payment, status: 'refunded' };
      }
      return payment;
    });
    
    setAllPayments(updatedPayments);
    
    // Update filtered payments
    const updatedFilteredPayments = filteredPayments.map(payment => {
      if (payment.id === paymentId) {
        return { ...payment, status: 'refunded' };
      }
      return payment;
    });
    
    setFilteredPayments(updatedFilteredPayments);
    
    toast({
      title: "Refund processed",
      description: "The payment has been refunded successfully.",
      variant: "default",
    });
  };
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'pending': return 'outline';
      case 'failed': return 'destructive';
      case 'refunded': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Payments & Transactions</h1>
        <p className="text-muted-foreground">
          Monitor and manage all financial transactions on the platform
        </p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Revenue"
          value={formatPrice(totalRevenue, 'USD')}
          icon={<DollarSign />}
          description="Completed payments"
          trend={{
            value: 12.4,
            isPositive: true,
          }}
        />
        <StatsCard
          title="Pending Revenue"
          value={formatPrice(pendingRevenue, 'USD')}
          icon={<Clock />}
          description="Pending payments"
        />
        <StatsCard
          title="Refunded Amount"
          value={formatPrice(refundedAmount, 'USD')}
          icon={<RefreshCcw />}
          description="Total refunds"
          trend={{
            value: 2.5,
            isPositive: false,
          }}
        />
        <StatsCard
          title="Transaction Count"
          value={allPayments.length.toString()}
          icon={<CreditCard />}
          description="All-time transactions"
        />
      </div>

      {/* Revenue charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Revenue by Event Type</CardTitle>
            <CardDescription>Distribution of revenue across event categories</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded">
              <BarChart className="h-16 w-16 text-muted-foreground" />
              <p className="text-muted-foreground ml-4">Revenue chart would be displayed here</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
            <CardDescription>Revenue trends over the past 12 months</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded">
              <BarChart className="h-16 w-16 text-muted-foreground" />
              <p className="text-muted-foreground ml-4">Revenue trend chart would be displayed here</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and search */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
              {/* Search input */}
              <div className="relative">
                <Label htmlFor="search-payments" className="sr-only">Search Payments</Label>
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search-payments"
                  placeholder="Search payments..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-10"
                />
              </div>
              
              {/* Status filter */}
              <div>
                <Label htmlFor="status-filter" className="sr-only">Filter by Status</Label>
                <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                  <SelectTrigger id="status-filter">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Payment method filter */}
              <div>
                <Label htmlFor="method-filter" className="sr-only">Filter by Method</Label>
                <Select value={methodFilter} onValueChange={handleMethodFilterChange}>
                  <SelectTrigger id="method-filter">
                    <SelectValue placeholder="Filter by method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="apple_pay">Apple Pay</SelectItem>
                    <SelectItem value="google_pay">Google Pay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Sort options */}
              <div>
                <Label htmlFor="sort-options" className="sr-only">Sort Payments</Label>
                <Select value={sortOption} onValueChange={handleSortChange}>
                  <SelectTrigger id="sort-options">
                    <SelectValue placeholder="Sort payments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-desc">Date (Newest first)</SelectItem>
                    <SelectItem value="date-asc">Date (Oldest first)</SelectItem>
                    <SelectItem value="amount-desc">Amount (High to Low)</SelectItem>
                    <SelectItem value="amount-asc">Amount (Low to High)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          
          {/* Active filters */}
          <div className="flex items-center flex-wrap gap-2 mt-4">
            {(statusFilter !== 'all' || methodFilter !== 'all' || searchQuery) && (
              <>
                <div className="flex items-center text-sm text-muted-foreground mr-2">
                  <Filter className="h-4 w-4 mr-1" />
                  Active filters:
                </div>
                
                {statusFilter !== 'all' && (
                  <Badge variant="outline" className="flex items-center">
                    Status: {statusFilter}
                    <button 
                      onClick={() => handleStatusFilterChange('all')} 
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                
                {methodFilter !== 'all' && (
                  <Badge variant="outline" className="flex items-center">
                    Method: {methodFilter.replace('_', ' ')}
                    <button 
                      onClick={() => handleMethodFilterChange('all')} 
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                
                {searchQuery && (
                  <Badge variant="outline" className="flex items-center">
                    Search: "{searchQuery}"
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        applyFilters('', statusFilter, methodFilter);
                      }} 
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-sm"
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                    setMethodFilter('all');
                    setFilteredPayments(allPayments);
                  }}
                >
                  Clear all
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payments table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            View and manage all financial transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-7 p-4 bg-gray-50 dark:bg-gray-900">
              <div className="col-span-2 flex items-center">
                <Button variant="ghost" size="sm" className="text-xs font-medium text-muted-foreground">
                  Transaction <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center">
                <Button variant="ghost" size="sm" className="text-xs font-medium text-muted-foreground">
                  Event <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center">
                <Button variant="ghost" size="sm" className="text-xs font-medium text-muted-foreground">
                  Amount <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center">
                <Button variant="ghost" size="sm" className="text-xs font-medium text-muted-foreground">
                  Method <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center">
                <Button variant="ghost" size="sm" className="text-xs font-medium text-muted-foreground">
                  Status <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center justify-end">
                <Button variant="ghost" size="sm" className="text-xs font-medium text-muted-foreground">
                  Actions
                </Button>
              </div>
            </div>
            
            <div className="divide-y">
              {filteredPayments.map((payment) => (
                <div key={payment.id} className="grid grid-cols-7 p-4 items-center">
                  <div className="col-span-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {payment.id}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(payment.createdAt).toLocaleDateString()} {new Date(payment.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium truncate max-w-[150px]">{payment.eventName}</p>
                    <p className="text-xs text-muted-foreground">Booking: {payment.bookingId}</p>
                  </div>
                  
                  <div>
                    <p className="font-bold">{formatPrice(payment.amount, payment.currency)}</p>
                  </div>
                  
                  <div>
                    <Badge variant="outline" className="capitalize">
                      {payment.paymentMethod.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div>
                    <Badge variant={getStatusBadgeVariant(payment.status)} className="capitalize">
                      {payment.status}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" />
                          View Customer
                        </DropdownMenuItem>
                        {payment.status === 'completed' && (
                          <DropdownMenuItem onClick={() => handleProcessRefund(payment.id)}>
                            <RefreshCcw className="mr-2 h-4 w-4" />
                            Process Refund
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download Receipt
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};