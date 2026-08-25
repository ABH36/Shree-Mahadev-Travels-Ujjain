"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, User, Phone as PhoneIcon, MapPin, Calendar, Clock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { enquirySchema, tripTypes, type EnquiryInput } from "@/lib/validations/enquiry";
import { fleet } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const fieldClass =
  "h-12 rounded-xl border-0 bg-white pl-11 pr-4 text-sm font-bold text-neutral-950 placeholder:text-neutral-700 placeholder:font-semibold shadow-sm focus-visible:ring-2 focus-visible:ring-primary flex items-center";
const iconClass = "pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-700";

function ToggleGroup({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          aria-label={`Select ${opt}`}
          onClick={() => onChange(opt)}
          className={cn(
            "rounded-full border px-4 py-2 text-xs font-bold transition-all sm:text-sm",
            value === opt
              ? "border-primary bg-primary text-slate-950 font-extrabold shadow-md shadow-primary/30"
              : "border-slate-600 bg-slate-800/90 text-slate-100 hover:bg-slate-700 hover:border-slate-400 hover:text-white"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function BookingForm() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      pickupLocation: "",
      dropLocation: "",
      travelDate: "",
      travelTime: "",
      tripType: "One Way",
      carType: "",
      message: "",
    },
  });

  const tripType = watch("tripType");
  const carType = watch("carType");

  async function onSubmit(data: EnquiryInput) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success("Enquiry sent! We'll call you back shortly.");
      reset();
    } catch {
      toast.error("Something went wrong. Please call or WhatsApp us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" aria-label="Cab Booking Form">
      <div>
        <p className="mb-3 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-primary">Passenger Details</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="relative flex items-center">
            <User className={iconClass} />
            <Input placeholder="Name" aria-label="Full Name" className={fieldClass} {...register("name")} />
          </div>
          <div className="relative flex items-center">
            <PhoneIcon className={iconClass} />
            <Input placeholder="Mobile Number" aria-label="Mobile Number" type="tel" className={fieldClass} {...register("phone")} />
          </div>
        </div>
        {(errors.name || errors.phone) && (
          <p className="mt-1.5 text-xs text-red-300 font-bold">{errors.name?.message || errors.phone?.message}</p>
        )}
      </div>

      <div>
        <p className="mb-3 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-primary">Pickup Details</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="relative flex items-center">
            <MapPin className={iconClass} />
            <Input placeholder="Pickup Location" aria-label="Pickup Location" className={fieldClass} {...register("pickupLocation")} />
          </div>
          <div className="relative flex items-center">
            <MapPin className={iconClass} />
            <Input placeholder="Drop Location" aria-label="Drop Location" className={fieldClass} {...register("dropLocation")} />
          </div>
          <div className="relative flex items-center">
            <Calendar className={iconClass} />
            <Input type="date" aria-label="Travel Date" className={cn(fieldClass, "text-neutral-950 font-bold placeholder:text-neutral-700")} {...register("travelDate")} />
          </div>
          <div className="relative flex items-center">
            <Clock className={iconClass} />
            <Input type="time" aria-label="Travel Time" className={cn(fieldClass, "text-neutral-950 font-bold placeholder:text-neutral-700")} {...register("travelTime")} />
          </div>
        </div>
        {(errors.pickupLocation || errors.dropLocation || errors.travelDate) && (
          <p className="mt-1.5 text-xs text-red-300">
            {errors.pickupLocation?.message || errors.dropLocation?.message || errors.travelDate?.message}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">Trip Type</p>
          <ToggleGroup
            options={tripTypes}
            value={tripType}
            onChange={(v) => setValue("tripType", v as EnquiryInput["tripType"])}
          />
        </div>
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">Car Type</p>
          <ToggleGroup
            options={fleet.map((c) => c.name)}
            value={carType}
            onChange={(v) => setValue("carType", v, { shouldValidate: true })}
          />
          {errors.carType ? <p className="mt-1.5 text-xs text-red-300">{errors.carType.message}</p> : null}
        </div>
      </div>

      <Textarea
        placeholder="Anything else we should know? (optional)"
        aria-label="Additional Requirements or Notes"
        rows={2}
        className="resize-none rounded-xl border-0 bg-white px-4 py-3.5 text-sm font-bold text-neutral-950 placeholder:text-neutral-700 placeholder:font-semibold shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
        {...register("message")}
      />

      <Button type="submit" size="lg" disabled={submitting} className="w-full font-bold text-base">
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Booking...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Book Now
          </>
        )}
      </Button>
    </form>
  );
}
