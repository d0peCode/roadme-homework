interface Booking {
  id: number;
  travelName: string;
  customerEmail: string;
  customerName: string;
  customerPhone: number;
  customerAge: number;
  customerGender: "Male" | "Female" | "Other";
  paymentType: string;
  notes: string;
}

export { Booking };
