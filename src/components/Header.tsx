'use client';

import React from 'react';
import { Star, Phone } from 'lucide-react';
import { Tenant } from '@/types';


interface HeaderProps {
    tenant: Tenant;
}

export const Header: React.FC<HeaderProps> = ({ tenant }) => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-6 pb-4">
            <div className="max-w-md mx-auto flex items-center justify-between glass rounded-2xl px-5 py-4 shadow-sm border border-card-border">
                <div className="flex flex-col">
                    <h1 className="text-lg font-bold tracking-tight text-foreground">
                        {tenant.business_name}
                    </h1>
                    {tenant.rating && (
                        <div className="flex items-center gap-1 mt-0.5">
                            <div className="flex items-center bg-yellow-400/20 px-1.5 py-0.5 rounded-md">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-[10px] font-bold text-yellow-600 dark:text-yellow-400 ml-1">
                                    {tenant.rating.toFixed(1)}
                                </span>
                            </div>
                            <span className="text-[10px] text-muted-foreground font-medium">
                                on Google
                            </span>
                        </div>
                    )}
                </div>

                <a
                    href={`tel:${tenant.phone}`}
                    className="flex items-center justify-center w-10 h-10 bg-brand-primary text-brand-primary-foreground rounded-full shadow-md hover:scale-110 active:scale-95 transition-transform"
                >
                    <Phone className="w-5 h-5 fill-current" />
                </a>
            </div>
        </header>
    );
};
