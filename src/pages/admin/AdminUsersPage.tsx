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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  User,
  SearchIcon,
  MoreVertical,
  Shield,
  Calendar,
  Mail,
  Lock,
  UserPlus,
  X,
  ArrowUpDown,
  Check,
  Filter
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Mock user data
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?img=1',
    status: 'active',
    joinDate: '2025-01-15',
    lastLogin: '2025-04-28',
  },
  {
    id: '2',
    name: 'Sarah Connor',
    email: 'sarah@example.com',
    role: 'creator',
    avatar: 'https://i.pravatar.cc/150?img=2',
    status: 'active',
    joinDate: '2025-02-10',
    lastLogin: '2025-04-27',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=3',
    status: 'active',
    joinDate: '2025-01-01',
    lastLogin: '2025-04-29',
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    email: 'emily@example.com',
    role: 'creator',
    avatar: 'https://i.pravatar.cc/150?img=5',
    status: 'suspended',
    joinDate: '2025-03-05',
    lastLogin: '2025-04-10',
  },
  {
    id: '5',
    name: 'Michael Chen',
    email: 'michael@example.com',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?img=6',
    status: 'active',
    joinDate: '2025-03-15',
    lastLogin: '2025-04-26',
  },
  {
    id: '6',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?img=7',
    status: 'pending',
    joinDate: '2025-04-01',
    lastLogin: null,
  },
];

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOption, setSortOption] = useState('name-asc');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  
  const { toast } = useToast();
  
  // Handle search and filtering
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    applyFilters(query, roleFilter, statusFilter);
  };
  
  // Filter users by role
  const handleRoleFilterChange = (role: string) => {
    setRoleFilter(role);
    applyFilters(searchQuery, role, statusFilter);
  };
  
  // Filter users by status
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    applyFilters(searchQuery, roleFilter, status);
  };
  
  const applyFilters = (query: string, role: string, status: string) => {
    let result = [...users];
    
    // Search filter
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(lowercaseQuery) ||
        user.email.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Role filter
    if (role !== 'all') {
      result = result.filter(user => user.role === role);
    }
    
    // Status filter
    if (status !== 'all') {
      result = result.filter(user => user.status === status);
    }
    
    // Apply sorting
    applySorting(result, sortOption);
  };
  
  // Handle sorting
  const handleSortChange = (option: string) => {
    setSortOption(option);
    applySorting(filteredUsers, option);
  };
  
  const applySorting = (usersToSort: typeof mockUsers, option: string) => {
    const sortedUsers = [...usersToSort];
    
    switch (option) {
      case 'name-asc':
        sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'email-asc':
        sortedUsers.sort((a, b) => a.email.localeCompare(b.email));
        break;
      case 'date-asc':
        sortedUsers.sort((a, b) => new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime());
        break;
      case 'date-desc':
        sortedUsers.sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime());
        break;
      default:
        break;
    }
    
    setFilteredUsers(sortedUsers);
  };
  
  // Handle change user role
  const handleChangeRole = (userId: string, newRole: 'user' | 'creator' | 'admin') => {
    // Update users array
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, role: newRole };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
    // Apply filters to update filtered users
    const updatedFilteredUsers = filteredUsers.map(user => {
      if (user.id === userId) {
        return { ...user, role: newRole };
      }
      return user;
    });
    
    setFilteredUsers(updatedFilteredUsers);
    
    toast({
      title: "User role updated",
      description: `User role has been changed to ${newRole}.`,
      variant: "default",
    });
  };
  
  // Handle change user status
  const handleChangeStatus = (userId: string, newStatus: 'active' | 'suspended' | 'pending') => {
    // Update users array
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, status: newStatus };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    
    // Apply filters to update filtered users
    const updatedFilteredUsers = filteredUsers.map(user => {
      if (user.id === userId) {
        return { ...user, status: newStatus };
      }
      return user;
    });
    
    setFilteredUsers(updatedFilteredUsers);
    
    toast({
      title: "User status updated",
      description: `User status has been changed to ${newStatus}.`,
      variant: "default",
    });
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };
  
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'creator': return 'secondary';
      default: return 'outline';
    }
  };
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'suspended': return 'destructive';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };
  
  // Add new user form handler
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would make an API call to create the user
    setIsAddUserOpen(false);
    
    toast({
      title: "User created",
      description: "New user has been created successfully.",
      variant: "default",
    });
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users Management</h1>
          <p className="text-muted-foreground">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <UserPlus className="mr-2 h-4 w-4" />
                Add New User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account with specified role and permissions.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddUser}>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Jane Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="jane.doe@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="user">
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">Regular User</SelectItem>
                        <SelectItem value="creator">Event Creator</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Temporary Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" required />
                    <p className="text-xs text-muted-foreground">
                      The user will be prompted to change this password on first login.
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddUserOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                    Create User
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Users</p>
                <p className="text-3xl font-bold">8,264</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <User className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Badge variant="outline" className="border-green-500 text-green-600">
                +124 this month
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Event Creators</p>
                <p className="text-3xl font-bold">1,754</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Badge variant="outline" className="border-green-500 text-green-600">
                +38 this month
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Administrators</p>
                <p className="text-3xl font-bold">28</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Badge variant="outline" className="border-green-500 text-green-600">
                +2 this month
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and search */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search input */}
            <div className="relative">
              <Label htmlFor="search-users" className="sr-only">Search Users</Label>
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="search-users"
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>
            
            {/* Role filter */}
            <div>
              <Label htmlFor="role-filter" className="sr-only">Filter by Role</Label>
              <Select value={roleFilter} onValueChange={handleRoleFilterChange}>
                <SelectTrigger id="role-filter">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="user">Regular Users</SelectItem>
                  <SelectItem value="creator">Event Creators</SelectItem>
                  <SelectItem value="admin">Administrators</SelectItem>
                </SelectContent>
              </Select>
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Sort options */}
            <div>
              <Label htmlFor="sort-options" className="sr-only">Sort Users</Label>
              <Select value={sortOption} onValueChange={handleSortChange}>
                <SelectTrigger id="sort-options">
                  <SelectValue placeholder="Sort users" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="email-asc">Email (A-Z)</SelectItem>
                  <SelectItem value="date-asc">Join Date (Oldest first)</SelectItem>
                  <SelectItem value="date-desc">Join Date (Newest first)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Active filters */}
          <div className="flex items-center flex-wrap gap-2 mt-4">
            {(roleFilter !== 'all' || statusFilter !== 'all' || searchQuery) && (
              <>
                <div className="flex items-center text-sm text-muted-foreground mr-2">
                  <Filter className="h-4 w-4 mr-1" />
                  Active filters:
                </div>
                
                {roleFilter !== 'all' && (
                  <Badge variant="outline" className="flex items-center">
                    Role: {roleFilter}
                    <button 
                      onClick={() => handleRoleFilterChange('all')} 
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                
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
                
                {searchQuery && (
                  <Badge variant="outline" className="flex items-center">
                    Search: "{searchQuery}"
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        applyFilters('', roleFilter, statusFilter);
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
                    setRoleFilter('all');
                    setStatusFilter('all');
                    setFilteredUsers(users);
                  }}
                >
                  Clear all
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Users table */}
      <Card>
        <CardHeader>
          <CardTitle>User Accounts</CardTitle>
          <CardDescription>
            Manage user accounts, roles, and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-6 p-4 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center">
                <Button variant="ghost" size="sm" className="text-xs font-medium text-muted-foreground">
                  User <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </div>
              <div className="col-span-2 flex items-center">
                <Button variant="ghost" size="sm" className="text-xs font-medium text-muted-foreground">
                  Email <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center">
                <Button variant="ghost" size="sm" className="text-xs font-medium text-muted-foreground">
                  Role <ArrowUpDown className="ml-1 h-3 w-3" />
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
              {filteredUsers.map((user, index) => (
                <div key={user.id} className="grid grid-cols-6 p-4 items-center">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">ID: {user.id}</p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                      <span>{user.email}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Joined: {new Date(user.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <Badge variant={getRoleBadgeVariant(user.role)} className="capitalize">
                      {user.role}
                    </Badge>
                  </div>
                  <div>
                    <Badge variant={getStatusBadgeVariant(user.status)} className="capitalize">
                      {user.status}
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
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Send Email</DropdownMenuItem>
                        
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                          Change Role
                        </DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleChangeRole(user.id, 'user')}>
                          <span className="mr-2">{user.role === 'user' && <Check className="h-4 w-4" />}</span>
                          Regular User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeRole(user.id, 'creator')}>
                          <span className="mr-2">{user.role === 'creator' && <Check className="h-4 w-4" />}</span>
                          Event Creator
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeRole(user.id, 'admin')}>
                          <span className="mr-2">{user.role === 'admin' && <Check className="h-4 w-4" />}</span>
                          Administrator
                        </DropdownMenuItem>
                        
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                          Change Status
                        </DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleChangeStatus(user.id, 'active')}>
                          <span className="mr-2">{user.status === 'active' && <Check className="h-4 w-4" />}</span>
                          Active
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeStatus(user.id, 'suspended')}>
                          <span className="mr-2">{user.status === 'suspended' && <Check className="h-4 w-4" />}</span>
                          Suspended
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleChangeStatus(user.id, 'pending')}>
                          <span className="mr-2">{user.status === 'pending' && <Check className="h-4 w-4" />}</span>
                          Pending
                        </DropdownMenuItem>
                        
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">
                          <Lock className="mr-2 h-4 w-4" />
                          Reset Password
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