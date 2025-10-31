"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { TextInput, FormError, Button } from "@/components";

type FormData = {
  name: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  location: string;
  city: string;
  stateVal: string;
  gender: string;
  productName: string;
  quantity: number | "";
};

const initialFormData: FormData = {
  name: "",
  fullName: "",
  email: "",
  phone: "",
  address: "",
  location: "",
  city: "",
  stateVal: "",
  gender: "",
  productName: "",
  quantity: "",
};

export default function AddDataPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]:
        field === "quantity"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      router.push("/dashboard");
    } catch (err) {
      setError("Failed to add data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add New Record</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white  rounded-lg border border-gray-200 dark:border-gray-800 p-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            id="name"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange("name")}
            required
          />
          <TextInput
            id="fullName"
            name="fullName"
            label="Full name"
            value={formData.fullName}
            onChange={handleChange("fullName")}
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            id="email"
            name="email"
            type="email"
            label="Email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange("email")}
            required
          />
          <TextInput
            id="phone"
            name="phone"
            type="tel"
            label="Phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange("phone")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            id="address"
            name="address"
            label="Address"
            value={formData.address}
            onChange={handleChange("address")}
          />
          <TextInput
            id="location"
            name="location"
            label="Location"
            value={formData.location}
            onChange={handleChange("location")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            id="city"
            name="city"
            label="City"
            value={formData.city}
            onChange={handleChange("city")}
          />
          <TextInput
            id="state"
            name="state"
            label="State"
            value={formData.stateVal}
            onChange={handleChange("stateVal")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            id="gender"
            name="gender"
            label="Gender"
            placeholder="e.g., Male / Female / Other"
            value={formData.gender}
            onChange={handleChange("gender")}
          />
          <div />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            id="productName"
            name="productName"
            label="Product name"
            value={formData.productName}
            onChange={handleChange("productName")}
          />
          <TextInput
            id="quantity"
            name="quantity"
            type="number"
            label="Quantity"
            value={formData.quantity === "" ? "" : String(formData.quantity)}
            onChange={handleChange("quantity")}
          />
        </div>

        <FormError message={error ?? undefined} />

        <div className="flex items-center justify-end gap-3 w-full">
          <Button
            className="px-11"
            type="submit"
            size="md"
            variant="primary"
            loading={loading}
          >
            Save
          </Button>
          <Button
            className="px-11"
            type="button"
            size="md"
            variant="secondary"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
