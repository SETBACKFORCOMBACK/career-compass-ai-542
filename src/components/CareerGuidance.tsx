import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, TrendingUp, Users, ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-career-guidance.jpg";
import StudentForm from "./StudentForm";
import CareerChat from "./CareerChat";

interface StudentData {
  name: string;
  education: string;
  interests: string[];
  skills: string[];
  careerGoals: string;
}

const CareerGuidance = () => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'form' | 'chat'>('welcome');
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  const handleFormSubmit = (data: StudentData) => {
    setStudentData(data);
    setCurrentStep('chat');
  };

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Recommendations",
      description: "Get personalized career suggestions based on your unique profile"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Market Insights",
      description: "Real-time job market data and salary trends"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Learning Roadmaps",
      description: "Step-by-step action plans with courses and certifications"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Career Communities",
      description: "Connect with professionals in your field of interest"
    }
  ];

  if (currentStep === 'form') {
    return <StudentForm onSubmit={handleFormSubmit} onBack={() => setCurrentStep('welcome')} />;
  }

  if (currentStep === 'chat' && studentData) {
    return <CareerChat studentData={studentData} onBack={() => setCurrentStep('form')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI-Powered Career Guidance
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Discover Your Perfect
                  <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Career Path
                  </span>
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  Get personalized career recommendations, skill development guidance, and real-time job market insights tailored to your unique profile and aspirations.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="hero" 
                  size="xl" 
                  onClick={() => setCurrentStep('form')}
                  className="group"
                >
                  Start Your Career Journey
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Learn More
                </Button>
              </div>

              <div className="flex items-center gap-8 text-white/80">
                <div className="text-center">
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm">Students Guided</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm">Career Paths</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src={heroImage} 
                alt="AI Career Guidance Platform"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Why Choose Our AI Career Guide?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of career counseling with personalized AI insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-card transition-smooth border-border/50">
                <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center text-white mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to Shape Your Future?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of students who have discovered their ideal career path with our AI-powered guidance
            </p>
            <Button 
              variant="hero" 
              size="xl" 
              onClick={() => setCurrentStep('form')}
              className="group"
            >
              Get Started Now
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerGuidance;