'use client';

import React from 'react';
import { Service } from '@/types';
import { cn } from '@/utils/cn';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
    service: Service;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isSelected, onSelect }) => {
    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(service.id)}
            className={cn(
                "relative w-full text-left p-5 rounded-[24px] border-2 transition-all duration-300",
                isSelected
                    ? "border-brand-primary bg-brand-primary/5 shadow-inner"
                    : "border-card-border bg-card-bg hover:border-brand-primary/30 shadow-sm"
            )}
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className={cn(
                    "font-bold text-lg",
                    isSelected ? "text-brand-primary" : "text-foreground"
                )}>
                    {service.name}
                </h3>
                <span className={cn(
                    "font-bold text-lg",
                    isSelected ? "text-brand-primary" : "text-foreground"
                )}>
                    {service.price}
                </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed pr-8">
                {service.description}
            </p>

            {isSelected && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute bottom-5 right-5"
                >
                    <CheckCircle2 className="w-6 h-6 text-brand-primary fill-brand-primary/10" />
                </motion.div>
            )}
        </motion.button>
    );
};

interface ServiceSelectorProps {
    services: Service[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}

export const ServiceSelector: React.FC<ServiceSelectorProps> = ({ services, selectedId, onSelect }) => {
    return (
        <div className="flex flex-col gap-4 mt-8 px-4 pb-20">
            <div className="flex flex-col mb-4">
                <h2 className="text-2xl font-black tracking-tight text-foreground">
                    Select a Service
                </h2>
                <p className="text-muted-foreground text-sm font-medium">
                    Choose the package that best fits your needs
                </p>
            </div>

            {services.map((service) => (
                <ServiceCard
                    key={service.id}
                    service={service}
                    isSelected={selectedId === service.id}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
};
