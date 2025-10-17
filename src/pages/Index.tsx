import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles, Copy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [input, setInput] = useState("");
  const [generatedPost, setGeneratedPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generatePost = async () => {
    if (!input.trim()) {
      toast({
        title: "Please enter a topic",
        description: "Type something to generate a viral LinkedIn post",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setGeneratedPost("");

    try {
      const response = await fetch("https://agent-prod.studio.lyzr.ai/v3/inference/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "sk-default-rt8wO6XnFOtesmItmDvIqTFqWJLlQOyt",
        },
        body: JSON.stringify({
          user_id: "saloniswati4@gmail.com",
          agent_id: "68f279e1811f17edf77d5c8a",
          session_id: "68f279e1811f17edf77d5c8a-vd5x5fkwija",
          message: input,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate post");
      }

      const data = await response.json();
      setGeneratedPost(data.response || data.message || JSON.stringify(data));
      
      toast({
        title: "Post generated! 🎉",
        description: "Your viral LinkedIn post is ready",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate post. Please try again.",
        variant: "destructive",
      });
      console.error("Error generating post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPost);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Post copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-block">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              Viral LinkedIn Post Generator 🚀
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your ideas into engaging LinkedIn posts that drive engagement and grow your professional network
          </p>
        </div>

        {/* Input Section */}
        <Card className="p-6 md:p-8 mb-8 shadow-[var(--shadow-card)] bg-gradient-to-br from-card to-muted/30 border-border/50">
          <div className="space-y-4">
            <label htmlFor="topic-input" className="text-sm font-medium text-foreground block">
              What's on your mind?
            </label>
            <Textarea
              id="topic-input"
              placeholder="Share a topic, idea, or personal experience... (e.g., 'My journey learning AI', 'Tips for remote work', 'Lessons from a failed startup')"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[150px] resize-none text-base bg-background/50 border-border/50 focus:border-primary transition-colors"
              disabled={isLoading}
            />
            <Button
              onClick={generatePost}
              disabled={isLoading}
              size="lg"
              className="w-full md:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-[var(--shadow-lg)]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Post
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Output Section */}
        {generatedPost && (
          <Card className="p-6 md:p-8 shadow-[var(--shadow-card)] bg-gradient-to-br from-card to-muted/30 border-border/50 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Your Viral Post
                </h2>
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                  className="border-primary/20 hover:bg-primary/10"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <div className="bg-background/50 rounded-lg p-6 border border-border/50">
                <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                  {generatedPost}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Loading State */}
        {isLoading && !generatedPost && (
          <Card className="p-12 shadow-[var(--shadow-card)] bg-gradient-to-br from-card to-muted/30 border-border/50">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Crafting your viral post...</p>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Index;
