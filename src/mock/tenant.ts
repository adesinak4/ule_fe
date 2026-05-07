import { Tenant } from "@/types";

export const mockTenant: Tenant = {
    id: "t1",
    business_name: "AutoShine Detailers",
    phone: "447700900000", // International format without +
    theme_color: "#3b82f6", // Blue-500
    rating: 5.0,
    services: [
        {
            id: "s1",
            name: "Standard Wash",
            price: "£25",
            description: "Exterior wash, wheel cleaning, and tire shine."
        },
        {
            id: "s2",
            name: "Full Valet",
            price: "£75",
            description: "Deep interior clean, vacuum, polish, and exterior wax."
        },
        {
            id: "s3",
            name: "Ceramic Coating",
            price: "£250",
            description: "Long-term paint protection with a mirror-like finish."
        }
    ],
    form_schema: [
        {
            id: "name",
            label: "Full Name",
            type: "text",
            placeholder: "John Doe",
            required: true
        },
        {
            id: "phone",
            label: "Phone Number",
            type: "tel",
            placeholder: "07123 456789",
            required: true
        },
        {
            id: "car_model",
            label: "Car Model",
            type: "text",
            placeholder: "Tesla Model 3",
            required: true
        },
        {
            id: "postcode",
            label: "Postcode",
            type: "text",
            placeholder: "SW1A 1AA",
            required: true
        }
    ]
};
