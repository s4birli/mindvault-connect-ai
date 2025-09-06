import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  Plus, 
  Trash2, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Settings,
  User,
  Shield,
  Bell
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface EmailAccount {
  id: string;
  email: string;
  provider: "gmail" | "outlook" | "icloud" | "pop3";
  displayName: string;
  syncFrequency: "realtime" | "15min" | "1hour" | "daily";
  lastSync: string;
  isActive: boolean;
  status: "connected" | "error" | "syncing";
}

interface SettingsPageProps {
  onClose?: () => void;
}

export function SettingsPage({ onClose }: SettingsPageProps) {
  const { toast } = useToast();
  const [emailAccounts, setEmailAccounts] = useState<EmailAccount[]>([
    {
      id: "1",
      email: "john.doe@gmail.com",
      provider: "gmail",
      displayName: "Personal Gmail",
      syncFrequency: "15min",
      lastSync: "2 minutes ago",
      isActive: true,
      status: "connected",
    },
    {
      id: "2",
      email: "work@company.com",
      provider: "outlook",
      displayName: "Work Email",
      syncFrequency: "1hour",
      lastSync: "45 minutes ago",
      isActive: false,
      status: "error",
    },
  ]);

  const [activeTab, setActiveTab] = useState("email-accounts");

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "gmail":
        return "📧"; // Gmail icon
      case "outlook":
        return "📩"; // Outlook icon
      case "icloud":
        return "☁️"; // iCloud icon
      default:
        return "📧";
    }
  };

  const getStatusBadge = (status: EmailAccount["status"]) => {
    switch (status) {
      case "connected":
        return <Badge variant="outline" className="text-success"><CheckCircle className="mr-1 h-3 w-3" />Connected</Badge>;
      case "error":
        return <Badge variant="destructive"><AlertCircle className="mr-1 h-3 w-3" />Error</Badge>;
      case "syncing":
        return <Badge variant="secondary"><RefreshCw className="mr-1 h-3 w-3 animate-spin" />Syncing</Badge>;
    }
  };

  const handleToggleAccount = (accountId: string) => {
    setEmailAccounts(accounts =>
      accounts.map(account =>
        account.id === accountId
          ? { ...account, isActive: !account.isActive }
          : account
      )
    );
  };

  const handleDeleteAccount = (accountId: string) => {
    // TODO: Show confirmation dialog for data deletion
    setEmailAccounts(accounts => accounts.filter(account => account.id !== accountId));
    toast({
      title: "Email account removed",
      description: "The email account has been disconnected from your MindVault.",
    });
  };

  const handleSyncFrequencyChange = (accountId: string, frequency: EmailAccount["syncFrequency"]) => {
    setEmailAccounts(accounts =>
      accounts.map(account =>
        account.id === accountId
          ? { ...account, syncFrequency: frequency }
          : account
      )
    );
  };

  const handleAddGmailAccount = () => {
    // TODO: Implement Gmail OAuth flow
    toast({
      title: "Gmail connection",
      description: "Gmail integration will be available after connecting to Supabase backend.",
    });
  };

  const renderEmailAccountsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Email Accounts</h3>
          <p className="text-sm text-muted-foreground">
            Connect your email accounts to enable AI analysis and insights
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Email Account</DialogTitle>
              <DialogDescription>
                Choose your email provider to connect your account
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Button
                onClick={handleAddGmailAccount}
                variant="outline"
                className="w-full justify-start"
              >
                <span className="mr-2">📧</span>
                Connect Gmail
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled>
                <span className="mr-2">📩</span>
                Connect Outlook (Coming Soon)
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled>
                <span className="mr-2">☁️</span>
                Connect iCloud (Coming Soon)
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {emailAccounts.map((account) => (
          <Card key={account.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{getProviderIcon(account.provider)}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{account.displayName}</h4>
                      {getStatusBadge(account.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{account.email}</p>
                    <p className="text-xs text-muted-foreground">Last sync: {account.lastSync}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`active-${account.id}`} className="text-sm">
                      Active
                    </Label>
                    <Switch
                      id={`active-${account.id}`}
                      checked={account.isActive}
                      onCheckedChange={() => handleToggleAccount(account.id)}
                    />
                  </div>
                  <Select
                    value={account.syncFrequency}
                    onValueChange={(value: EmailAccount["syncFrequency"]) =>
                      handleSyncFrequencyChange(account.id, value)
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="15min">15 minutes</SelectItem>
                      <SelectItem value="1hour">1 hour</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteAccount(account.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: "email-accounts", label: "Email Accounts", icon: Mail },
    { id: "profile", label: "Profile", icon: User },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Settings className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          )}
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 space-y-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="mr-2 h-4 w-4" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1">
            <Card>
              <CardContent className="p-6">
                {activeTab === "email-accounts" && renderEmailAccountsTab()}
                {activeTab === "profile" && (
                  <div className="text-center py-12">
                    <User className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Profile Settings</h3>
                    <p className="text-muted-foreground">Profile management coming soon</p>
                  </div>
                )}
                {activeTab === "privacy" && (
                  <div className="text-center py-12">
                    <Shield className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Privacy Settings</h3>
                    <p className="text-muted-foreground">Privacy controls coming soon</p>
                  </div>
                )}
                {activeTab === "notifications" && (
                  <div className="text-center py-12">
                    <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Notification Settings</h3>
                    <p className="text-muted-foreground">Notification preferences coming soon</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}