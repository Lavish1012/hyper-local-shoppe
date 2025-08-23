import MessagingSystem from "@/components/MessagingSystem";

const MessagesTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Messages</h2>
        <p className="text-muted-foreground">Communicate with your customers</p>
      </div>
      
      <MessagingSystem />
    </div>
  );
};

export default MessagesTab;