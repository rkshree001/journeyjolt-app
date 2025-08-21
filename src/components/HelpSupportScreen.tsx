import { useState } from "react";
import { ArrowLeft, MessageSquare, Phone, Mail, FileText, Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface HelpSupportScreenProps {
  onBack: () => void;
}

const HelpSupportScreen = ({ onBack }: HelpSupportScreenProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const faqItems = [
    {
      question: "How do I split expenses equally?",
      answer: "When adding an expense, select 'Split Equally' option and choose the participants. The app will automatically divide the amount equally among all selected members."
    },
    {
      question: "Can I edit an expense after adding it?",
      answer: "Yes, you can edit any expense by tapping on it in the expense list and selecting the edit option. All participants will be notified of the changes."
    },
    {
      question: "How do I settle up with someone?",
      answer: "Go to the 'Balances' section, find the person you need to settle with, and tap 'Settle Up'. You can mark it as paid once the transaction is complete."
    },
    {
      question: "Can I use different currencies?",
      answer: "Yes, you can set different currencies for each expense. The app supports multiple currencies and will convert them based on current exchange rates."
    },
    {
      question: "How do I export my expense reports?",
      answer: "Go to 'More' > 'Export Reports' to generate PDF or Excel reports of your expenses. You can filter by date range, group, or category."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, all your data is encrypted and stored securely. We use industry-standard security measures to protect your information."
    }
  ];

  const contactOptions = [
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our support team",
      action: () => toast({ title: "Live chat", description: "Opening live chat..." })
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "support@expensetracker.com",
      action: () => toast({ title: "Email", description: "Opening email client..." })
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "+1 (555) 123-4567",
      action: () => toast({ title: "Phone", description: "Calling support..." })
    }
  ];

  const filteredFAQ = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-border bg-card">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-10 w-10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold text-foreground">Help & Support</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {contactOptions.map((option, index) => (
              <button
                key={index}
                onClick={option.action}
                className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors rounded-lg border border-border"
              >
                <option.icon className="h-5 w-5 text-primary" />
                <div className="flex-1 text-left">
                  <p className="font-medium text-foreground">{option.title}</p>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>

        {/* FAQ Search */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search FAQ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Accordion type="single" collapsible className="space-y-2">
              {filteredFAQ.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-4">
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filteredFAQ.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No FAQ found matching your search</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Documentation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Documentation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors rounded-lg border border-border">
              <div className="text-left">
                <p className="font-medium text-foreground">User Guide</p>
                <p className="text-sm text-muted-foreground">Complete guide to using the app</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>

            <button className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors rounded-lg border border-border">
              <div className="text-left">
                <p className="font-medium text-foreground">Privacy Policy</p>
                <p className="text-sm text-muted-foreground">How we handle your data</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>

            <button className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors rounded-lg border border-border">
              <div className="text-left">
                <p className="font-medium text-foreground">Terms of Service</p>
                <p className="text-sm text-muted-foreground">Terms and conditions</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card>
          <CardHeader>
            <CardTitle>App Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Updated</span>
              <span className="font-medium">Dec 2023</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Build</span>
              <span className="font-medium">2023.12.001</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpSupportScreen;