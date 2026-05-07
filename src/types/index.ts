export type FieldType = 'text' | 'tel' | 'email' | 'number' | 'textarea' | 'select' | 'postcode';

export interface FormField {
    id: string;
    label: string;
    type: FieldType;
    placeholder?: string;
    required?: boolean;
    options?: string[]; // For select type
}

export interface Service {
    id: string;
    name: string;
    price: string;
    description: string;
    icon?: string;
}

export interface Tenant {
    id: string;
    business_name: string;
    phone: string; // WhatsApp number
    theme_color: string;
    logo_url?: string;
    rating?: number;
    form_schema: FormField[];
    services: Service[];
}

export interface ApiResponse<T> {
    success: boolean;
    data: T | null;
    error: string | null;
}
