import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Send, 
  Paperclip, 
  Mic, 
  Camera, 
  Brain,
  User,
  Copy,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
  type?: "text" | "image" | "file" | "audio";
}

interface ChatInterfaceProps {
  threadId?: string;
}

export function ChatInterface({ threadId }: ChatInterfaceProps) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [messages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm MindVault AI. I can help you with email analysis, content creation, data insights, and much more. How can I assist you today?",
      sender: "ai",
      timestamp: "10:30 AM",
    },
    {
      id: "2", 
      content: "Hi! I'd like to analyze my email patterns and get insights about my communication habits.",
      sender: "user",
      timestamp: "10:31 AM",
    },
    {
      id: "3",
      content: "I'd be happy to help you analyze your email patterns! To get started, you'll need to connect your email accounts in the Settings. Once connected, I can provide insights about:\n\n• Response times and patterns\n• Most frequent contacts\n• Email volume trends\n• Communication sentiment analysis\n• Time-based activity patterns\n\nWould you like me to guide you through connecting your first email account?",
      sender: "ai", 
      timestamp: "10:31 AM",
    },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // TODO: Implement message sending
    console.log("Sending message:", message);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileAttach = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // TODO: Handle file upload
      console.log("Selected files:", files);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice recording
  };

  const handleCameraCapture = () => {
    // TODO: Implement camera capture
    console.log("Camera capture");
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const likeMessage = (messageId: string) => {
    // TODO: Implement message rating
    console.log("Like message:", messageId);
  };

  const dislikeMessage = (messageId: string) => {
    // TODO: Implement message rating
    console.log("Dislike message:", messageId);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6 max-w-4xl mx-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-4 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <Avatar className="w-8 h-8 flex-shrink-0">
                {msg.sender === "ai" ? (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-primary">
                    <Brain className="h-4 w-4 text-primary-foreground" />
                  </div>
                ) : (
                  <>
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="bg-muted">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </>
                )}
              </Avatar>

              {/* Message Content */}
              <div className={`flex-1 ${msg.sender === "user" ? "text-right" : ""}`}>
                <Card className={`inline-block max-w-[80%] p-4 ${
                  msg.sender === "user" 
                    ? "bg-gradient-primary text-primary-foreground ml-auto" 
                    : "bg-card"
                }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {msg.content}
                  </div>
                </Card>
                
                {/* Message Actions */}
                <div className={`flex items-center gap-2 mt-2 text-xs text-muted-foreground ${
                  msg.sender === "user" ? "justify-end" : ""
                }`}>
                  <span>{msg.timestamp}</span>
                  {msg.sender === "ai" && (
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => copyMessage(msg.content)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => likeMessage(msg.id)}
                      >
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => dislikeMessage(msg.id)}
                      >
                        <ThumbsDown className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-2">
            {/* Attachment Buttons */}
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleFileAttach}
                className="h-10 w-10"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCameraCapture}
                className="h-10 w-10"
              >
                <Camera className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleRecording}
                className={`h-10 w-10 ${isRecording ? "text-destructive" : ""}`}
              >
                <Mic className="h-4 w-4" />
              </Button>
            </div>

            {/* Message Input */}
            <div className="flex-1 relative">
              <Textarea
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="min-h-[60px] max-h-[200px] resize-none pr-12"
                rows={1}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                size="icon"
                className="absolute right-2 bottom-2 h-8 w-8 rounded-full bg-gradient-primary hover:opacity-90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* File Input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
            accept="image/*,video/*,.pdf,.doc,.docx,.txt"
          />
        </div>
      </div>
    </div>
  );
}