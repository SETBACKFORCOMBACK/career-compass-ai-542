import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send, Bot, User, Briefcase, BookOpen, TrendingUp, MapPin } from "lucide-react";

interface StudentData {
  name: string;
  education: string;
  interests: string[];
  skills: string[];
  careerGoals: string;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  structured?: CareerRecommendation;
}

interface CareerRecommendation {
  careerPaths: Array<{
    title: string;
    description: string;
    match: number;
  }>;
  requiredSkills: Array<{
    skill: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    priority: 'High' | 'Medium' | 'Low';
  }>;
  courses: Array<{
    title: string;
    provider: string;
    duration: string;
    type: 'Free' | 'Paid';
  }>;
  marketInsights: {
    averageSalary: string;
    demandLevel: 'High' | 'Medium' | 'Low';
    growthRate: string;
    locations: string[];
  };
  roadmap: Array<{
    phase: string;
    duration: string;
    tasks: string[];
  }>;
}

interface CareerChatProps {
  studentData: StudentData;
  onBack: () => void;
}

const CareerChat = ({ studentData, onBack }: CareerChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Generate initial AI response based on student data
  useEffect(() => {
    const generateInitialRecommendation = () => {
      const recommendation: CareerRecommendation = {
        careerPaths: [
          {
            title: "Data Science & AI",
            description: "Combine your interests in technology and analytics to build intelligent systems",
            match: 92
          },
          {
            title: "Product Management",
            description: "Bridge technology and business to create innovative solutions",
            match: 85
          },
          {
            title: "UX/UI Design",
            description: "Create user-centered digital experiences and interfaces",
            match: 78
          }
        ],
        requiredSkills: [
          { skill: "Python Programming", level: "Intermediate", priority: "High" },
          { skill: "Data Analysis", level: "Advanced", priority: "High" },
          { skill: "Machine Learning", level: "Beginner", priority: "Medium" },
          { skill: "Statistical Analysis", level: "Intermediate", priority: "High" },
          { skill: "Business Communication", level: "Intermediate", priority: "Medium" }
        ],
        courses: [
          {
            title: "Python for Data Science",
            provider: "Coursera",
            duration: "6 weeks",
            type: "Paid"
          },
          {
            title: "Introduction to Machine Learning",
            provider: "edX",
            duration: "8 weeks",
            type: "Free"
          },
          {
            title: "Data Visualization",
            provider: "Udacity",
            duration: "4 weeks",
            type: "Paid"
          }
        ],
        marketInsights: {
          averageSalary: "$75,000 - $120,000",
          demandLevel: "High",
          growthRate: "+22% (Next 5 years)",
          locations: ["San Francisco", "New York", "Seattle", "Austin", "Boston"]
        },
        roadmap: [
          {
            phase: "Foundation (0-3 months)",
            duration: "3 months",
            tasks: ["Learn Python basics", "Statistics fundamentals", "Excel proficiency", "SQL basics"]
          },
          {
            phase: "Specialization (3-9 months)",
            duration: "6 months",
            tasks: ["Advanced Python", "Machine Learning course", "Data visualization", "Portfolio projects"]
          },
          {
            phase: "Professional (9-12 months)",
            duration: "3 months",
            tasks: ["Internship/Entry role", "Industry certifications", "Networking", "Advanced projects"]
          }
        ]
      };

      const welcomeMessage: Message = {
        id: "welcome",
        type: 'ai',
        content: `Hello ${studentData.name}! 👋 I've analyzed your profile and I'm excited to help you explore career opportunities that align with your interests in ${studentData.interests.slice(0, 3).join(", ")} and your background in ${studentData.education}.

Based on your profile, I've identified some excellent career paths for you. Let me share my recommendations:`,
        timestamp: new Date(),
        structured: recommendation
      };

      setMessages([welcomeMessage]);
    };

    generateInitialRecommendation();
  }, [studentData]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(input),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input_lower = userInput.toLowerCase();
    
    if (input_lower.includes('salary') || input_lower.includes('pay')) {
      return "Great question about compensation! Based on your profile, here's what you can expect:\n\n• Entry Level: $55,000 - $75,000\n• Mid Level (3-5 years): $85,000 - $120,000\n• Senior Level (5+ years): $120,000 - $180,000\n\nSalary varies by location, company size, and specialization. Tech hubs like SF and NYC typically offer 20-30% higher compensation.";
    }
    
    if (input_lower.includes('skill') || input_lower.includes('learn')) {
      return "Excellent focus on skill development! Based on your career interests, I recommend prioritizing:\n\n🔥 **High Priority:**\n• Programming (Python/R)\n• Data Analysis & Visualization\n• Statistical Methods\n\n⚡ **Medium Priority:**\n• Machine Learning Fundamentals\n• Business Communication\n• Project Management\n\nWould you like specific course recommendations for any of these skills?";
    }
    
    if (input_lower.includes('company') || input_lower.includes('job')) {
      return "Perfect timing to think about target companies! Here are some great options for your profile:\n\n🚀 **Tech Giants:** Google, Microsoft, Amazon, Meta\n🏢 **Traditional:** JP Morgan, Goldman Sachs, McKinsey\n🌟 **Startups:** DataRobot, Palantir, Snowflake\n🎓 **Research:** Labs, Universities, Think Tanks\n\nI recommend starting with internships or entry-level positions at mid-size companies to build experience, then targeting your dream companies!";
    }
    
    return "That's a great question! I'd be happy to provide more specific guidance. Could you tell me more about what aspect interests you most? For example:\n\n• Specific skills you'd like to develop\n• Industries you're curious about\n• Timeline and next steps\n• Salary and career progression\n• Work-life balance considerations\n\nI'm here to help you explore any aspect of your career journey! 🚀";
  };

  const renderStructuredRecommendation = (recommendation: CareerRecommendation) => (
    <div className="space-y-6 mt-4">
      {/* Career Paths */}
      <div>
        <h3 className="flex items-center gap-2 font-semibold text-lg mb-3">
          <Briefcase className="h-5 w-5" />
          Recommended Career Paths
        </h3>
        <div className="grid gap-3">
          {recommendation.careerPaths.map((path, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{path.title}</h4>
                <Badge variant="success">{path.match}% Match</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{path.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Market Insights */}
      <div>
        <h3 className="flex items-center gap-2 font-semibold text-lg mb-3">
          <TrendingUp className="h-5 w-5" />
          Market Insights
        </h3>
        <Card className="p-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Average Salary</p>
              <p className="text-lg font-bold text-success">{recommendation.marketInsights.averageSalary}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Market Demand</p>
              <Badge variant={recommendation.marketInsights.demandLevel === 'High' ? 'success' : 'secondary'}>
                {recommendation.marketInsights.demandLevel}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium">Growth Rate</p>
              <p className="text-success font-semibold">{recommendation.marketInsights.growthRate}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Top Locations</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {recommendation.marketInsights.locations.slice(0, 2).join(", ")}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Learning Roadmap */}
      <div>
        <h3 className="flex items-center gap-2 font-semibold text-lg mb-3">
          <BookOpen className="h-5 w-5" />
          Your Learning Roadmap
        </h3>
        <div className="space-y-3">
          {recommendation.roadmap.map((phase, index) => (
            <Card key={index} className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">{phase.phase}</h4>
                <Badge variant="outline">{phase.duration}</Badge>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                {phase.tasks.map((task, taskIndex) => (
                  <li key={taskIndex} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {task}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Career Guidance Chat</h1>
            <p className="text-muted-foreground">Ask me anything about your career path, {studentData.name}!</p>
          </div>
        </div>

        {/* Chat Interface */}
        <Card className="h-[600px] flex flex-col">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}>
                  {message.type === 'ai' && (
                    <div className="bg-primary rounded-full p-2 h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                    <Card className={`p-3 ${message.type === 'user' ? 'bg-primary text-primary-foreground ml-auto' : 'bg-card'}`}>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      {message.structured && renderStructuredRecommendation(message.structured)}
                    </Card>
                    <p className="text-xs text-muted-foreground mt-1 px-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>

                  {message.type === 'user' && (
                    <div className="bg-secondary rounded-full p-2 h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-secondary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="bg-primary rounded-full p-2 h-8 w-8 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <Card className="p-3 bg-card">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </ScrollArea>

          <Separator />

          {/* Input */}
          <div className="p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me about career paths, skills, salaries, or anything else..."
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!input.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Quick Questions */}
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                "What skills should I develop?",
                "What's the salary range?",
                "Which companies should I target?",
                "How long will it take?"
              ].map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInput(question);
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                  className="text-xs"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CareerChat;