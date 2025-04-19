import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { insertContactMessageSchema } from "@shared/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Shadcn components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

gsap.registerPlugin(ScrollTrigger);

// Create a form schema with additional validation
const contactFormSchema = insertContactMessageSchema.extend({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

// Define form values type
type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contactItemsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Initialize form with react-hook-form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Form submission handler
  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    try {
      await apiRequest<void, ContactFormValues>(
        "POST",
        "/api/contact",
        data
      );
      
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        variant: "default",
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your message could not be sent. Please try again later.",
        variant: "destructive",
      });
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !contactItemsRef.current || !formRef.current) return;
    
    // Title animation
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none none"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });
    
    // Contact items animation
    const contactItems = contactItemsRef.current.querySelectorAll(".contact-item");
    contactItems.forEach((item, index) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top bottom-=100",
          toggleActions: "play none none none"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2 * index,
        ease: "power3.out"
      });
      
      // Icon animation on hover handled by CSS
    });
    
    // Form animation
    gsap.from(formRef.current, {
      scrollTrigger: {
        trigger: formRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none none"
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 relative overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#8a2be2]/20 to-transparent"></div>
        <div className="absolute bottom-1/3 -left-20 w-72 h-72 rounded-full bg-[#39ff14]/10 blur-[80px]"></div>
        <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-[#00ffff]/10 blur-[80px]"></div>
      </div>
      
      {/* Glow lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8a2be2]/50 to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#00ffff]/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 
            className="text-3xl md:text-5xl font-['Space_Grotesk'] font-bold bg-gradient-to-r from-[#39ff14] via-[#00ffff] to-[#8a2be2] bg-clip-text text-transparent mb-4 animate-glow-pulse"
            style={{
              filter: "drop-shadow(0 0 5px rgba(57, 255, 20, 0.5))"
            }}
          >
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#39ff14] to-[#8a2be2] mx-auto"></div>
          <p className="text-gray-300 max-w-2xl mx-auto mt-4">Interested in working together? Feel free to reach out!</p>
        </div>
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
          {/* Contact methods */}
          <div ref={contactItemsRef} className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-6">
            <a 
              href="mailto:adityavishwakarma11234@gmail.com" 
              className="contact-item group flex flex-col items-center p-6 bg-[#1a1a2e]/80 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-[#00ffff] transition-all duration-300 relative overflow-hidden"
              style={{
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)"
              }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-[#00ffff]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-[#00ffff]/10 to-transparent"></div>
              
              <div 
                className="contact-icon w-16 h-16 flex items-center justify-center bg-[#00ffff]/20 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10"
                style={{
                  boxShadow: "0 0 15px rgba(0, 255, 255, 0.3)"
                }}
              >
                <i className="fas fa-envelope text-2xl text-[#00ffff]"></i>
              </div>
              <h3 
                className="text-xl font-['Space_Grotesk'] font-medium text-white mb-2 group-hover:text-[#00ffff] transition-colors duration-300"
                style={{
                  textShadow: "0 0 10px rgba(0, 255, 255, 0)"
                }}
              >
                Email
              </h3>
              <p className="text-gray-400 text-center group-hover:text-gray-300 transition-colors duration-300">adityavishwakarma11234@gmail.com</p>
            </a>
            
            <a 
              href="https://github.com/Adivish246" 
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item group flex flex-col items-center p-6 rounded-xl border border-gray-800 hover:border-[#8a2be2] transition-all duration-500 relative overflow-hidden z-20"
              style={{
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                background: "rgba(26, 26, 46, 1)"
              }}
            >
              {/* Background overlay */}
              <div className="absolute inset-0 bg-[#1a1a2e] opacity-100 z-0"></div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out z-10"
                style={{
                  background: "radial-gradient(circle at center, rgba(138, 43, 226, 0.15) 0%, transparent 70%)",
                  boxShadow: "inset 0 0 30px rgba(138, 43, 226, 0.3)"
                }}
              ></div>
              
              {/* Content wrapper */}
              <div className="relative z-20 flex flex-col items-center">
                <div 
                  className="contact-icon w-16 h-16 flex items-center justify-center bg-[#8a2be2]/20 rounded-full mb-4 transform transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:bg-[#8a2be2]/30"
                  style={{
                    boxShadow: "0 0 15px rgba(138, 43, 226, 0.3)"
                  }}
                >
                  <i className="fab fa-github text-2xl text-[#8a2be2] transition-all duration-500 ease-in-out group-hover:text-[#8a2be2] group-hover:filter group-hover:drop-shadow-[0_0_8px_rgba(138,43,226,0.8)]"></i>
                </div>
                <h3 
                  className="text-xl font-['Space_Grotesk'] font-medium text-white mb-2 transition-all duration-500 ease-in-out group-hover:text-[#8a2be2] group-hover:filter group-hover:drop-shadow-[0_0_8px_rgba(138,43,226,0.8)]"
                >
                  GitHub
                </h3>
                <p className="text-gray-400 text-center transition-colors duration-500 ease-in-out group-hover:text-gray-300">github.com/Adivish246</p>
              </div>
            </a>
          </div>
          
          {/* Contact form */}
          <div ref={formRef} className="w-full md:w-1/2">
            <div className="p-6 md:p-8 bg-[#1a1a2e]/80 backdrop-blur-sm rounded-xl border border-gray-800 relative overflow-hidden transition-all duration-300 hover:border-[#8a2be2]"
              style={{
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)" 
              }}
            >
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8a2be2]/5 via-transparent to-[#00ffff]/5"></div>
              
              <h3 className="text-2xl font-['Space_Grotesk'] font-medium text-white mb-6 relative z-10">
                Send Me a Message
              </h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="relative z-10 space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            {...field} 
                            className="bg-[#1a1a2e] text-white border-gray-700 focus:border-[#8a2be2] focus:ring-[#8a2be2]/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="your.email@example.com" 
                            type="email"
                            {...field} 
                            className="bg-[#1a1a2e] text-white border-gray-700 focus:border-[#00ffff] focus:ring-[#00ffff]/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your message here..." 
                            {...field} 
                            className="bg-[#1a1a2e] text-white border-gray-700 focus:border-[#39ff14] focus:ring-[#39ff14]/20 min-h-[120px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-6 font-medium bg-gradient-to-r from-[#8a2be2] to-[#00ffff] hover:opacity-90 transition-opacity"
                    style={{
                      boxShadow: "0 0 15px rgba(138, 43, 226, 0.3)"
                    }}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
