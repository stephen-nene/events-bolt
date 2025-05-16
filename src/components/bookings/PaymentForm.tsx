import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Lock } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  currency: string;
  eventTitle: string;
  onSuccess: (paymentId: string) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  currency,
  eventTitle,
  onSuccess,
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Format price for display
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate payment processing delay
    setTimeout(() => {
      const paymentId = `pay_${Math.random().toString(36).substring(2, 10)}`;
      
      toast({
        title: 'Payment successful',
        description: `Your payment of ${formattedAmount} has been processed successfully`,
        variant: 'default',
      });
      
      onSuccess(paymentId);
      setIsLoading(false);
    }, 2000);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format card number with spaces every 4 digits
    const value = e.target.value.replace(/\s/g, '');
    let formattedValue = '';
    
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }
    
    if (formattedValue.length <= 19) { // 16 digits + 3 spaces
      setCardNumber(formattedValue);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>
          Enter your card information to complete booking for {eventTitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <div className="relative">
              <Input
                id="cardNumber"
                placeholder="4242 4242 4242 4242"
                value={cardNumber}
                onChange={handleCardNumberChange}
                className="pl-10"
                required
              />
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cardName">Cardholder Name</Label>
            <Input
              id="cardName"
              placeholder="John Doe"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryMonth">Month</Label>
              <Select value={expiryMonth} onValueChange={setExpiryMonth} required>
                <SelectTrigger id="expiryMonth">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => {
                    const month = i + 1;
                    return (
                      <SelectItem key={month} value={month.toString().padStart(2, '0')}>
                        {month.toString().padStart(2, '0')}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expiryYear">Year</Label>
              <Select value={expiryYear} onValueChange={setExpiryYear} required>
                <SelectTrigger id="expiryYear">
                  <SelectValue placeholder="YY" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = new Date().getFullYear() + i;
                    return (
                      <SelectItem key={year} value={(year % 100).toString()}>
                        {(year % 100).toString().padStart(2, '0')}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                required
                maxLength={3}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>Your payment information is encrypted and secure</span>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="flex justify-between w-full">
          <span className="font-medium">Total Amount:</span>
          <span className="font-bold">{formattedAmount}</span>
        </div>
        <Button
          onClick={handleSubmit}
          className="w-full bg-purple-600 hover:bg-purple-700"
          disabled={isLoading}
        >
          {isLoading ? 'Processing Payment...' : `Pay ${formattedAmount}`}
        </Button>
      </CardFooter>
    </Card>
  );
};