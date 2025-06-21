import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Get in Touch</h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mt-4">
          Have questions? We're here to help. Reach out to us via the form below or through our contact details.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <div className="flex items-center gap-4">
                        <Mail className="h-6 w-6 text-primary"/>
                        <a href="mailto:support@seatswap.com" className="hover:text-primary">support@seatswap.com</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Phone className="h-6 w-6 text-primary"/>
                        <span>(123) 456-7890</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <MapPin className="h-6 w-6 text-primary"/>
                        <span>123 Stadium Way, London, UK</span>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Send us a Message</CardTitle>
              <CardDescription>Fill out the form and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message..." className="min-h-[120px]" />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-accent hover:bg-accent/90">Send Message</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
