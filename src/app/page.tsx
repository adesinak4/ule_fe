'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { ServiceSelector } from '@/components/ServiceSelector';
import { DynamicForm } from '@/components/DynamicForm';
import { mockTenant } from '@/mock/tenant';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';


type Step = 'selection' | 'form' | 'success';

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState<Step>('selection');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);


  const selectedService = mockTenant.services.find(s => s.id === selectedServiceId);

  const handleServiceSelect = (id: string) => {
    setSelectedServiceId(id);
    // Auto-advance after a brief delay for UX
    setTimeout(() => {
      setCurrentStep('form');
    }, 400);
  };

  const handleFormSubmit = (data: Record<string, string>) => {


    // Prepare WhatsApp message
    const message = `*New Booking Request - ${mockTenant.business_name}*\n\n` +
      `*Service:* ${selectedService?.name} (${selectedService?.price})\n` +
      `--------------------------\n` +
      Object.entries(data).map(([key, value]) => {
        const field = mockTenant.form_schema.find(f => f.id === key);
        return `*${field?.label || key}:* ${value}`;
      }).join('\n');

    // Handoff logic
    const whatsappUrl = `https://wa.me/${mockTenant.phone}?text=${encodeURIComponent(message)}`;

    // Open in new tab
    window.open(whatsappUrl, '_blank');

    // Move to success step
    setCurrentStep('success');
  };

  const handleBack = () => {
    if (currentStep === 'form') setCurrentStep('selection');
  };

  return (
    <main className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-primary/20">
      {/* Dynamic Theme Color Injection */}
      <style jsx global>{`
        :root {
          --brand-primary: ${mockTenant.theme_color};
        }
      `}</style>

      <Header tenant={mockTenant} />

      <div className="pt-28 pb-10 max-w-md mx-auto relative overflow-hidden">
        <AnimatePresence mode="wait">
          {currentStep === 'selection' && (
            <motion.div
              key="selection"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <ServiceSelector
                services={mockTenant.services}
                selectedId={selectedServiceId}
                onSelect={handleServiceSelect}
              />
            </motion.div>
          )}

          {currentStep === 'form' && (
            <motion.div
              key="form"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-brand-primary transition-colors ml-4 mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to services
              </button>

              <DynamicForm
                fields={mockTenant.form_schema}
                onSubmit={handleFormSubmit}
              />
            </motion.div>
          )}

          {currentStep === 'success' && (
            <motion.div
              key="success"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center pt-20 px-6 text-center"
            >
              <div className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-12 h-12 text-brand-primary" />
              </div>
              <h2 className="text-3xl font-black mb-2">Almost There!</h2>
              <p className="text-muted-foreground font-medium mb-8">
                Please complete your booking in WhatsApp. If it didn&apos;t open automatically, click the button below.
              </p>

              <a
                href={`https://wa.me/${mockTenant.phone}`}
                className="w-full h-16 bg-brand-primary text-brand-primary-foreground font-black text-lg rounded-[22px] shadow-xl flex items-center justify-center"
              >
                Open WhatsApp
              </a>

              <button
                onClick={() => setCurrentStep('selection')}
                className="mt-6 text-sm font-bold text-muted-foreground underline underline-offset-4"
              >
                Start Over
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background Decorative Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-20%] w-[70%] h-[50%] bg-brand-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[70%] h-[50%] bg-brand-primary/5 blur-[120px] rounded-full" />
      </div>
    </main>
  );
}
