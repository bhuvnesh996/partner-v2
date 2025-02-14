"use client"
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wallet, ArrowUpCircle, Ban, Clock, Upload, CreditCard, Banknote  } from "lucide-react";

interface WalletTransaction {
  amount: number;
  transactionId?: string;
  mode: "UPI" | "Bank Transfer" | "Payment Gateway";
  receipt?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  transferDate?: Date;
  createdAt: Date;
  approvedAt?: Date;
  rejectedReason?: string;
}

const WalletPage = () => {
  const [balance, setBalance] = useState(1250.75);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([
    {
      amount: 500,
      mode: "Payment Gateway",
      status: "APPROVED",
      createdAt: new Date(),
      approvedAt: new Date(),
    },
    {
      amount: 750.75,
      mode: "Bank Transfer",
      status: "PENDING",
      transactionId: "HDFC123456",
      transferDate: new Date(),
      createdAt: new Date(),
      receipt: "/receipt-1.jpg",
    },
  ]);

  const [manualAmount, setManualAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [transferDate, setTransferDate] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [paymentMode, setPaymentMode] = useState<"UPI" | "Bank Transfer">("UPI");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction: WalletTransaction = {
      amount: parseFloat(manualAmount),
      transactionId,
      mode: paymentMode,
      status: "PENDING",
      transferDate: transferDate ? new Date(transferDate) : undefined,
      createdAt: new Date(),
      receipt: selectedFile ? URL.createObjectURL(selectedFile) : undefined,
    };
    setTransactions([newTransaction, ...transactions]);
    setManualAmount('');
    setTransactionId('');
    setTransferDate('');
    setSelectedFile(null);
  };

  const getTransactionIcon = (transaction: WalletTransaction) => {
    switch (transaction.status) {
      case "APPROVED":
        return <ArrowUpCircle className="h-8 w-8 text-green-500" />;
      case "REJECTED":
        return <Ban className="h-8 w-8 text-red-500" />;
      default:
        return <Clock className="h-8 w-8 text-yellow-500" />;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-6 w-6" />
            Your Wallet
          </CardTitle>
          <CardDescription>Manage your wallet balance and transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-4">₹{balance.toFixed(2)}</div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Money</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Money to Wallet</DialogTitle>
                <DialogDescription>
                  Choose your preferred payment method
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="gateway">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="gateway">Payment Gateway</TabsTrigger>
                  <TabsTrigger value="manual">Manual Transfer</TabsTrigger>
                </TabsList>
                <TabsContent value="gateway">
                  <div className="space-y-4">
                    <Alert>
                      <CreditCard className="h-4 w-4" />
                      <AlertDescription>
                        Instant credit but includes a 2% convenience fee. Minimum transaction: ₹100
                      </AlertDescription>
                    </Alert>
                    <div>
                      <Label htmlFor="amount">Amount</Label>
                      <Input id="amount" placeholder="Enter amount" type="number" />
                    </div>
                    <div className="text-sm text-gray-500">
                      Transaction fee: ₹{(parseFloat(manualAmount || '0') * 0.02).toFixed(2)}
                    </div>
                    <Button className="w-full">Proceed to Payment</Button>
                  </div>
                </TabsContent>
                <TabsContent value="manual">
                  <Alert>
                    <Banknote className="h-4 w-4" />
                    <AlertDescription>
                      No convenience fee but requires admin approval (24-48 hours)
                    </AlertDescription>
                  </Alert>
                  <form onSubmit={handleManualSubmit} className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="manual-amount">Amount</Label>
                      <Input
                        id="manual-amount"
                        placeholder="Enter amount"
                        type="number"
                        value={manualAmount}
                        onChange={(e) => setManualAmount(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="payment-mode">Payment Mode</Label>
                      <select
                        id="payment-mode"
                        className="w-full p-2 border rounded-md"
                        value={paymentMode}
                        onChange={(e) => setPaymentMode(e.target.value as "UPI" | "Bank Transfer")}
                      >
                        <option value="UPI">UPI</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                      </select>
                    </div>
                    {paymentMode === "Bank Transfer" && (
                      <div className="p-4 border rounded-md bg-gray-50">
                        <h4 className="font-medium mb-2">Bank Details</h4>
                        <p>Bank: HDFC Bank</p>
                        <p>Account: 1234 5678 9012</p>
                        <p>IFSC: HDFC0001234</p>
                      </div>
                    )}
                    {paymentMode === "UPI" && (
                      <div className="p-4 border rounded-md bg-gray-50">
                        <h4 className="font-medium mb-2">UPI Details</h4>
                        <p>UPI ID: business@upi</p>
                        <p>Scan QR code below:</p>
                        <div className="w-32 h-32 bg-gray-200 mx-auto mt-2 flex items-center justify-center">
                          QR Placeholder
                        </div>
                      </div>
                    )}
                    <div>
                      <Label htmlFor="transaction-id">Transaction ID</Label>
                      <Input
                        id="transaction-id"
                        placeholder="Enter transaction ID"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="transfer-date">Transfer Date</Label>
                      <Input
                        id="transfer-date"
                        type="datetime-local"
                        value={transferDate}
                        onChange={(e) => setTransferDate(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="receipt">Upload Receipt</Label>
                      <div className="mt-1 flex items-center">
                        <Input
                          id="receipt"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() => document.getElementById('receipt')?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {selectedFile ? selectedFile.name : 'Choose file'}
                        </Button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full">Submit for Verification</Button>
                  </form>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>View your transaction history</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full">
            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    {getTransactionIcon(transaction)}
                    <div>
                      <div className="font-medium">
                        {transaction.mode}
                      </div>
                      <div className="text-sm text-gray-500">
                        {transaction.createdAt.toLocaleDateString()}
                      </div>
                      {transaction.transactionId && (
                        <div className="text-sm text-gray-500">
                          ID: {transaction.transactionId}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      ₹{transaction.amount.toFixed(2)}
                    </div>
                    <div className={`text-sm ${
                      transaction.status === "APPROVED" 
                        ? 'text-green-500' 
                        : transaction.status === "REJECTED"
                        ? 'text-red-500'
                        : 'text-yellow-500'
                    }`}>
                      {transaction.status}
                    </div>
                    {transaction.rejectedReason && (
                      <div className="text-sm text-red-500">
                        {transaction.rejectedReason}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletPage;