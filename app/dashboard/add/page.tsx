"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { TextInput, FormError, Button } from "@/components";

export default function AddDataPage() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [city, setCity] = React.useState("");
  const [stateVal, setStateVal] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [productName, setProductName] = React.useState("");
  const [quantity, setQuantity] = React.useState<number | "">("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

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
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextInput
            id="fullName"
            name="fullName"
            label="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextInput
            id="phone"
            name="phone"
            type="tel"
            label="Phone"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            id="address"
            name="address"
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextInput
            id="location"
            name="location"
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* City / State */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            id="city"
            name="city"
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextInput
            id="state"
            name="state"
            label="State"
            value={stateVal}
            onChange={(e) => setStateVal(e.target.value)}
          />
        </div>

        {/* Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            id="gender"
            name="gender"
            label="Gender"
            placeholder="e.g., Male / Female / Other"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <div />
        </div>

        {/* Product / Quantity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            id="productName"
            name="productName"
            label="Product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextInput
            id="quantity"
            name="quantity"
            type="number"
            label="Quantity"
            value={quantity === "" ? "" : String(quantity)}
            onChange={(e) =>
              setQuantity(e.target.value === "" ? "" : Number(e.target.value))
            }
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
