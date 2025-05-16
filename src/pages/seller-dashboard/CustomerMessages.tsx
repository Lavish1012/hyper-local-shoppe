
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Message {
  id: number;
  customer: string;
  message: string;
  time: string;
  unread: boolean;
}

interface CustomerMessagesProps {
  messages: Message[];
}

const CustomerMessages = ({ messages }: CustomerMessagesProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Customer Messages</CardTitle>
        <CardDescription>Recent inquiries from customers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`p-3 rounded-lg border ${
              msg.unread ? "bg-market-primary/5 border-market-primary/20" : "bg-white"
            }`}
          >
            <div className="flex justify-between">
              <span className="font-medium">{msg.customer}</span>
              <span className="text-xs text-gray-500">{msg.time}</span>
            </div>
            <p className="text-sm mt-1 text-gray-600">{msg.message}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View All Messages
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CustomerMessages;
