import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "./Header";
import { ChatSidebar } from "./ChatSidebar";
import { ChatInterface } from "./ChatInterface";
import { SettingsPage } from "./settings/SettingsPage";

interface MainLayoutProps {
  onLogout?: () => void;
}

export function MainLayout({ onLogout }: MainLayoutProps) {
  const [activeThreadId, setActiveThreadId] = useState<string | undefined>("1");
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleNewChat = () => {
    setActiveThreadId(undefined);
  };

  const handleSelectThread = (threadId: string) => {
    setActiveThreadId(threadId);
  };

  const handleShowSettings = () => {
    setShowSettings(true);
  };

  const handleShowProfile = () => {
    setShowSettings(true);
    setShowProfile(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
    setShowProfile(false);
  };

  if (showSettings) {
    return <SettingsPage onClose={handleCloseSettings} defaultTab={showProfile ? "profile" : "email-accounts"} />;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        {/* Header */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Header
            onShowSettings={handleShowSettings}
            onShowProfile={handleShowProfile}
            onLogout={onLogout}
          />
        </div>

        {/* Sidebar */}
        <ChatSidebar
          onNewChat={handleNewChat}
          onSelectThread={handleSelectThread}
          activeThreadId={activeThreadId}
        />

        {/* Chat Interface */}
        <main className="flex-1 flex flex-col pt-16">
          <ChatInterface threadId={activeThreadId} />
        </main>
      </div>
    </SidebarProvider>
  );
}