import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react";

interface StudentData {
  name: string;
  education: string;
  interests: string[];
  skills: string[];
  careerGoals: string;
}

interface StudentFormProps {
  onSubmit: (data: StudentData) => void;
  onBack: () => void;
}

const StudentForm = ({ onSubmit, onBack }: StudentFormProps) => {
  const [formData, setFormData] = useState<StudentData>({
    name: "",
    education: "",
    interests: [],
    skills: [],
    careerGoals: ""
  });
  const [newInterest, setNewInterest] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const addInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.education && formData.interests.length > 0) {
      onSubmit(formData);
    }
  };

  const suggestedInterests = [
    "Technology", "Healthcare", "Education", "Finance", "Arts & Design", 
    "Environment", "Research", "Business", "Engineering", "Psychology"
  ];

  const suggestedSkills = [
    "Programming", "Data Analysis", "Communication", "Leadership", "Problem Solving",
    "Project Management", "Creative Writing", "Public Speaking", "Research", "Teamwork"
  ];

  return (
    <div className="min-h-screen bg-gradient-secondary py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="p-8 shadow-card">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Tell Us About Yourself</h1>
              <p className="text-muted-foreground">Help us provide personalized career guidance</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="education">Current Education/Background</Label>
                <Input
                  id="education"
                  value={formData.education}
                  onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                  placeholder="e.g., Computer Science Student, Biology Major, Working Professional"
                  required
                />
              </div>
            </div>

            {/* Interests Section */}
            <div className="space-y-4">
              <Label>Areas of Interest</Label>
              <p className="text-sm text-muted-foreground">Add fields or industries you're passionate about</p>
              
              <div className="flex gap-2">
                <Input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Type an interest..."
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                />
                <Button type="button" onClick={addInterest} variant="secondary">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Current Interests */}
              {formData.interests.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.interests.map((interest, index) => (
                    <Badge key={index} variant="default" className="group cursor-pointer">
                      {interest}
                      <X 
                        className="h-3 w-3 ml-2 group-hover:text-destructive" 
                        onClick={() => removeInterest(interest)}
                      />
                    </Badge>
                  ))}
                </div>
              )}

              {/* Suggested Interests */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Popular interests:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedInterests.filter(i => !formData.interests.includes(i)).map((interest, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => setFormData(prev => ({ ...prev, interests: [...prev.interests, interest] }))}
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-4">
              <Label>Skills & Abilities</Label>
              <p className="text-sm text-muted-foreground">Add your current skills and strengths</p>
              
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Type a skill..."
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill} variant="secondary">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Current Skills */}
              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <Badge key={index} variant="success" className="group cursor-pointer">
                      {skill}
                      <X 
                        className="h-3 w-3 ml-2 group-hover:text-destructive" 
                        onClick={() => removeSkill(skill)}
                      />
                    </Badge>
                  ))}
                </div>
              )}

              {/* Suggested Skills */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Common skills:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedSkills.filter(s => !formData.skills.includes(s)).map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-success hover:text-success-foreground"
                      onClick={() => setFormData(prev => ({ ...prev, skills: [...prev.skills, skill] }))}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Career Goals */}
            <div className="space-y-2">
              <Label htmlFor="careerGoals">Career Goals & Aspirations (Optional)</Label>
              <Textarea
                id="careerGoals"
                value={formData.careerGoals}
                onChange={(e) => setFormData(prev => ({ ...prev, careerGoals: e.target.value }))}
                placeholder="Tell us about your career aspirations, what you hope to achieve, or any specific goals you have in mind..."
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button 
                type="submit" 
                variant="hero" 
                size="lg"
                disabled={!formData.name || !formData.education || formData.interests.length === 0}
                className="group"
              >
                Get Career Guidance
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default StudentForm;