import { Award, Zap, Users, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'About Logoland Promos | Our Story & Values',
  description:
    'Learn about Logoland Promos, a NYC-based promotional products company with 10+ years of experience. Your trusted brand partner.',
};

export default function About() {
  const stats = [
    { label: '10+ Years', value: 'Industry Experience' },
    { label: '5000+', value: 'Projects Completed' },
    { label: '500+', value: 'Happy Brands' },
    { label: '98%', value: 'Satisfaction Rate' },
  ];

  const values = [
    {
      icon: Award,
      title: 'Quality Guaranteed',
      description: 'Premium materials and craftsmanship in every product. We stand behind our work.',
    },
    {
      icon: Zap,
      title: 'Fast Turnaround',
      description: 'Quick production times without compromising on quality. Your timeline matters.',
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Dedicated account managers and design specialists ready to help you succeed.',
    },
  ];

  const whyChoose = [
    {
      title: 'Quality Guaranteed',
      description: 'Premium materials and rigorous quality control ensure every product exceeds expectations.',
    },
    {
      title: 'Fast Turnaround',
      description: 'From design approval to delivery, we keep your projects moving without delays.',
    },
    {
      title: 'Competitive Pricing',
      description: 'Volume discounts, flexible minimums, and transparent pricing structure.',
    },
    {
      title: 'Expert Support',
      description: 'Dedicated account managers and in-house design team guide you every step of the way.',
    },
  ];

  const team = [
    {
      name: 'Sarah Mitchell',
      title: 'Founder & CEO',
      initials: 'SM',
    },
    {
      name: 'James Rodriguez',
      title: 'VP of Operations',
      initials: 'JR',
    },
    {
      name: 'Emily Chen',
      title: 'Head of Design',
      initials: 'EC',
    },
    {
      name: 'Marcus Thompson',
      title: 'Account Manager',
      initials: 'MT',
    },
  ];

  return (
    <div className="bg-dark-950">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-gradient">Your Brand Partner</span>
              <br />
              Since Day One
            </h1>
            <p className="text-lg sm:text-xl text-dark-300 max-w-2xl mx-auto">
              Over a decade of expertise in creating promotional products that elevate your brand and connect with your audience.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-dark-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Our Story</h2>
          <div className="space-y-6 text-dark-200 text-lg leading-relaxed">
            <p>
              Founded in 2012, Logoland Promos emerged from a simple idea: every brand deserves promotional products that
              truly represent their values and vision. What started as a small operation in New York City has grown into a
              trusted partner for hundreds of brands across the country, from innovative startups to Fortune 500 companies.
            </p>
            <p>
              Our journey has been defined by a commitment to three core principles: exceptional quality, uncompromising
              customer service, and a passion for creative problem-solving. We've invested in state-of-the-art production
              facilities, built relationships with the best suppliers worldwide, and assembled a team of experts who genuinely
              care about your success.
            </p>
            <p>
              Today, Logoland Promos is recognized as an industry leader in custom promotional products. But our mission remains
              unchanged: to be the partner you trust when you need products that perfectly express your brand identity and leave a
              lasting impression on your customers.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="glass-card p-8 hover-glow">
                  <Icon className="w-12 h-12 text-brand-400 mb-4" />
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-dark-300">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-dark-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card p-6 sm:p-8 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-brand-400 mb-2">{stat.label}</div>
                <div className="text-sm sm:text-base text-dark-300">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="glass-card p-6 text-center hover-glow">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-400 to-accent-400 flex items-center justify-center text-2xl font-bold text-dark-950 mx-auto mb-4">
                  {member.initials}
                </div>
                <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                <p className="text-sm text-dark-300">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-dark-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Why Choose Logoland Promos</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {whyChoose.map((item, index) => (
              <div key={index} className="glass-card p-6 sm:p-8 flex gap-4">
                <CheckCircle className="w-6 h-6 text-brand-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-dark-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-dark-300 mb-8">
            Let's create something amazing for your brand. Get in touch with our team today.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-400 to-brand-500 text-dark-950 px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-brand-500/20 transition-all duration-300"
          >
            Contact Us <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
