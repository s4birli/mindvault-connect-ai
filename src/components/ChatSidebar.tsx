import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  Plus, 
  MessageSquare, 
  Search, 
  MoreHorizontal,
  Trash2,
  Edit3
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatThread {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  isActive?: boolean;
}

interface ChatSidebarProps {
  onNewChat?: () => void;
  onSelectThread?: (threadId: string) => void;
  activeThreadId?: string;
}

export function ChatSidebar({ onNewChat, onSelectThread, activeThreadId }: ChatSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [searchQuery, setSearchQuery] = useState("");

  // Mock chat threads data
  const [threads] = useState<ChatThread[]>([
    {
      id: "1",
      title: "Email Marketing Strategy",
      lastMessage: "Can you help me create an email campaign?",
      timestamp: "2 min ago",
    },
    {
      id: "2", 
      title: "Project Planning",
      lastMessage: "Let's discuss the project timeline",
      timestamp: "1 hour ago",
    },
    {
      id: "3",
      title: "Data Analysis Question",
      lastMessage: "How do I analyze customer data?",
      timestamp: "Yesterday",
    },
    {
      id: "4",
      title: "Content Creation Ideas",
      lastMessage: "I need help with blog post ideas",
      timestamp: "2 days ago",
    },
  ]);

  const filteredThreads = threads.filter(thread =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thread.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleThreadSelect = (threadId: string) => {
    onSelectThread?.(threadId);
  };

  const handleDeleteThread = (threadId: string) => {
    // TODO: Implement thread deletion
    console.log("Delete thread:", threadId);
  };

  const handleRenameThread = (threadId: string) => {
    // TODO: Implement thread renaming
    console.log("Rename thread:", threadId);
  };

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-80"} collapsible="icon">
      <SidebarContent className="flex flex-col">
        {/* New Chat Button */}
        <div className="p-4 border-b">
          <Button 
            onClick={onNewChat}
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            size={isCollapsed ? "icon" : "default"}
          >
            <Plus className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">New Chat</span>}
          </Button>
        </div>

        {/* Search */}
        {!isCollapsed && (
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        )}

        {/* Chat Threads */}
        <SidebarGroup className="flex-1">
          {!isCollapsed && (
            <SidebarGroupLabel className="px-4 py-2 text-xs font-medium text-muted-foreground">
              Recent Conversations
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <ScrollArea className="flex-1">
              <SidebarMenu>
                {filteredThreads.map((thread) => (
                  <SidebarMenuItem key={thread.id}>
                    <SidebarMenuButton
                      asChild
                      className={`group relative hover:bg-accent/50 ${
                        activeThreadId === thread.id ? "bg-accent text-accent-foreground" : ""
                      }`}
                    >
                      <div
                        className="flex items-center gap-3 w-full p-3 cursor-pointer"
                        onClick={() => handleThreadSelect(thread.id)}
                      >
                        <MessageSquare className="h-4 w-4 flex-shrink-0" />
                        {!isCollapsed && (
                          <>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm truncate">
                                {thread.title}
                              </div>
                              <div className="text-xs text-muted-foreground truncate">
                                {thread.lastMessage}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {thread.timestamp}
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="opacity-0 group-hover:opacity-100 h-6 w-6 flex-shrink-0"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreHorizontal className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRenameThread(thread.id);
                                  }}
                                >
                                  <Edit3 className="mr-2 h-4 w-4" />
                                  Rename
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteThread(thread.id);
                                  }}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}