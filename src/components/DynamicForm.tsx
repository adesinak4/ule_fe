'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormField } from '@/types';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';

interface DynamicFormProps {
    fields: FormField[];
    onSubmit: (data: Record<string, string>) => void;
    isLoading?: boolean;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit, isLoading }) => {
    // Build Zod schema dynamically
    const schemaShape: Record<string, z.ZodTypeAny> = {};
    fields.forEach((field) => {
        let fieldSchema = z.string();
        if (field.required) {
            fieldSchema = fieldSchema.min(1, `${field.label} is required`);
        } else {
            // fieldSchema = fieldSchema.optional(); // This causes issues with empty strings
        }

        if (field.type === 'email') {
            fieldSchema = fieldSchema.email('Invalid email address');
        }

        schemaShape[field.id] = fieldSchema;
    });

    const schema = z.object(schemaShape);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 px-4 mt-8 pb-32">
            <div className="flex flex-col mb-2">
                <h2 className="text-2xl font-black tracking-tight text-foreground">
                    Your Details
                </h2>
                <p className="text-muted-foreground text-sm font-medium">
                    Fill in the information below to proceed
                </p>
            </div>

            {fields.map((field, index) => (
                <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col gap-2"
                >
                    <label
                        htmlFor={field.id}
                        className="text-sm font-bold text-foreground/80 ml-1"
                    >
                        {field.label}
                        {field.required && <span className="text-brand-primary ml-1">*</span>}
                    </label>
                    <input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        {...register(field.id)}
                        className={cn(
                            "w-full px-5 py-4 rounded-[18px] bg-card-bg border-2 transition-all outline-none",
                            errors[field.id]
                                ? "border-red-400 focus:border-red-500"
                                : "border-card-border focus:border-brand-primary/50"
                        )}
                    />
                    {errors[field.id] && (
                        <span className="text-xs font-semibold text-red-500 ml-2">
                            {errors[field.id]?.message as string}
                        </span>
                    )}
                </motion.div>
            ))}

            <button
                type="submit"
                disabled={isLoading}
                className={cn(
                    "fixed bottom-6 left-4 right-4 max-w-md mx-auto h-16 bg-brand-primary text-brand-primary-foreground font-black text-lg rounded-[22px] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 z-50",
                    isLoading && "opacity-70 cursor-not-allowed"
                )}
            >
                {isLoading ? (
                    <div className="w-6 h-6 border-4 border-t-white border-white/30 rounded-full animate-spin" />
                ) : (
                    "Confirm on WhatsApp"
                )}
            </button>
        </form>
    );
};
